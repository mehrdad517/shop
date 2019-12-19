<?php

namespace App\Http\Controllers\Backend;

use App\BlogContent;
use App\File;
use App\Http\Controllers\Controller;
use App\Tag;
use Faker\Provider\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BlogContentController extends Controller
{
    public function index(Request $request)
    {

        $entities = BlogContent::where(function ($q) use ($request) {
            if ($request->has('filter')) {
                $filter = json_decode($request->get('filter'), true);

                if (@$filter['id']) {
                    $q->where('id', '=', $filter['id']);
                }

                if (@$filter['title']) {
                    $q->where('title', 'like', '%' . $filter['title'] . '%')->orWhere('slug', 'like', '%' . $filter['title'] . '%');
                }

                if (@$filter['status'] != -1) {
                    $q->where('status', $filter['status']);
                }
            }
        })->orderBy($request->get('sort_field') ?? 'id', $request->get('sort_type') ?? 'desc')
            ->paginate($request->get('limit') ?? 10);

        return response($entities);

    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validator = \Validator::make($request->all(), [
                'title' => 'required',
                'content' => 'required',
                'meta_title' => 'required',
                'meta_description' => 'required',
                'slug' => 'required|unique:blog_content',
            ]);

            if ($validator->fails()) {
                return response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
            }

            $result = BlogContent::firstOrCreate([
                'title' => $request->get('title'),
                'slug' => str_replace(' ', '-', $request->get('slug')),
                'content' => $request->get('content'),
                'meta_title' => $request->get('meta_title'),
                'meta_description' => $request->get('meta_description'),
                'status' => $request->get('status'),
                'created_by' => Auth::id()
            ]);

            $result->categories()->detach();
            $result->categories()->attach($request->get('categories'));

            $result->tags()->detach();

            foreach ($request->get('tags') as $tag) {

                if (!is_numeric($tag)) {
                    $tag = Tag::create(['name' => $tag])->id;
                }
                $result->tags()->attach($tag);
            }

            if ($request->has('files')) {

                foreach ($request->get('files')  as $file) {
                    if ($file) {

                        $old = 'attachment/' . $file['file'];

                        foreach ([500,300,200,100,50] as $dir) {
                            $copy = Storage::copy($old, 'content/' . $result->id . '/' . $dir . '/' . $file['file']);
                            if ($copy) {
                                $copy = \Intervention\Image\Facades\Image::make(storage_path('app/public/content/' . $result->id . '/' . $dir . '/' . $file['file']));
                                $copy->resize($dir, $dir);
                                $copy->save();
                            }
                        }

                        $new = 'content/' . $result->id . '/' . $file['file'];

                        $move = Storage::move($old, $new); // Move Main Image

                        if ($move) {

                            $result->files()->create([
                                'created_by' => Auth::id(),
                                'file' => $file['file'],
                                'collection' => $file['collection'],
                                'directory' => 'content',
                                'size' => json_encode([500,300,200,100,50])
                            ]);
                        }


                    }

                }
            }


            if ($result) {
                return response()->json(['status' => true, 'msg' => 'با موفقیت انجام شد.'], 200);
            }

            return response()->json(['status' => false, 'msg' => 'un success'], 200);
        } catch (\Exception $exception) {
            return response()->json(['status' => false, 'msg' => $exception->getMessage()]);
        }

    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $result = BlogContent::with(['categories' => function ($q) {
            $q->select('value', 'label');
        }, 'tags', 'files'])->find($id);


        $files = [];
        foreach ($result->files as $file) {
            $files[] = [
                'percent' => 100, // for react component
                'file' => $file['file'],
                'mime_type' => $file['mime_type'],
                'path' => Storage::url('content/' . $result->id . '/' . $file['file']), // image or file address
                'collection' => $file['collection'],
                'directory' => 'content'
            ];
        }

        if ($result) {
            return response([
                'title' => $result->title,
                'slug' => $result->slug ?? '',
                'status' => $result->status,
                'meta_title' => $result->meta_title ?? '',
                'meta_description' => $result->meta_description ?? '',
                'content' => $result->content ?? '',
                'categories' => $result->categories,
                'tags' => $result->tags,
                'files' => $files
            ]);
        }

        return response()->json(['status' => false, 'msg' => 'request is invalid'], 200);
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {

        $validator = \Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
            'meta_title' => 'required',
            'meta_description' => 'required',
            'slug' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        if ($request->get('slug')) {
            $slug = BlogContent::where('slug', $request->get('slug'))->where('id', '<>', $id)->count();
            if ($slug > 0) {
                return Response()->json(['status' => false, 'msg' => 'اسلاگ قبلا ثبت شده است.']);
            }
        }

        $result = BlogContent::updateOrCreate(['id' => $id], [
            'title' => $request->get('title'),
            'slug' => str_replace(' ', '-', $request->get('slug')),
            'content' => $request->get('content'),
            'meta_title' => $request->get('meta_title'),
            'meta_description' => $request->get('meta_description'),
            'status' => $request->get('status'),
        ]);


        $result->categories()->detach();
        $result->categories()->attach($request->get('categories'));

        $result->tags()->detach();

        foreach ($request->get('tags') as $tag) {

            if (!is_numeric($tag)) {
                $tag = Tag::create(['name' => $tag])->id;
            }
            $result->tags()->attach($tag);
        }

        if ($request->has('files')) {

            foreach ($request->get('files')  as $file) {
                if ($file) {

                    $check_exist = File::where('file', $file['file']);

                    if ($check_exist->count() > 0) {
                        $check_exist->update([
                            'collection' => $file['collection']
                        ]);
                    } else {
                        $old = 'attachment/' . $file['file'];
                        $new = 'content/' . $result->id . '/' . $file['file'];

                        foreach ([500,300,200,100,50] as $dir) {
                            $copy = Storage::copy($old, 'content/' . $result->id . '/' . $dir . '/' . $file['file']);
                            if ($copy) {
                                $copy = \Intervention\Image\Facades\Image::make(storage_path('app/public/content/' . $result->id . '/' . $dir . '/' . $file['file']));
                                $copy->resize($dir, $dir);
                                $copy->save();
                            }
                        }

                        $move = Storage::move($old, $new);

                        if ($move) {

                            $result->files()->create([
                                'created_by' => Auth::id(),
                                'file' => $file['file'],
                                'directory' => 'content',
                                'collection' => $file['collection'],
                                'size' => json_encode([500,300,200,100,50])
                            ]);
                        }
                    }
                }

            }
        }


        if ($result) {
            return response()->json(['status' => true, 'msg' => 'عملیات موفقیت امیز بود.'], 200);
        }

        return response()->json(['status' => false, 'msg' => 'un success'], 200);

    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changestatus($id, Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'status' => 'required',
        ], [
            'status.required' => 'وضعیت را وارد نکرده اید.',
        ]);

        if ($validator->fails()) {

            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        $model = BlogContent::where('id', $id)->update([
            'status' => $request->get('status')
        ]);

        if ($model) {

            return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);
        }
        return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
    }
}
