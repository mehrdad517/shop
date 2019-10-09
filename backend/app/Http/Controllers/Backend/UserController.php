<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {

        $where = '';
        $field = Input::get('field');
        $type = Input::get('type');

        $search = $request->get('search');
        if ($search) {
            foreach ($search as $key => $item) {
                foreach ($search[$key] as $kind => $value) {
                    if ($value == '') continue;
                    switch ($kind) {
                        case 'integer' :
                            $where .= " AND `$key` = '$value'";
                            break;
                        case 'string':
                            $where .= " AND `$key` like '%$value%'";
                            break;
                        case 'datetime':
                            $date = \FarsiLib::j2gDate($value);
                            $where .= " AND `$key` like '%$date%'";
                            break;
                        case 'date':
                            $date = \FarsiLib::j2gDate($value);
                            $where .= " AND `$key` = '$date'";
                            break;
                    }
                }
            }
        }
        $where = $where ? '1' . $where : 1;

        $entities = User::with(['role'])->whereRaw($where)->orderBy($field ? $field : 'id', $type ? $type : 'DESC')->paginate(10);

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
