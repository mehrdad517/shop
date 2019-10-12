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

        $limit = $request->get('limit') ?? 20;

        // sort parameter
        $field = $request->get('field') ?? 'created_at';
        $type = $request->get('type') ?? 'asc';

        $result = Role::select('key', 'title')
            ->orderBy($field, $type)
            ->get();

        foreach ($result as $r) {

            $r['permissions'] = DB::select('SELECT p.key, p.method, p.title,case when ISNULL(c.role_key) then false ELSE true end AS checked FROM permission AS p
                left JOIN (SELECT * FROM permission_role WHERE permission_role.role_key = "programmer") AS c ON p.`key` = c.permission_key');
        }


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



        $result = Role::firstOrCreate(
            ['key' => $request->get('key')],
            ['key' => $request->get('key'), 'title' => $request->get('title')]
        );

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
            return response()->json(['status' => true, 'result' => $model], 200);
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
