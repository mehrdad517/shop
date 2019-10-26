<?php

namespace App\Http\Controllers\Backend;

use App\Brand;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index(Request $request)
    {
        $result = Brand::select('id', 'title')
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
        ],[
            'title.required' => 'عنوان نمیتواند خالی باشد.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'msg'  =>  $validator->errors()->first(), 'validator' => $validator->errors()]);
        }


        $result = Brand::create(
            ['title' => $request->get('title')]
        );


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
        $entities = Brand::find($id);

        $list = [
            'id' => $entities->id,
            'title' => $entities->title ?? '',
            'content' => $entities->content ?? '',
            'slug' => $entities->slug ?? '',
            'meta_title' => $entities->meta_title ?? '',
            'meta_description' => $entities->meta_description ?? '',
            'status' => $entities->status ?? ''
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
            $slug = Brand::where('slug', $request->get('slug'))->where('id', '<>', $id)->count();
            if ($slug > 0) {
                return Response()->json(['status' => false, 'msg' => 'اسلاگ قبلا ثبت شده است.']);
            }
        }

        $model = Brand::where('id', $id)->update($request->all());

        if ($model) {

            return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);
        }
        return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
    }
}
