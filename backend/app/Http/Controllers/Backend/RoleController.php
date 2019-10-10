<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Role;
use Illuminate\Http\Request;
use Validator;

class RoleController extends Controller
{

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $limit = $request->get('limit') ?? 20;

        // sort parameter
        $field = $request->get('field') ?? 'created_at';
        $type = $request->get('type') ?? 'asc';

        $result = Role::select('key', 'title')
            ->with(['permission' => function($q) {
                return $q->select(['key', 'method']);
            }])
            ->orderBy($field, $type)
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

        $result = Role::firstOrCreate([
            'key' => $request->get('key'),
            'title' => $request->get('title'),
        ]);

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

        return response()->json(['status' => false, 'msg' => 'request is invalid'], 200);
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ],[
            'title.required' => 'عنوان نمیتواند خالی باشد.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'msg'  =>  $validator->errors()->first(), 'validator' => $validator->errors()]);
        }

        $result = Role::updateOrCreate([
            'title' => $request->get('title'),
        ], ['id' => $id]);

        $result->permission()->attach($request->get('permission'));

        if ($result) {
            return response()->json(['status' => true, 'result' => $result], 200);
        }

        return response()->json(['status' => false, 'msg' => 'un success'], 200);

    }


    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function delete($id)
    {

        $role = Role::find($id);

        if ($role) {

            $role->permission()->dettach();
            $result = $role->delete();
            if ($result) {
                return response()->json(['status'  =>  true, 'msg' => 'success']);
            }
        }


        return response()->json(['status'  =>  false, 'msg'=> 'error']);

    }
}
