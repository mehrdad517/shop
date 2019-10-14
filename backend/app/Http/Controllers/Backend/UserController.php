<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Symfony\Component\Console\Input\Input;
use Validator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $entities = User::with(['role' => function($q) {
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

                if (@$filter['role_key']) {
                    $q->where('role_key', $filter['role_key']);
                }
            }
        })->orderBy($request->get('sort_field') ?? 'id', $request->get('sort_type') ?? 'desc')
            ->paginate($request->get('limit') ?? 10);


        return response($entities);

    }

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

        $model = User::create($request->all());

        if ($model) {

            return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);
        }
        return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
    }


    public function show($id) {
        $entities = User::with(['role' => function($q) {
            $q->select('key', 'title');
        }])->where('id', $id)->first();

        return response($entities);
    }

    public function update($id, Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
//            'mobile' => 'required|unique:users|min:11|max:11',
        ], [
            'name.required' => 'نام خود را وارد نکرده اید.',
//            'mobile.required' => 'شماره موبایل خود را وارد نکرده اید.',
//            'mobile.unique' => 'شماره موبایل قبلا در سیستم ثبت شده است.',
//            'mobile.min' => 'شماره وارد شده نامعتبر است',
//            'mobile.max' => 'شماره وارد شده نامعتبر است',
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

}
