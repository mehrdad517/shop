<?php

namespace App\Http\Controllers\Backend;

use App\File;
use App\GroupAttribute;
use App\Http\Controllers\Controller;
use App\Role;
use App\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Validator;

class GroupAttributeController extends Controller
{
    public function index(Request $request)
    {

        $result = GroupAttribute::select('id', 'title')
            ->where(function ($q) use ($request) {
                if ($request->has('filter')) {
                    $filter = json_decode($request->get('filter'), true);
                    if ($filter) {
                        $q->where('title', 'like', '%'. $filter['title'] . '%');
                    }
                }
            })
            ->orderBy('id','desc')
            ->paginate(50);

        return response($result);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'msg'  =>  $validator->errors()->first(), 'validator' => $validator->errors()]);
        }


        if (GroupAttribute::where('title', $request->get('title'))->first()) {
            return response()->json(['status' => false, 'msg' => 'این ویژگی قبلا ثبت شده است.'], 200);
        }


        if (GroupAttribute::where('slug', str_replace(' ', ' ', $request->get('title')))->exists()) {
            return response()->json(['status' => false, 'msg'  =>  'این عنوان قبل ثبت شده است.']);
        }





        $result = GroupAttribute::create([
            'title' => $request->get('title'),
            'slug' => str_replace(' ', '-', $request->get('title')),
            'meta_title' => $request->get('meta_title'),
            'meta_description' => $request->get('meta_description'),
        ]);


        if ($result) {
            return response()->json(['status' => true, 'result' => $result], 200);
        }

        return response()->json(['status' => false, 'msg' => 'un success'], 200);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function show($id) {

        $entity = GroupAttribute::with(['files' => function($q) {
            $q->orderBy('order', 'asc');
        }])->find($id);


        $files = [];
        foreach ($entity->files as $file) {
            $files[] = [
                'percent' => 100, // for react component
                'file' => $file['file'],
                'mime_type' => $file['mime_type'],
                'path' => Storage::url('group-attribute/' . $id . '/' . $file['file']), // image or file address
                'collection' => $file['collection'],
                'directory' => 'group-attribute',
                'link' => $file['link'] ?? '',
                'caption' => $file['caption'] ?? '',
                'order' => $file['order'],
            ];
        }

        $list = [
            'id' => $entity->id,
            'title' => $entity->title ?? '',
            'heading' => $entity->heading ?? '',
            'content' => $entity->content ?? '',
            'slug' => $entity->slug ?? '',
            'meta_title' => $entity->meta_title ?? '',
            'meta_description' => $entity->meta_description ?? '',
            'status' => $entity->status ?? '',
            'has_link' => $entity->has_link,
            'files'=> $files,
            'tags' => $entity->tags
        ];

        return response($list);
    }

    public function update($id, Request $request) {

        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ], [
            'title.required' => 'عنوان را وارد نکرده اید.',
        ]);

        if ($validator->fails()) {

            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        if ($request->get('slug')) {
            $slug = GroupAttribute::where('slug', str_replace(' ', '-', $request->get('slug')))->where('id', '<>', $id)->count();
            if ($slug > 0) {
                return Response()->json(['status' => false, 'msg' => 'اسلاگ قبلا ثبت شده است.']);
            }
        }

        $result = GroupAttribute::where('id', $id)->first();

        $request->merge(['slug' => str_replace(' ', '-', $request->get('slug'))]);
        $result->update($request->except('files', 'tags'));

        if ($request->has('tags')) {
            $result->tags()->detach();
            foreach ($request->get('tags') as $tag) {

                if (!is_numeric($tag)) {
                    $tag = Tag::create(['name' => $tag])->id;
                }

                $result->tags()->attach($tag);
            }
        }

        if ($request->has('files')) {

            foreach ($request->get('files')  as $file) {

                if ($file) {

                    $check_exist = File::where('file', $file['file']);

                    if ($check_exist->count() > 0) {

                        $check_exist->update([
                            'collection' => $file['collection'],
                            'link' => $file['link'],
                            'caption' => $file['caption'],
                            'order' => $file['order']
                        ]);

                    } else {

                        $old = 'attachment/' . $file['file'];

                        if ($file['mime_type'] == 'image') {

                            foreach ([500,300,200,100,50] as $dir) {
                                $copy = Storage::copy($old, 'group-attribute/' . $id . '/' . $dir . '/' . $file['file']);
                                if ($copy) {
                                    $copy = \Intervention\Image\Facades\Image::make(storage_path('app/public/group-attribute/' . $id . '/' . $dir . '/' . $file['file']));
                                    $copy->resize($dir, $dir);
                                    $copy->save();
                                }
                            }
                        }

                        $new = 'group-attribute/' . $id . '/' . $file['file'];

                        $move = Storage::move($old, $new);

                        if ($move) {

                            $result->files()->create([
                                'created_by' => Auth::id(),
                                'file' => $file['file'],
                                'directory' => 'group-attribute',
                                'collection' => $file['collection'],
                                'size' => json_encode([500,300,200,100,50]),
                                'link' => $file['link'],
                                'caption' => $file['caption'],
                                'order' => $file['order']
                            ]);
                        }
                    }
                }

            }
        }

        if ($result) {

            return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);
        }
        return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
    }
}
