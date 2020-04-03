<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Role;
use App\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Console\Input\Input;
use Validator;

class UserController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $entities = User::select(['id','name', 'mobile', 'created_at', 'role_key', 'status'])->with(['role' => function($q) {
            $q->select('key', 'title');
        }])->where(function ($q) use($request) {
            if ($request->has('search')) {
                $filter = json_decode($request->get('search'), true);
                if (@$filter['name']) {
                    $q->where('name', 'like', '%' . $filter['name'] . '%');
                }

                if (@$filter['mobile']) {
                    $q->where('mobile', 'like', '%' . $filter['mobile'] . '%');
                }

                if (@$filter['email']) {
                    $q->where('email', 'like', '%' . $filter['email'] . '%');
                }

                if (@$filter['role_key'] != -1) {
                    $q->where('role_key', $filter['role_key']);
                } else {
                    if (Auth::user()->role_key != 'programmer') {
                        if (! in_array(Auth::user()->role_key, Role::where('full_access', 1)->pluck('key')->toArray())) {
                            $q->whereNotIn('role_key', Role::where('full_access', 1)->pluck('key')->toArray());
                        }
                        if (Auth::user()->role_key != 'super_admin') {
                            $q->where('role_key', '<>', 'super_admin');
                        }
                        $q->where('role_key', '<>', 'programmer');
                    }

                }


                if (@$filter['status'] != -1) {

                    $q->where('status', $filter['status']);
                }

            }
        })->where('id', '<>', Auth::id())->orderBy($request->get('sort_field') ?? 'id', $request->get('sort_type') ?? 'desc')
            ->paginate($request->get('limit') ?? 10);


        return response($entities);

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'mobile' => 'required|unique:users|min:11|max:11',
            'password' => 'required|min:6',
        ], [
            'name.required' => 'نام خود را وارد نکرده اید.',
            'mobile.required' => 'شماره موبایل خود را وارد نکرده اید.',
            'mobile.unique' => 'شماره موبایل قبلا در سیستم ثبت شده است.',
            'mobile.min' => 'شماره وارد شده نامعتبر است',
            'mobile.max' => 'شماره وارد شده نامعتبر است',
            'password.required' => 'پسورد را وارد نکرده اید.',
            'password.min' => 'تعداد کارکتر پسورد باید حداقل شش کاراکتر باشد.'
        ]);

        if ($validator->fails()) {

            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }


//        $request->request->add(['domain' => Auth::user()->domain]);



        $model = User::create($request->all());

        if ($model) {

            return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);
        }
        return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
    }


    /**
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function show($id) {
        $entities = User::select(['id', 'name', 'mobile', 'created_at', 'role_key', 'status'])->with(['role' => function($q) {
            $q->select('key', 'title');
        }])->where('id', $id)->first();

        return response($entities);
    }

    /***
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'role_key' => 'required'
        ], [
            'name.required' => 'نام خود را وارد نکرده اید.',
            'role_key.required' => 'نقش را وارد نکرده اید.',
        ]);

        if ($validator->fails()) {

            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        $model = User::where('id', $id)->update($request->all());

        if ($model) {

            return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);
        }
        return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required',
        ], [
            'name.required' => 'پسورد را وارد نکرده اید.',
        ]);

        if ($validator->fails()) {

            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        $model = User::where('id', $id)->update([
            'password' => bcrypt($request->get('password'))
        ]);

        if ($model) {

            return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);
        }
        return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changestatus($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required',
        ], [
            'status.required' => 'وضعیت را وارد نکرده اید.',
        ]);

        if ($validator->fails()) {

            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        $model = User::where('id', $id)->update([
            'status' => $request->get('status')
        ]);

        if ($model) {

            return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);
        }
        return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
    }



}
