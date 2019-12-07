<?php

namespace App\Http\Controllers\Backend;

use App\Domain;
use App\Http\Controllers\Controller;
use App\Setting;
use Illuminate\Http\Request;

class DomainController extends Controller
{

    public function read($domain, Request $request)
    {
        $setting = Domain::with(['socialMedias', 'communicationChannels'])
            ->where('key', $domain)
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

        $setting = Domain::where('key', $domain)->update([
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

        $setting = Domain::where('key', $domain)->where('status', 1);

        if ($setting->count() > 0) {

            $setting = $setting->update($request->all());

            if ($setting) {
                return response()->json(['status' => true, 'msg' => 'تغییرات با موفقیت اعمال شد']);
            }
        } else {
            return response()->json(['status' => false, 'msg' => 'دامنه نامعتبر است.']);
        }


        return response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);


    }
}
