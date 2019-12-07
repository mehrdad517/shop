<?php

use App\User;
use Illuminate\Http\Request;
use App\Slider;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


/**
 * menu and product categories
 * slider
 * setting
 * login, register, logout
 * search
 * products
 * password change, password reset
 * basket
 */

//Auth::routes();
//
//Route::group(['prefix' => '/'], function () {
//
//    Route::group(['prefix' => 'search'], function () {
//
//        Route::get('/products', function (Request $request) {
//
//            $q = $request->get('q');
//
//            $products = \App\Product::
//            whereRaw("MATCH(title,content) AGAINST(?)", [$q])
//                ->take(10)
//                ->get();
//
//
//            return response()->json($products, 200);
//
//        });
//
//    });
//
//    Route::get('/setting', function () {
//
//        $setting = \App\Setting::first();
//
//        return response($setting);
//
//    });
//
//    Route::get('/slides', function () {
//
//        $slides = Slider::select('pic_link', 'url', 'caption')
//            ->where('is_active', 1)
//            ->take(10)
//            ->orderBy('id', 'desc')
//            ->get();
//
//        return response($slides);
//
//    });
//
//    Route::group(['prefix' => '/categories'], function () {
//
//        Route::get('/', function () {
//
//            $categories = \App\ProductCategory::select('id','title', 'slug')->get();
//
//            return response()->json($categories);
//        });
//
//        Route::get('/{id}', function ($id) {
//
//            $categories = \App\ProductCategory::select('id','title', 'slug', 'pic_link', 'meta_title', 'meta_description')->ancestorsOf($id);
//
//            return response()->json($categories);
//        });
//
//
//    });
//
//    Route::group([ 'prefix' => '/products'], function () {
//
//        Route::get('/', 'Frontend\ProductController@fetchAll');
//        Route::get('/{id}', 'Frontend\ProductController@fetchById');
//
//    });
//
//    Route::prefix('cart')->group(function () {
//        Route::get('/', function () {
//
//        });
//    });
//
//});




Route::group(['prefix' => '/backend'], function () {


    Route::group(['prefix' => 'filter'], function () {
        Route::get('/users', function (Request $request) {
            $response = \App\User::select('id', 'name', 'mobile')
                ->where('name', 'like', '%'.$request->get('term').'%')
                ->orWhere('mobile', 'like', '%'.$request->get('mobile').'%')
                ->where("status", 1)
                ->take(10)
                ->get();
            return response($response);
        });
    });


    Route::group(['prefix' => 'anbar'], function () {
        Route::get('/', 'Backend\AnbarController@index');
    });

    Route::group(['prefix' => 'orders'], function () {

        Route::get('/status', function () {
            $list = [
              'order_status' => \App\Order::status(),
              'transport_status' => \App\Order::transport(),
              'delivery_status' => \App\Order::delivery(),
              'items_status' => \App\Order::items(),
            ];
            return response($list);
        });

        Route::get('/', 'Backend\OrderController@index');
        Route::get('/{id}', 'Backend\OrderController@show');
        Route::put('/{id}', 'Backend\OrderController@update');
        Route::post('/{id}/fractive-request', 'Backend\OrderController@fractiveRequest');
    });

    Route::group([ 'prefix' => '/products'], function () {


        Route::group(['prefix' => '/categories'], function () {
            Route::get('/', 'Backend\ProductCategoryController@index');
            Route::post('/', 'Backend\ProductCategoryController@store');
            Route::get('/{id}', 'Backend\ProductCategoryController@show');
            Route::put('/{id}', 'Backend\ProductCategoryController@update');
            Route::get('/{id}/attributes', 'Backend\ProductCategoryController@getAttributes');
            Route::post('/{id}/attributes', 'Backend\ProductCategoryController@storeAttributes');
        });

        Route::group(['prefix' => '/attributes'], function () {
            Route::get('/', 'Backend\GroupAttributeController@index');
            Route::post('/', 'Backend\GroupAttributeController@store');
            Route::get('/{id}', 'Backend\GroupAttributeController@show');
            Route::put('/{id}', 'Backend\GroupAttributeController@update');
        });

        Route::group(['prefix' => '/brands'], function () {
            Route::get('/', 'Backend\BrandController@index');
            Route::post('/', 'Backend\BrandController@store');
            Route::get('/{id}', 'Backend\BrandController@show');
            Route::put('/{id}', 'Backend\BrandController@update');
        });


        Route::get('/', 'Backend\ProductController@index');
        Route::post('/', 'Backend\ProductController@store');
        Route::get('/{id}', 'Backend\ProductController@show');
        Route::put('/{id}', 'Backend\ProductController@update');
        Route::get('/{id}/categories/{categories}/attributes', 'Backend\ProductController@productAttributes');
        Route::put('/{id}/change/status', 'Backend\ProductController@changeStatus');
        Route::get('/{id}/pins', 'Backend\ProductController@pins');
        Route::post('/{id}/pins', 'Backend\ProductController@storePins');
    });

    Route::group(['prefix' => '/users'], function () {


        Route::group(['prefix' => '/permissions'], function () {
            Route::get('/initial', 'Backend\PermissionController@initial');
            Route::get('/', 'Backend\PermissionController@index');
        });

        Route::group(['prefix' => '/roles'], function () {
            Route::get('/{role}/permissions', 'Backend\RoleController@permissions');
            Route::put('/{role}/permissions', 'Backend\RoleController@setPermission');
            Route::get('/', 'Backend\RoleController@index');
            Route::post('/', 'Backend\RoleController@store');
        });

        Route::get('/', 'Backend\UserController@index');
        Route::post('/', 'Backend\UserController@store');
        Route::get('/{id}', 'Backend\UserController@show');
        Route::put('/{id}', 'Backend\UserController@update');
        Route::put('/{id}/change-password', 'Backend\UserController@changePassword');
        Route::put('/{id}/change-status', 'Backend\UserController@changeStatus');

    });


    Route::group(['prefix' => 'social-medias'], function () {
        Route::get('/', function () {
            $response = \App\SocialMedia::all();
            return response($response);
        });
    });

    Route::group(['prefix' => 'communication_channels'], function () {

        Route::get('/', function () {
            $response = \App\CommunicationChannel::all();
            return response($response);
        });
    });

    Route::group(['prefix' => 'domains'], function () {

        Route::get('/{domain}', 'Backend\DomainController@read');
        Route::put('/{domain}', 'Backend\DomainController@update');
        Route::put('/{domain}/boolean-change', 'Backend\DomainController@booleanChange');

    });


});


