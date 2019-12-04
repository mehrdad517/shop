<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{

    public function read($domain, Request $request)
    {
        $setting = Setting::where('domain', $domain)
            ->first();

        return response($setting);
    }

    public function update($domain, Request $request)
    {

        $validator = \Validator::make($request->all(),[
            'name' => 'required',
            'meta_title' => 'required|max:60',
            'meta_description' => 'required|max:255',
            'introduce' => 'required',
        ]);

        if ($validator->fails()) {

            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        $setting = Setting::where('domain', $domain)->update([
            'name' => $request->get('name'),
            'meta_title' => $request->get('meta_title'),
            'meta_description' => $request->get('meta_description'),
            'introduce' => $request->get('introduce'),
        ]);


        if ($setting) {
            return response()->json(['status' => true, 'msg' => 'تغییرات با موفقیت اعمال شد']);
        }

        return response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);


    }

    public function booleanChange($domain, Request $request)
    {

        $setting = Setting::where('domain', $domain)->update($request->all());


        if ($setting) {
            return response()->json(['status' => true, 'msg' => 'تغییرات با موفقیت اعمال شد']);
        }

        return response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);


    }
}
