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
            ->where(function ($q) {
                if (Auth::check()) {
                    if (Auth::user()->role_key != 'programmer') {
                        if (! in_array(Auth::user()->role_key, Role::where('full_access', 1)->pluck('key')->toArray())) {
                            $q->whereNotIn('key', Role::where('full_access', 1)->pluck('key')->toArray());
                        }
                        if (Auth::user()->role_key != 'super_admin') {
                            $q->where('key', '<>', 'super_admin');
                        }
                        $q->where('key', '<>', 'programmer');
                    }
                }
            })
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

        $list = Role::getPermissions($role, $request->get('map') ?? false);

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
