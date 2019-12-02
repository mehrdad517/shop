<?php

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




Route::group(['prefix' => '/backend', 'middleware' => 'auth:api'], function () {

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


});

Route::post('/login', 'Auth\LoginController@login');
Route::get('/logout', 'Auth\LoginController@logout')->middleware('auth:api');