/* auth  */
Route::post('/login', 'Auth\LoginController@login');
Route::group(['prefix' => 'validation-code'], function () {
    Route::post('/send', function (Request $request) {

        $validator = \Validator::make($request->all(), [
            'mobile' => 'required',
        ]);

        if ($validator->fails()) {

            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        $user = User::where('mobile', $request->get('mobile'))->where('status', 1);
        // check user status
        if ($user->count() == 1) {
            $rand = rand(10000, 99999);

            $token = bcrypt('@#$!~'. rand(1, 100000) .'*()+=' .time() . '@#$%^^&*((#$$$$)__45454&&^^@@@$#md54532515');
            // send sms to user
            // to do
            $user->update([
                'validation_code' => $rand,
                'remember_token' => $token
            ]);

            return Response()->json(['status' => true, 'msg' => 'کد تایید به موبایل شما ارسال شد.', 'token' => $token]);

        } elseif ($user->count() == 0) {
            return Response()->json(['status' => false, 'msg' => 'شماره موبایل در سیستم وجود ندارد.']);
        } else {
            return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
        }
    });
    Route::post('/verify', function (Request $request) {

        $validator = \Validator::make($request->all(), [
            'token' => 'required',
            'mobile' => 'required',
            'code' => 'required',
        ]);

        if ($validator->fails()) {

            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        $user = User::where('mobile', $request->get('mobile'))
            ->where('remember_token', $request->get('token'))
            ->where('validation_code', $request->get('code'))
            ->where('status', 1)
        ;

        // check user status
        if ($user->count() == 1) {

            $token = bcrypt('@#$!~'. rand(1, 100000) .'*()+=' .time() . '@#$%^^&*((#$$$$)__45454&&^^@@@$#md54532515');

            $user->update([
                'verify_code' => true,
                'remember_token' => $token
            ]);

            return Response()->json(['status' => true, 'msg' => 'رمز جدید خود را وارد کنید', 'token' => $token]);

        } elseif ($user->count() == 0) {
            return Response()->json(['status' => false, 'msg' => 'کد وارد شده نادرست است.']);
        } else {
            return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
        }
    });
    Route::post('/change-password', function (Request $request) {

        $validator = \Validator::make($request->all(), [
            'password' => 'required|min:6',
            'token' => 'required',
            'mobile' => 'required',
            'code' => 'required',
        ]);

        if ($validator->fails()) {

            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        $user = User::where('mobile', $request->get('mobile'))
            ->where('remember_token', $request->get('token'))
            ->where('validation_code', $request->get('code'))
            ->where('status', 1)
        ;

        // check user status
        if ($user->count() == 1) {

            $token = bcrypt('@#$!~'. rand(1, 100000) .'*()+=' .time() . '@#$%^^&*((#$$$$)__45454&&^^@@@$#md54532515');

            $user->update([
                'remember_token' => $token,
                'password' => bcrypt($request->get('password'))
            ]);

            return Response()->json(['status' => true, 'msg' => 'رمز با موفقیت تغیر کرد.', 'token' => $token]);

        } elseif ($user->count() == 0) {
            return Response()->json(['status' => false, 'msg' => 'به جای فرستادن اسپم کتاب بخوانید.']);
        } else {
            return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
        }
    });
});
Route::get('/logout', 'Auth\LoginController@logout')->middleware('auth:api');
Route::post('/change-password', function (Request $request) {

    $validator = \Validator::make($request->all(), [
        'password' => 'required|min:6',
    ]);

    if ($validator->fails()) {

        return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
    }

    $model = $request->user()->update([
        'password' => bcrypt($request->get('password'))
    ]);

    if ($model) {

        return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);
    }
    return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);

})->middleware('auth:api');
Route::post('/change-profile', function (Request $request) {

    $validator = \Validator::make($request->all(), [
        'name' => 'required|min:3',
    ]);

    if ($validator->fails()) {

        return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
    }

    $model = $request->user()->update([
        'name' => $request->get('name')
    ]);

    if ($model) {

        return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);
    }
    return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);

})->middleware('auth:api');

