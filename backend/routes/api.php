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



Route::group(['prefix' => '/backend'], function () {

    Route::group(['prefix' => '/users'], function () {

        Route::group(['prefix' => '/permissions'], function () {
            Route::get('/initial', 'Backend\PermissionController@initial');
            Route::get('/', 'Backend\PermissionController@index');
        });

        Route::group(['prefix' => '/roles'], function () {
            Route::get('/', 'Backend\RoleController@index');
            Route::post('/', 'Backend\RoleController@store');
        });

        Route::get('/', 'Backend\UserController@index');
        Route::post('/', 'Backend\UserController@store');
        Route::get('/{id}', 'Backend\UserController@show');
        Route::put('/{id}', 'Backend\UserController@update');
        Route::put('/{id}/change/password', 'Backend\UserController@changePassword');
        Route::put('/{id}/change/status', 'Backend\UserController@changeStatus');

    });

    Route::group([ 'prefix' => '/products'], function () {

        Route::group(['prefix' => '/attributes'], function () {
            Route::get('/', 'Backend\GroupAttributeController@index');
            Route::post('/', 'Backend\GroupAttributeController@store');
            Route::get('/{id}', 'Backend\GroupAttributeController@show');
            Route::put('/{id}', 'Backend\GroupAttributeController@update');
        });

        Route::group(['prefix' => '/categories'], function () {
            Route::get('/', function () {
//                $pa = \App\ProductCategory::find(1);
//                \App\ProductCategory::create(['title' => 'xx'], \App\ProductCategory::find(6));
                dd();
                return response(makeTree());
            });
        });

        Route::get('/', 'Backend\ProductController@index');
        Route::post('/', 'Backend\ProductController@store');
        Route::get('/{id}', 'Backend\ProductController@show');
        Route::put('/{id}', 'Backend\ProductController@update');
        Route::put('/{id}/change/status', 'Backend\ProductController@changeStatus');
    });

});


function makeTree()
{
    $nodes = \App\ProductCategory::get()->toTree();
    if(! empty($nodes->toArray())) {
        $tree = '<div class="tree">';
        $traverse = function ($regions) use (&$traverse , &$tree) {
            $tree .= '<ul>';
            foreach ($regions as $key=>$region) {
                $tree .= '<li class="'. ($region->status == 1 ? '' : ' tree-disabled') .'" id="node_'.$region->id.'" data-id="'.$region->id.'"><a href="'. url('Category/'. $region->id).'">'. $region->title . '</a>' ;
                if(count($region->children) > 0) {
                    $traverse($region->children);
                }
                $tree .= '</li>';
            }
            $tree .= '</ul>';
        };
        $traverse($nodes);
        $tree .= '</div>';
    } else {
        $tree =  "<div class='tree'></div><div class='alert alert-info'><p>برای ایجاد نود جدید روی دکمه + کلیک کنید.</p></div>";
    }
    return $tree;
}



