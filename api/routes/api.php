<?php

use App\Menu;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

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


// in group url invalid symbol is -_ do not use symbols
Route::Group(['prefix' => '/'], function() {

    /**
    |
    | frontend api
    |
     */
    Route::group(['prefix' => '/'], function () {

        Route::post('/login', function (Request $request) {
            $validator = \Validator::make($request->all(), [
                'mobile' => 'required|min:11|max:11',
            ]);

            if ( $validator->fails() ) {
                return Response()->json(['status' => false, 'message' => $validator->errors()->first()]);
            }

            $token = quickRandom(); // render token

            $user = User::where('mobile', $request->get('mobile'))->first();
            if ($user) {
                if (!$user->status)   return Response()->json(['status' => false, 'message' => 'کاربری شما غیرفعال است.']); // check user active

                $datetime1 = new DateTime();
                $datetime2 = new DateTime($user->verify_datetime);

                if ( $datetime1->diff($datetime2)->days < 1) { // check send validation code
                    $msg = "از آخرین درخواست شما";
                    if ($datetime1->diff($datetime2)->h == 0) {
                        $msg .= $datetime1->diff($datetime2)->m . ' دقیقه ';
                    } else {
                        $msg .= $datetime1->diff($datetime2)->h .  ' ساعت ';
                    }
                    $msg .= 'گذشته است.با آخرین کد ارسال شده وارد شوید.';
                    return response()->json(['status' => true, 'msg' => $msg, 'token' => $token]);
                }

                $result = payloadRecoverySMS($request->get('mobile'));
                if ($result) {
                    $user->update([
                        'verify_code' => $result,
                        'verify_datetime' => date('Y-m-d H:i:s'),
                        'remember_token' => $token
                    ]);
                    return response()->json(['status' => true, 'msg' => 'کد فعالسازی برای شما ارسال شد.', 'token' => $token]);
                }
            } else { // register users
                $user = User::create([
                    'mobile' => $request->get('mobile'),
                    'role_key' => User::USER_TYPE_GUEST,
                    'password' => bcrypt(time())
                ]);

                if ($user) {
                    $result = payloadRecoverySMS($request->get('mobile'));
                    if ($result) {
                        $user->update([
                            'verify_code' => $result,
                            'verify_datetime' => date('Y-m-d H:i:s'),
                            'remember_token' => $token
                        ]);
                        return response()->json(['status' => true, 'msg' => 'کد فعالسازی برای شما ارسال شد.', 'token' => $token]);
                    }
                }
            }

            return response()->json(['status' => false, 'msg' => 'خطایی رخ داه است.مجددا تلاش کنید.']);
        });

        Route::post('/verify', function (Request $request) {

            $validator = \Validator::make($request->all(), [
                'mobile' => 'required|min:11|max:11',
                'code' => 'required',
                'token' => 'required',
            ]);

            if ($validator->fails()) {
                return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
            }

            $token = quickRandom(); // render token

            $user = User::where('mobile', $request->get('mobile'))
                ->where('remember_token', $request->get('token'))
                ->where('role_key', User::USER_TYPE_GUEST)
                ->where('verify_code', $request->get('code'))
                ->where('status', 1)->first();

            // check user status
            if ($user) {
                // login user success
                Auth::loginUsingId($user->id);
                //update access token and remmber token
                $user->update([
                    'verify_account' => true,
                    'verify_datetime' => date('Y-m-d H:i:s'),
                    'remember_token' => bcrypt($token)
                ]);
                // create access to
                $token = $user->createToken('Token Name')->accessToken;
                return response()->json([
                    'status' => true,
                    'token' => $token,
                    'user' => [
                        'name' => $user->name ?? '',
                        'mobile' => $user->mobile,
                    ],
                ]);


            } else {
                return Response()->json(['status' => false, 'msg' => 'اطلاعات ارسالی نامعتبر است.']);
            }
        });

        Route::get('/setting', function () {

            if (!\Cache::has('setting')) {

                $data = [];

                $response = \DB::select('call setting');

                if (is_array($response)) {
                    // get all footer hyper links tree mode
                    $footer_menu = '';
                    $nodes = Menu::descendantsOf(2)->toTree(2); // get footer links
                    if (!empty($nodes->toArray())) {
                        $traverse = function ($menu) use (&$traverse, &$footer_menu) {
                            $footer_menu .= '<ul>';
                            foreach ($menu as $key => $item) {
                                $has_child = count($item->children);
                                if ($item->parent_id == 2) {
                                    $footer_menu .= '<li  class="parent"><h4>' .$item->label . '</h4>';
                                } else {
                                    if ($has_child > 0) {
                                        $footer_menu .= '<li><a target="'.($item->external_link ? '_blank' : 'self').'" href="'.($item->external_link ?? '#').'" class="'. (!$item->external_link ? 'nextjs-link' : '') .' has-child">' .$item->label . '</a>';
                                    } else {
                                        $footer_menu .= '<li><a target="'.($item->external_link ? '_blank' : 'self').'"  href="'.($item->external_link ?? '#').'" class="'.(!$item->external_link ? 'nextjs-link' : '').' child" >' .$item->label . '</a>';
                                    }
                                }
                                if ($has_child > 0) {
                                    $traverse($item->children);
                                }
                                $footer_menu .= '</li>';
                            }
                            $footer_menu .= '</ul>';
                        };

                        $traverse($nodes);
                    }

                    $data = [
                        'shop' => $response[0]->shop,
                        'app_url' => env('APP_URL'),
                        'title' => $response[0]->title,
                        'meta_title' => $response[0]->meta_title,
                        'meta_description' => $response[0]->meta_description,
                        'introduce' => $response[0]->introduce,
                        'copy_right' => $response[0]->copy_right,
                        'register' => $response[0]->register,
                        'basket' => $response[0]->basket,
                        'active' => $response[0]->active,
                        'maintenance_mode' => $response[0]->maintenance_mode,
                        'contact' => json_decode($response[0]->contact),
                        'social' => json_decode($response[0]->social),
                        'app' => json_decode($response[0]->app),
                        'license' => json_decode($response[0]->license),
                        'footer_menu' => $footer_menu
                    ];
                }
                \Cache::put('setting', $data , 24 * 60 * 7);
            }

            return response(\Cache::get('setting'));

        });

        Route::get('/slider', function () {

            if (!\Cache::has('slider')) {
                $result = \Illuminate\Support\Facades\DB::select('call slider');
                \Cache::put('slider', $result, 24 * 60 * 7);
            }
            return response(\Cache::get('slider'));
        });

        Route::group(['prefix' => 'blog'], function() {
            Route::get('/lastBlogPosts', function () {

                if (!\Cache::has('lastBlogPosts')) {

                    $result = \Illuminate\Support\Facades\DB::select('call blog_posts(?,?,?)', [4, 1, null]); // limit, page, category_id

                    foreach ($result as $key=>$item) {
                        $result[$key]->files = json_decode($item->files);
                        $result[$key]->tags = json_decode($item->tags);
                    }

                    \Cache::put('lastBlogPosts', $result , 24 * 60 * 7);
                }

                return response(\Cache::get('lastBlogPosts'));

            });
        });

        Route::group(['prefix' => 'products'], function () {
            // payload home page items
            Route::get('/payload', function (Request $request) {
                $list = \App\ProductList::select('id', 'title')
                    ->with(['products' => function($q) use($request) {
                        $q->select('id', 'title', 'slug', 'price', 'discount', 'count' ,'brand_id', 'package_type_id')
                            ->with(['brand' => function($q) {
                                $q->select('id', 'title', 'slug');
                            }, 'packageType' => function($q) {
                                $q->select('id', 'title');
                            }, 'files' => function($q) {
                                $q->select('fileable_id', 'fileable_type',  'mime_type', DB::raw('fetch_file_address(id) as prefix'), 'file', 'size')->where('collection', 0)->orderBy('order', 'asc');;
                            }])->where(function ($q) use ($request) {
                                if ($request->has('stock')) {
                                    if ($request->get('stock') == 1) {
                                        $q->where('count', '>', 0);
                                    }
                                }
                            })
                            ->where('status', 0) // change to true
                            ->orderBy($request->get('sort') ?? 'id', $request->get('type') ?? 'desc')
                            ->get();
                    }])
                    ->orderBy('order', 'asc')
                    ->get()
                    ->toArray();

                return response($list);
            });

            // product list
            Route::get('/filter/{category}', function ($category, Request $request) {


                $sort = productSortItems();

                if (!\Cache::has("category[$category]")) {

                    // get main category and fetch relations
                    $item = \App\ProductCategory::select('value', 'slug', 'label', 'heading' ,'meta_title', 'meta_description')
                        ->with(['attributes' => function($q) {
                            $q->select('id', 'title', 'slug', 'has_link', 'content')->with(['tags'])->where('status', 1);
                        }, 'brands' => function($q) {
                            $q->select('id', 'slug', 'title')->where('status', 1);
                        }])->where('slug', $category)->first();


                    if ( ! $item ) { // 404 error handle
                        return response()->json(['status' => false, 'msg' => 'not found'], 404);
                    }

                    $result = [
                        'id' => $item->value,
                        'slug' => $item->slug,
                        'label' => $item->label,
                        'heading' => $item->heading ?? '',
                        'meta_title' => $item->meta_title,
                        'meta_description' => $item->meta_description,
                        'navigation' => [],
                        'tree' => [],
                        'brands' => [],
                        'attributes' => [],
                        'sort' => [],
                    ];

                    // navigation
                    $result['navigation'] =  \App\ProductCategory::select('value', 'slug', 'label')->ancestorsAndSelf($item->value);

                    // get children
                    $result['tree'] = \App\ProductCategory::select('value', 'slug', 'label')->where('parent_id', $item->value)->get();

                    $result['brands'] = $item->brands;
                    $result['attributes'] = $item->attributes;

                    // sort items
                    $result['sort'] = $sort;

                    \Cache::put("category[$category]", $result , 24 * 60 * 7);
                }


                // fetch all record
                $products = \App\Product::select('id', 'title', 'slug', 'price', 'discount', 'count' ,'brand_id', 'package_type_id')
                    ->with(['brand' => function($q) {
                        $q->select('id', 'title', 'slug');
                    }, 'packageType' => function($q) {
                        $q->select('id', 'title');
                    }, 'files' => function($q) {
                        $q->select('fileable_id', 'fileable_type',  'mime_type', DB::raw('fetch_file_address(id) as prefix'), 'file', 'size')
                            ->where('collection', 0)
                            ->orderBy('order', 'asc');
                    }])->where(function ($q) use ($request) {
                        // stock products
                        if ($request->has('stock')) {
                            if ($request->get('stock') == 1) {
                                $q->where('count', '=', 0); // change to >
                            }
                        }
                        // brand filter
                        if ($request->has('brand')) {
                            $q->whereIn('brand_id', $request->get('brand'));
                        }
                    })
                    ->where('status', 0) // change to true
                    ->when($request->has('sort'), function ($q) use($request, $sort) {
                        if (isset($sort[$request->get('sort')])) {
                            $q->orderBy($sort[$request->get('sort')]['field'], $sort[$request->get('sort')]['type']);
                        } else {
                            $q->orderBy('id', 'desc');
                        }
                    })
                    ->paginate($request->get('limit') ?? 2)
                    ->toArray();


                return response()->json([
                    'status' => true,
                    'msg' => 'success',
                    'cached' => \Cache::get("category[$category]"),
                    'products' => $products
                ]);
            });
        });

    });


    /*
     |
     | admin panel routes
     |
     */
    Route::group(['prefix' => 'backend', 'middleware' => ['auth:api']], function () {

        Route::group(['prefix' => 'filter'], function () {

            Route::get('/products', function (Request $request) {
                $response = [];
                if ($request->get('term')) {
                    $response = \App\Product::select('id', 'title as name')
//                        ->where('status', 1)
                        ->where('title', 'like', '%' . $request->get('term') . '%')
                        ->take(10)
                        ->get();
                }
                return response($response);
            });

            // Filter Tags
            Route::get('/tags', function (Request $request) {
                $response = [];
                if ($request->get('term')) {
                    $response = \App\Tag::select('id', 'name')
                        ->where('name', 'like', '%'.$request->get('term').'%')
                        ->take(10)
                        ->get();
                }
                return response($response);
            });

            Route::get('/price-parameter', function (Request $request) {

                $response = [];

                if ($request->get('term')) {

                    $response =  \App\ProductPriceParameter::select('value', 'label')
                        ->where('label', 'like', '%'.$request->get('term').'%')
                        ->whereIn('value', \App\ProductPriceParameter::descendantsOf($request->get('parent'))->pluck('value'))
                        ->where('status', 1)
                        ->take(10)
                        ->get();
                }

                return response($response);
            });

            //Auto Complete User Table
            Route::get('/users', function (Request $request) {
                $response = \App\User::select('id', 'name', 'mobile')
                    ->where('name', 'like', '%'.$request->get('term').'%')
                    ->orWhere('mobile', 'like', '%'.$request->get('mobile').'%')
                    ->where("status", 1)
                    ->take(10)
                    ->get();
                return response($response);
            });

            // Auto Complete User Table
            Route::get('/users/accessible', function (Request $request) {
                $response = \App\User::select('id', 'name', 'mobile')
                    ->where("status", 1)
                    ->where('role_key', '<>', 'guest')
                    ->get();
                return response($response);
            });


        });


        /*
        |-------------------------------------------------------------------------
        |  All File And Media Router
        |--------------------------------------------------------------------------
        |
        | Store File In Attachment Directory
        | This Directory Contain All Media
        | Before Insert In DataBase
        | Original File Save
        | Past Parameters Are file,Directory
        |
        */
        Route::group(['prefix' => 'attachment'], function () {

            Route::post('/', function (Request $request) { // Get Form Data


                // Check File Mime Type
                if (in_array($request->file('file')->getMimeType(), ['image/gif', 'image/png', 'image/jpg', 'image/jpeg'])) {
                    // Image Size Larger Than 1MB
                    if ($request->file('file')->getSize() / 1024 > 1024) {
                        return response()->json(['status' => false, 'msg' => 'حداکثر حجم فایل 1 مگابایت است']);
                    }
                    //Video Check Mime Type
                }
                elseif (in_array($request->file('file')->getMimeType(), ['video/mp4', 'video/ogv', 'video/webm', 'video/3gpp'])) {
                    if ($request->file('file')->getSize() / 1024 > 8388608) {
                        return response()->json(['status' => false, 'msg' => 'حداکثر حجم فایل 8 مگابایت است']);
                    }
                }
                elseif (in_array($request->file('file')->getMimeType(), ['application/zip', 'application/x-rar'])) {
                    if ($request->file('file')->getSize() > 8388608) {
                        return response()->json(['status' => false, 'msg' => 'حداکثر حجم فایل 8 مگابایت است']);
                    }
                }
                elseif (in_array($request->file('file')->getMimeType(), ['application/pdf'])) {
                    if ($request->file('file')->getSize() > 8388608) {
                        return response()->json(['status' => false, 'msg' => 'حداکثر حجم فایل 8 مگابایت است']);
                    }
                }
                else { // Other Format is InValid
                    return response()->json(['status' => false, 'msg' => 'فرمت غیر مجاز است.']);
                }


                //With Storage Laravel File System Save File In Attachment Directory
                $path = $request->file('file')->store($request->has('directory') ? $request->get('directory') : 'attachment', 'public');

                // Water Mark
                if (in_array($request->file('file')->getMimeType(), ['image/gif', 'image/png', 'image/jpg', 'image/jpeg'])) {
                    \Intervention\Image\Facades\Image::make(storage_path('app/public/' . $path))->insert(public_path('logo.png'), 'bottom-right', 30, 30)->save();
                }

                return response()->json([
                    'status' => true,
                    'msg' => 'ok',
                    'path' => Storage::url($path) ,
                    'file' => last(explode('/', $path))
                ]);
            });

            /**
            | Delete Files From Storage
            | Past Parameters Are file,Directory
             */
            Route::delete('/', function (Request $request) {

                $status = false;
                // File with Address or Http etc ...
                $file = last(explode('/', $request->get('file')));

                $db_file = \App\File::where('file', $file)->first();

                if ($db_file) {

                    if ($db_file->created_by != \Illuminate\Support\Facades\Auth::id()) {
                        return response()->json(['status' => false, 'msg' => 'شما نمیتوانید این فایل را حذف کنید.'], 401);
                    }

                    if ($db_file->size) {
                        foreach (json_decode($db_file->size, true) as $size) {
                            Storage::delete($db_file->directory . '/' . $db_file->fileable_id . '/' . $size .  '/' . $file);
                        }
                    }

                    $status = Storage::delete($db_file->directory . '/' . $db_file->fileable_id . '/' . $file);
                    if ($status) {
                        $db_file->delete();
                    }

                } else {
                    // Directory Find
                    $status = Storage::delete(($request->get('directory') ?? 'attachment'). '/' . $file);
                }

                // Status Delete File True Or False
                return response()->json(['status' => $status]);
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

        Route::group([ 'prefix' => 'products'], function () {

            Route::group(['prefix' => '/package-types'], function () {
                Route::get('/', 'Backend\ProductPackageTypeController@index');
                Route::post('/', 'Backend\ProductPackageTypeController@store');
                Route::get('/{id}', 'Backend\ProductPackageTypeController@show');
                Route::put('/{id}', 'Backend\ProductPackageTypeController@update');
            });


            Route::group(['prefix' => '/price-parameters'], function () {
                Route::get('/', 'Backend\ProductPriceParameterController@index');
                Route::post('/', 'Backend\ProductPriceParameterController@store');
                Route::get('/{id}', 'Backend\ProductPriceParameterController@show');
                Route::put('/{id}', 'Backend\ProductPriceParameterController@update');
            });

            Route::group(['prefix' => '/categories'], function () {
                Route::get('/', 'Backend\ProductCategoryController@index');
                Route::post('/', 'Backend\ProductCategoryController@store');
                Route::get('/{id}', 'Backend\ProductCategoryController@show');
                Route::put('/{id}', 'Backend\ProductCategoryController@update');
                Route::get('/{id}/attributes', 'Backend\ProductCategoryController@getAttributes');
                Route::post('/{id}/attributes', 'Backend\ProductCategoryController@storeAttributes');
                Route::get('/{id}/getAllAttributesWithChecked', 'Backend\ProductCategoryController@getAllAttributesWithChecked');
                Route::get('/{id}/brands', 'Backend\ProductCategoryController@getBrands');
                Route::post('/{id}/brands', 'Backend\ProductCategoryController@storeBrands');
                Route::get('/{id}/getAllBrandsWithChecked', 'Backend\ProductCategoryController@getAllBrandsWithChecked');
                Route::get('/{id}/priceParameters', 'Backend\ProductCategoryController@getPriceParameters');
                Route::post('/{id}/priceParameters', 'Backend\ProductCategoryController@storePriceParameters');
                Route::get('/{id}/getAllPriceParametersWithChecked', 'Backend\ProductCategoryController@getAllPriceParametersWithChecked');
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

            Route::group([ 'prefix' => 'product-lists'], function () {
                Route::get('/', 'Backend\ProductListController@index');
                Route::post('/', 'Backend\ProductListController@store');
                Route::get('/{id}', 'Backend\ProductListController@show');
                Route::put('/{id}', 'Backend\ProductListController@update');
            });

            Route::get('/', 'Backend\ProductController@index');
            Route::post('/', 'Backend\ProductController@store');
            Route::get('/{id}', 'Backend\ProductController@show');
            Route::put('/{id}', 'Backend\ProductController@update');
            Route::get('/{id}/categories/{categories}/attributes', 'Backend\ProductController@productAttributes');
            Route::get('/{id}/pins', 'Backend\ProductController@pins');
            Route::post('/{id}/pins', 'Backend\ProductController@storePins');

        });

        Route::group(['prefix' => '/users'], function () {


            Route::group(['prefix' => '/permissions'], function () {
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

        });

        Route::group(['prefix' => 'setting'], function () {

            Route::get('/links', function (Request $request) {
                $response = \App\Links::get();
                return response($response);
            });

            Route::get('/', 'Backend\DomainController@read');
            Route::put('/', 'Backend\DomainController@update');
            Route::get('/sticky-setting', 'Backend\DomainController@readSticky');
            Route::put('/sticky-setting', 'Backend\DomainController@updateSticky');
        });


        Route::group(['prefix' => 'reports'], function () {

            Route::get('/sales-daily-report', 'Backend\ReportController@salesReport');
            Route::get('/map-reports', 'Backend\ReportController@mapReports');
        });

        Route::group([ 'prefix' => 'galleries'], function () {
            Route::get('/', 'Backend\GalleryController@index');
            Route::post('/', 'Backend\GalleryController@store');
            Route::get('/{id}', 'Backend\GalleryController@show');
            Route::put('/{id}', 'Backend\GalleryController@update');
        });

        Route::group([ 'prefix' => 'blog'], function () {


            Route::group(['prefix' => '/categories'], function () {
                Route::get('/', 'Backend\BlogCategoryController@index');
                Route::post('/', 'Backend\BlogCategoryController@store');
                Route::get('/{id}', 'Backend\BlogCategoryController@show');
                Route::put('/{id}', 'Backend\BlogCategoryController@update');
            });


            Route::group(['prefix' => 'contents'], function () {
                Route::get('/', 'Backend\BlogContentController@index');
                Route::post('/', 'Backend\BlogContentController@store');
                Route::get('/{id}', 'Backend\BlogContentController@show');
                Route::put('/{id}', 'Backend\BlogContentController@update');
            });
        });

        Route::group(['prefix' => 'tickets'], function() {

            Route::group(['prefix' => '/categories'], function () {
                Route::get('/', 'Backend\TicketCategoryController@index');
                Route::post('/', 'Backend\TicketCategoryController@store');
                Route::get('/{id}', 'Backend\TicketCategoryController@show');
                Route::put('/{id}', 'Backend\TicketCategoryController@update');
            });

            Route::get('/', 'Backend\TicketController@index');
            Route::post('/', 'Backend\TicketController@store');
            Route::get('/{id}/conversations', 'Backend\TicketController@conversations');
            Route::post('/{id}/conversations', 'Backend\TicketController@storeConversations');
            Route::delete('/{ticket}/conversations/{id}', 'Backend\TicketController@deleteConversation');
            Route::put('/{id}', 'Backend\TicketController@update');
        });

        Route::group(['prefix' => '/regions'], function () {
            Route::get('/', 'Backend\RegionController@index');
            Route::post('/', 'Backend\RegionController@store');
            Route::get('/{id}', 'Backend\RegionController@show');
            Route::put('/{id}', 'Backend\RegionController@update');
        });

        Route::group(['prefix' => '/menu'], function () {

            Route::group(['prefix' => '/hyperlinks'], function () {
                Route::get('/', 'Backend\FooterMenuController@index');
                Route::post('/', 'Backend\FooterMenuController@store');
                Route::get('/{id}', 'Backend\FooterMenuController@show');
                Route::put('/{id}', 'Backend\FooterMenuController@update');
            });


        });


    });

    /*
     |
     | auth api for login, register, change password and etc ...
     |
     */
    Route::post('/login', 'Auth\LoginController@login');
    Route::get('/logout', 'Auth\LoginController@logout')->middleware('auth:api');
    Route::group(['prefix' => 'validation-code'], function () {
        Route::post('/send', function (Request $request) {

            $validator = \Validator::make($request->all(), [
                'mobile' => 'required',
            ]);

            if ($validator->fails()) {

                return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
            }

            $user = User::where('mobile', $request->get('mobile'));

            // check user status
            if ($user->exists()) {

                if (!$user->first()->status) {
                    return Response()->json(['status' => false, 'msg' => 'اکانت شما غیرفعال است']);
                }

                $rand = rand(10000, 99999);

                $token = bcrypt('@#$!~'. rand(1, 100000) .'*()+=' .time() . '@#$%^^&*((#$$$$)__45454&&^^@@@$#md54532515');
                // send sms to user

                try {
                    $verify = new \MahdiMajidzadeh\Kavenegar\KavenegarVerify();
                    $res = $verify->lookup($request->get('mobile'), 'PasswordRecovery', $rand, null, null, 'sms');

                    if (@$res[0]->status) {
                        // to do
                        $user->update([
                            'validation_code' => $rand,
                            'remember_token' => $token
                        ]);

                        return Response()->json(['status' => true, 'msg' => 'کد تایید به موبایل شما ارسال شد.', 'token' => $token]);

                    }
                } catch (Exception $exception) {
                    return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.مجددا تلاش کنید']);
                }

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
                ->where('role_key', '<>', 'guest')
                ->where('validation_code', $request->get('code'))
                ->where('status', 1)
            ;

            // check user status
            if ($user->count() == 1) {

                $token = bcrypt('@#$!~'. rand(1, 100000) .'*()+=' .time() . '@#$%^^&*((#$$$$)__45454&&^^@@@$#md54532515');

                $user->update([
                    'verify_account' => true,
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

        $user  = $request->user();

        $model = $user->update([
            'name' => $request->get('name')
        ]);


        if ($model) {

            return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.', 'user' => [
                'name' => $user->name,
                'mobile' => $user->mobile
            ]]);
        }
        return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);

    })->middleware('auth:api');
    // Permission Initial
    Route::get('/initial', 'Backend\PermissionController@initial');
});

/*
 * asset linker, storage file system
 */
Route::get('/assets/linker', function () {
    $targetFolder = $_SERVER['DOCUMENT_ROOT'].'/storage/app/public';
    $linkFolder = $_SERVER['DOCUMENT_ROOT'].'/public/storage';
    symlink($targetFolder,$linkFolder);
    echo 'Symlink process successfully completed';
});


