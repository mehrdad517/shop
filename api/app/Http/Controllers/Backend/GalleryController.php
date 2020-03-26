<?php

namespace App\Http\Controllers\Backend;

use App\Gallery;
use App\File;
use App\Http\Controllers\Controller;
use App\Role;
use App\Tag;
use Faker\Provider\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Mockery\Exception;

class GalleryController extends Controller
{
    public function index(Request $request)
    {

        $entities = Gallery::with(['createdBy', 'files'])
            ->where(function ($q) use ($request) {
                if ($request->has('filter')) {

                    $filter = json_decode($request->get('filter'), true);

                    if (@$filter['created_by'] != -1) {
                        $q->where('created_by', '=', $filter['created_by']);
                    } elseif (! in_array(Auth::user()->role_key, Role::where('crud', 1)->pluck('key')->toArray())) {
                        $q->where('created_by', '=', Auth::id());
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
            ]);

            if ($validator->fails()) {
                return response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
            }

            if(count($request->get('files')) == 0) {
                return response()->json(['status' => false, 'msg' => 'هیچ عکسی آپلود نکرده اید.']);
            }

            $result = Gallery::firstOrCreate([
                'title' => $request->get('title'),
                'status' => $request->get('status'),
                'is_slider' => $request->get('is_slider'),
                'created_by' => Auth::id()
            ]);


            if ($request->has('files')) {

                foreach ($request->get('files')  as $file) {
                    if ($file) {

                        $old = 'attachment/' . $file['file'];

                        if ($file['mime_type'] == 'image') {

                            foreach ([500] as $dir) {
                                $copy = Storage::copy($old, 'gallery/' . $result->id . '/' . $dir . '/' . $file['file']);
                                if ($copy) {
                                    $copy = \Intervention\Image\Facades\Image::make(storage_path('app/public/gallery/' . $result->id . '/' . $dir . '/' . $file['file']));
                                    $copy->resize(1300, $dir);
                                    $copy->save();
                                }
                            }
                        }

                        $new = 'gallery/' . $result->id . '/' . $file['file'];

                        $move = Storage::move($old, $new); // Move Main Image

                        if ($move) {

                            $result->files()->create([
                                'created_by' => Auth::id(),
                                'file' => $file['file'],
                                'collection' => $file['collection'],
                                'directory' => 'gallery',
                                'size' => $file['mime_type'] == 'image' ? json_encode([500]): NULL,
                                'link' => $file['link'],
                                'caption' => $file['caption'],
                                'order' => $file['order']
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
        $result = Gallery::with(['files' => function($q) {
            $q->orderBy('order', 'asc');
        }])->find($id);


        $files = [];
        foreach ($result->files as $file) {
            $files[] = [
                'percent' => 100, // for react component
                'file' => $file['file'],
                'mime_type' => $file['mime_type'],
                'path' => Storage::url('gallery/' . $result->id . '/' . $file['file']), // image or file address
                'collection' => $file['collection'],
                'directory' => 'gallery',
                'link' => $file['link'] ?? '',
                'caption' => $file['caption'] ?? '',
                'order' => $file['order'],
            ];
        }

        if ($result) {
            return response([
                'title' => $result->title,
                'status' => $result->status,
                'is_slider' => $result->is_slider,
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
            'title' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        if(count($request->get('files')) == 0) {
            return response()->json(['status' => false, 'msg' => 'هیچ عکسی آپلود نکرده اید.']);
        }


        $result = Gallery::updateOrCreate(['id' => $id], [
            'title' => $request->get('title'),
            'status' => $request->get('status'),
            'is_slider' => $request->get('is_slider'),
        ]);

        try {
            if ($request->has('files')) {

                foreach ($request->get('files')  as $file) {

                    if ($file) {

                        $check_exist = File::where('file', $file['file']);

                        if ($check_exist->count() > 0) {

                            $check_exist->update([
                                'collection' => $file['collection'],
                                'link' => $file['link'],
                                'order' => $file['order'],
                                'caption' => $file['caption'],
                            ]);
                        } else {

                            $old = 'attachment/' . $file['file'];

                            if ($file['mime_type'] == 'image') {

                                foreach ([500] as $dir) {
                                    $copy = Storage::copy($old, 'gallery/' . $result->id . '/' . $dir . '/' . $file['file']);
                                    if ($copy) {
                                        $copy = \Intervention\Image\Facades\Image::make(storage_path('app/public/gallery/' . $result->id . '/' . $dir . '/' . $file['file']));
                                        $copy->resize(1300, $dir);
                                        $copy->save();
                                    }
                                }
                            }

                            $new = 'gallery/' . $result->id . '/' . $file['file'];

                            $move = Storage::move($old, $new);

                            if ($move) {

                                $result->files()->create([
                                    'created_by' => Auth::id(),
                                    'file' => $file['file'],
                                    'directory' => 'gallery',
                                    'collection' => $file['collection'],
                                    'size' => json_encode([500]),
                                    'link' => $file['link'],
                                    'caption' => $file['caption'],
                                    'order' => $file['order']
                                ]);
                            }
                        }
                    }

                }
            }
        } catch (Exception $exception) {
            return response()->json(['status' => false, 'msg' => 'مشکلی در آپلود تصاویر به وجود آمده است.']);
        }



        if ($result) {
            return response()->json(['status' => true, 'msg' => 'عملیات موفقیت امیز بود.'], 200);
        }

        return response()->json(['status' => false, 'msg' => 'un success'], 200);

    }
}
