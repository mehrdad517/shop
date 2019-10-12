<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Symfony\Component\Console\Input\Input;

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

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create(Request $request)
    {
        return view($this->resources . '.create', [
            'resources' => $this->resources,
            'roles' => Role::where('slug', '<>', 'programmer')->get(['id', 'title']),
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->get('frm')['user'], [
            'name' => 'required',
            'family' => 'required',
            'mobile' => 'required|unique:user|min:11|max:11',

            'password' => 'required|min:6',
        ], [
            'name.required' => 'نام خود را وارد نکرده اید.',
            'family.required' => 'نام خانوادگی خود را وارد نکرده اید.',
            'mobile.required' => 'شماره موبایل خود را وارد نکرده اید.',
            'mobile.unique' => 'شماره موبایل قبلا در سیستم ثبت شده است.',



            'mobile.min' => 'شماره وارد شده نامعتبر است',
            'mobile.max' => 'شماره وارد شده نامعتبر است',
            'password.required' => 'پسورد را وارد نکرده اید.',
            'password.min' => 'تعداد کارکتر پسورد باید حداقل شش کاراکتر باشد.'
        ]);

        if ($validator->fails()) {

            return redirect()->back()->withInput()->withErrors($validator->errors());
        }

        $frm = $request->get('frm');
        $frm['user']['password'] = bcrypt($frm['user']['password']);

        $model = User::create($frm['user']);
        $model->role()->attach($frm['roles']);

        return redirect()->back()->with(['alert-success' => 'با موفقیت به لیست افزوده شد.'])->withInput();
    }

    public function edit($id)
    {
        return view($this->resources . '.edit', [
            'resources' => $this->resources,
            'entity' => User::with('role')->find($id),
            'roles' => Role::where('slug', '<>', 'programmer')->get(['id', 'title']),
        ]);
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update($id, Request $request)
    {

        $frm = $request->get('frm');

        $validator = Validator::make($request->get('frm')['user'], [
            'name' => 'required',
            'family' => 'required',
            'mobile' => "required|unique:user,id,$id|min:11|max:11",

        ], [
            'name.required' => 'نام خود را وارد نکرده اید.',
            'family.required' => 'نام خانوادگی خود را وارد نکرده اید.',
            'mobile.required' => 'شماره موبایل خود را وارد نکرده اید.',
            'mobile.unique' => 'شماره موبایل قبلا در سیستم ثبت شده است.',



            'mobile.min' => 'شماره وارد شده نامعتبر است',
            'mobile.max' => 'شماره وارد شده نامعتبر است',
        ]);

        if ($validator->fails()) {

            return redirect()->back()->withInput()->withErrors($validator->errors());
        }

        $model = User::updateOrCreate(['id' => $id], $frm['user']);

        if (count($frm['roles']) > 0) {
            $model->role()->detach();
            $model->role()->attach($frm['roles']);
        }

        return redirect()->back()->with(['alert-success' => 'با موفقیت به روز رسانی شد']);

    }


    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function loginUser($id)
    {
        \Auth::loginUsingId($id);

        return redirect('/');

    }

}
