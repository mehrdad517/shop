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

        $setting = Domain::find(domain($request->header('origin')));

        if ($setting) {

            if(!$setting->status) {
                return Response(['status' => false, 'msg' => 'دامنه غیرفعال است']);
            }

            $result = [
                'name' => $setting->name,
                'meta_title' => $setting->meta_title,
                'meta_description' => $setting->meta_description,
                'introduce' => $setting->introduce,
                'free_postage' => $setting->free_postage,
                'min_purchase' => $setting->min_purchase,
                'default_post_cost' => $setting->default_post_cost,
                'copy_right' => $setting->copy_right,
                'blog_title' => $setting->blog_title,
                'blog_description' => $setting->blog_description,

                'app' => [],
                'license' => [],
                'social_medias' => [],
                'communication_channels' => []

            ];


            foreach ($setting->app as $app) {
                $result['app'][] = ['domain_app_id' => $app->pivot->links_id, 'value' => $app->pivot->value];
            }

            foreach ($setting->license as $license) {
                $result['license'][] = ['domain_license_id' => $license->pivot->links_id, 'value' => $license->pivot->value];
            }


            foreach ($setting->socialMedias as $social_media) {
                $result['social_medias'][] = ['social_media_id' => $social_media->pivot->links_id, 'value' => $social_media->pivot->value];
            }

            foreach ($setting->communicationChannels as $communication_channel) {
                $result['communication_channels'][] = ['communication_channel_id' => $communication_channel->pivot->links_id, 'value' => $communication_channel->pivot->value];
            }

            return Response()->json(['status' => true, 'domain' => $result]);
        }

        return Response(['status' => false, 'msg' => 'دامنه موجود نیست']);
    }

    public function update(Request $request)
    {

        $validator = \Validator::make($request->all(),[
            'name' => 'required',
            'meta_title' => 'required|max:60',
            'meta_description' => 'required|max:255',
            'introduce' => 'required',
            'copy_right' => 'required',
            'blog_title' => 'required',
            'blog_description' => 'required',
        ]);

        if ($validator->fails()) {

            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        $setting = Domain::find(\domain($request->header('Origin')));

        $setting->update([
            'name' => $request->get('name'),
            'meta_title' => $request->get('meta_title'),
            'meta_description' => $request->get('meta_description'),
            'introduce' => $request->get('introduce'),
            'copy_right' => $request->get('copy_right'),
            'blog_title' => $request->get('blog_title'),
            'blog_description' => $request->get('blog_description'),
            'free_postage' => $request->get('free_postage'),
            'min_purchase' => $request->get('min_purchase'),
            'default_post_cost' => $request->get('default_post_cost'),
        ]);

        try {

            $setting->socialMedias()->detach();
            $setting->communicationChannels()->detach();
            $setting->app()->detach();
            $setting->license()->detach();

            foreach ($request->get('domain_app') as $item) {

                if ($item['domain_app_id'] > 0 and $item['value'] != '') {

                    $setting->app()->attach([
                        $item['domain_app_id'] => ['value' => $item['value']],
                    ]);
                }
            }

            foreach ($request->get('domain_license') as $item) {

                if ($item['domain_license_id'] > 0 and $item['value'] != '') {

                    $setting->license()->attach([
                        $item['domain_license_id'] => ['value' => $item['value']],
                    ]);
                }
            }

            foreach ($request->get('social_medias') as $item) {

                if ($item['social_media_id'] > 0 and $item['value'] != '') {

                    $setting->socialMedias()->attach([
                        $item['social_media_id'] => ['value' => $item['value']],
                    ]);
                }
            }

            foreach ($request->get('communication_channels') as $item) {

                if ($item['communication_channel_id'] > 0 and $item['value'] != '') {

                    $setting->communicationChannels()->attach([
                        $item['communication_channel_id'] => ['value' => $item['value']]
                    ]);
                }
            }

        }catch (\Exception $exception) {

            return response()->json(['status' => false, 'msg' => $exception->getMessage()]);

        }


        if ($setting) {
            return response()->json(['status' => true, 'msg' => 'تغییرات با موفقیت اعمال شد']);
        }

        return response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);


    }


    // read boolean data for update redux
    public function readSticky(Request $request)
    {
        $setting = Domain::select('android', 'ios', 'maintenance_mode', 'register', 'basket', 'user_dashboard', 'admin_panel', 'notify_order', 'notify_ticket', 'notify_register')
            ->find(\domain($request->header('Origin')));

        return response($setting);
    }

    public function updateSticky(Request $request)
    {


        $setting = Domain::where('key', \domain($request->header('Origin')));

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
