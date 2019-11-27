<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Permission;
use App\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
     * @param $role
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     *
     * get for fetch permissions
     */
    public function permissions($role, Request $request)
    {
        $list = [];
        $map = $request->has('map') ? $request->get('map') : false;

        $parents = Permission::select(['parent'])->groupBy('parent')->orderBy('created_at', 'asc')->pluck('parent');
        foreach ($parents as $parent) {

            $actions= [];

            $join = DB::select('call fetch_permissions_with_access(?, ?)', [$role ?? Auth::user()->role_key, $parent]);

            if ($map == 'true' || $map === true ) {
                foreach ($join as $item) {
                    $actions[] = [
                        'id' => $item->key,
                        'parent' => $parent,
                        'title' => $item->title,
                        'access' => $item->access,
                        'method' => $item->method,
                        'url' => $item->url
                    ];
                }

                $list[] = [
                    'controller' => $parent,
                    'actions' => $actions
                ];
            } else {

                foreach ($join as $item) {
                    $list[$parent][last(explode('_', $item->key))] = [
                        'title' => $item->title,
                        'access' => $item->access,
                        'method' => $item->method,
                        'url' => $item->url
                    ];
                }
            }


        }

        return response($list);
    }

    public function setPermission($role, Request $request)
    {

        $role = Role::find($role);

        $role->permissions()->detach();
        $role->permissions()->attach($request->get('permissions'));

        return response()->json(['status' => true, 'msg' => 'موفقیت آمیز']);
    }

}
