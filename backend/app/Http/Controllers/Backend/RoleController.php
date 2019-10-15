<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class RoleController extends Controller
{

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $result = Role::select('key', 'title')
            ->with(['permission'])
            ->orderBy('created_at','asc')
            ->get();


        return response($result);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'key' => 'required',
            'title' => 'required',
        ],[
            'key.required' => 'اسلاگ نمیتواند خالی باشد.',
            'title.required' => 'عنوان نمیتواند خالی باشد.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'msg'  =>  $validator->errors()->first(), 'validator' => $validator->errors()]);
        }


        if (Role::find($request->get('key'))) {
            $result = Role::where(['key' => $request->get('key')])->update(
                ['title' => $request->get('title')]
            );
        } else {
            $result = Role::create(
                ['key' => $request->get('key'), 'title' => $request->get('title')],
                ['key' => $request->get('key')]
            );
        }


        if ($result) {
            return response()->json(['status' => true, 'result' => $result], 200);
        }

        return response()->json(['status' => false, 'msg' => 'un success'], 200);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $result = Role::select('key', 'title')->with(['permission' => function($q) {
            $q->select('title', 'key');
        }])->find($id);

        if ($result) {

            return response()->json(['status' => true, 'result' => $result], 200);
        }

        return response()->json(['status' => false, 'msg' => 'خطایی رخ داده است'], 200);
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {

        if ($request->get('role')) {
            $model = Role::updateOrCreate([
                'key' => $request->get('key'),
                'title' => $request->get('title'),
            ], ['id' => $id]);
        } else {
            $model = Role::find($id);
        }
        $model->permission()->detach();
        $model->permission()->attach($request->get('permissions'));

        if ($model) {
            return response()->json(['status' => true, 'msg' => 'تغییرات با موفقیت اعمال شد.'], 200);
        }
        return response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.'], 200);

    }

}
