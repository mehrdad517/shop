<?php

namespace App\Http\Controllers\Backend;

use App\Domain;
use App\Http\Controllers\Controller;
use App\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DomainController extends Controller
{

    public function read(Request $request)
    {


        $setting = Domain::find(Auth::user()->domain);

        $result = [
            'name' => $setting->name,
            'meta_title' => $setting->meta_title,
            'meta_description' => $setting->meta_description,
            'introduce' => $setting->introduce,
            'social_medias' => [],
            'communication_channels' => []

        ];


        foreach ($setting->socialMedias as $social_media) {
            $result['social_medias'][] = ['social_media_id' => $social_media->pivot->social_media_id, 'value' => $social_media->pivot->value];
        }

        foreach ($setting->communicationChannels as $communication_channel) {
            $result['communication_channels'][] = ['communication_channel_id' => $communication_channel->pivot->communication_channel_id, 'value' => $communication_channel->pivot->value];
        }

        return response($result);
    }

    // read boolean data for update redux
    public function readSticky(Request $request)
    {
        $setting = Domain::select('android', 'ios', 'maintenance_mode', 'register', 'basket', 'user_dashboard', 'admin_panel')->find(Auth::user()->domain);

        return response($setting);
    }

    public function update(Request $request)
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

        $setting = Domain::find(Auth::user()->domain);

        $setting->update([
            'name' => $request->get('name'),
            'meta_title' => $request->get('meta_title'),
            'meta_description' => $request->get('meta_description'),
            'introduce' => $request->get('introduce'),
        ]);

        try{

            $setting->socialMedias()->detach();
            foreach ($request->get('social_medias') as $item) {

                if ($item['social_media_id'] > 0 and $item['value'] != '') {

                    $setting->socialMedias()->attach([
                        $item['social_media_id'] => ['value' => $item['value']]
                    ]);
                }
            }
            $setting->communicationChannels()->detach();

            foreach ($request->get('communication_channels') as $item) {

                if ($item['communication_channel_id'] > 0 and $item['value'] != '') {

                    $setting->communicationChannels()->attach([
                        $item['communication_channel_id'] => ['value' => $item['value']]
                    ]);
                }
            }
        }catch (\Exception$exception) {
            if ($exception->getPrevious()->getCode() == '23000') {
                $msg = 'خطای داده تکراری';
            } else {
                $msg = $exception->getMessage();
            }
            return response()->json(['status' => false, 'msg' => $msg]);
        }





        if ($setting) {
            return response()->json(['status' => true, 'msg' => 'تغییرات با موفقیت اعمال شد']);
        }

        return response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);


    }

    public function updateSticky(Request $request)
    {


        $setting = Domain::where('key', Auth::user()->domain)->where('status', 1);

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
