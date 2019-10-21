<?php

namespace App\Http\Controllers\Backend;

use App\GroupAttribute;
use App\Http\Controllers\Controller;
use App\Role;
use Illuminate\Http\Request;
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
            ->orderBy('created_at','asc')
            ->get();

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


            $result = GroupAttribute::create(
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
        $entities = GroupAttribute::select(['id', 'title'])->where('id', $id)->first();

        return response($entities);
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

        $model = GroupAttribute::where('id', $id)->update($request->all());

        if ($model) {

            return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);
        }
        return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
    }
}
