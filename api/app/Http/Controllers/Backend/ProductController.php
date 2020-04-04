<?php

namespace App\Http\Controllers\Backend;

use App\File;
use App\GroupAttribute;
use App\PackageType;
use App\Product;
use App\ProductCategory;
use App\ProductPins;
use App\ProductPriceParameter;
use App\Tag;
use Foo\Bar\Baz;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use phpDocumentor\Reflection\Types\Integer;
use Validator;

class ProductController extends Controller
{

    public function index(Request $request)
    {

        $entities = Product::with(['brand', 'packageType'])->where(function ($q) use($request) {

            if ($request->has('filter')) {

                $filter = json_decode($request->get('filter'), true);
                if (@$filter['title']) {
                    $q->where('title', 'like', '%' . $filter['title'] . '%');
                }

                if (@$filter['id']) {
                    $q->where('id', '=', $filter['id']);
                }

                if ($filter['count'] != -1) {
                    if ($filter['count'] == 1) {
                        $q->where('count', '>', 0);
                    } else {
                        $q->where('count', '=', 0);
                    }
                }

                if ($filter['discount'] != -1) {
                    if ($filter['discount'] == 1) {
                        $q->where('discount', '>', 0);
                    } else {
                        $q->where('discount', '=', 0);
                    }
                }

                if (@$filter['status'] != -1) {
                    $q->where('status', $filter['status']);
                }

                if (@$filter['brand_id'] != -1) {
                    $q->where('brand_id', $filter['brand_id']);
                }

                if (@$filter['package_type_id'] != -1) {
                    $q->where('package_type_id', $filter['package_type_id']);
                }
            }
        })->orderBy($request->get('sort_field') ?? 'id', $request->get('sort_type') ?? 'desc')
            ->paginate($request->get('limit') ?? 10);

        return response($entities);

    }


    // get product group attr
    public function productAttributes($product_id, $categories)
    {
        $list = [];

        $join = DB::table('group_attribute_product')
            ->select('attribute_id' ,'value', 'order')
            ->where('product_id', $product_id);

        $result = DB::table('group_attribute_category as gac')
            ->select(DB::raw('distinct ga.id as id'), 'ga.title as title',DB::raw('IFNULL(sub.value, "") as value'), DB::raw('IFNULL(sub.order, "") as ord'))
            ->leftJoin('group_attribute as ga', 'ga.id', '=', 'gac.attribute_id')
            ->leftJoinSub($join, 'sub', function ($join) {
                $join->on('sub.attribute_id', '=', 'ga.id');
            })
            ->whereIn('gac.category_id', explode(',', $categories))
            ->get();


        foreach ($result as $key => $r) {
            $list[] = [
                'id' => $r->id,
                'title' => $r->title,
                'options' => GroupAttribute::find($r->id)->tags,
                'value' => $r->value,
                'order' => $r->ord == '' ? $key : $r->ord,
            ];
        }

        return $list;
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $result = Product::with(['categories' => function($q) {
            $q->select('value', 'label');
        },'packageType', 'tags', 'files' => function($q) {
            $q->orderBy('order', 'asc');
        }])->find($id);

        if ($result) {


            $files = [];
            foreach ($result->files as $file) {
                $files[] = [
                    'percent' => 100, // for react component
                    'file' => $file['file'],
                    'mime_type' => $file['mime_type'],
                    'path' => Storage::url('product/' . $result->id . '/' . $file['file']), // image or file address
                    'collection' => $file['collection'],
                    'directory' => 'product',
                    'link' => $file['link'] ?? '',
                    'caption' => $file['caption'] ?? '',
                    'order' => $file['order'],
                ];
            }

            return response([
                'title' =>  $result->title,
                'heading' =>  $result->heading ?? '',
                'code' =>  $result->code,
                'brand_id' =>  $result->brand_id,
                'package_type_id' =>  $result->package_type_id,
                'status' =>  $result->status,
                'slug' =>  $result->slug ?? '',
                'meta_title' =>  $result->meta_title ?? '',
                'meta_description' =>  $result->meta_description ?? '',
                'content' =>  $result->content ?? '',
                'price' => $result->price,
                'discount' => $result->discount,
                'weight' => $result->weight,
                'count' => $result->count,
                'brand' => $result->brand,
                'categories' => $result->categories,
                'package_type' => $result->packageType,
                'tags' => $result->tags,
                'files' => $files
            ]);
        }

        return response()->json(['status' => false, 'msg' => 'request is invalid'], 200);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'code' => 'required|unique:product',
                'brand_id' => 'required',
                'package_type_id' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['status' => false, 'msg'  =>  $validator->errors()->first()]);
            }

            if ($request->get('brand_id') == -1) {
                return response()->json(['status' => false, 'msg'  =>  'برند را وارد کنید.']);
            }

            if ($request->get('package_type_id') == -1) {
                return response()->json(['status' => false, 'msg'  =>  'واحد را وارد کنید.']);
            }

            if (count($request->get('categories')) == 0) {
                return response()->json(['status' => false, 'msg'  =>  'دسته بندی محصول را انتخاب نکرده اید.']);
            }

            if ($request->get('slug') && $request->get('slug') != "") {
                $slug = Product::where('slug', str_replace(' ', '-', $request->get('slug')))->count();
                if ($slug > 0) {
                    return Response()->json(['status' => false, 'msg' => 'اسلاگ قبلا ثبت شده است.']);
                }
            }


            $result = Product::firstOrCreate([
                'created_by' => Auth::id(),
                'title' => $request->get('title'),
                'heading' => $request->get('heading'),
                'content' => $request->get('content'),
                'brand_id' => $request->get('brand_id'),
                'package_type_id' => $request->get('package_type_id'),
                'code' => $request->get('code'),
                'status' => $request->get('status'),
                'slug' => $request->get('slug') == '' ? null : str_replace(' ', '-', $request->get('slug')),
                'meta_title' => $request->get('meta_title'),
                'meta_description' => $request->get('meta_description'),
            ]);


            $result->categories()->detach();
            $categories_result = [];

            foreach ($request->get('categories') as $category) {
                $ancestors = ProductCategory::ancestorsAndSelf($category);
                foreach ($ancestors as $ancestor) {
                    if ( ! in_array($ancestor->value, $categories_result)) {
                        $categories_result[] = $ancestor->value;
                    }
                }
            }

            $result->categories()->attach($categories_result);

            // add attr
            if ($request->has('attributes')) {
                foreach ($request->get('attributes') as $item) {
                    if ($item['value']) {
                        $result->attributes()->attach(['id' => $item['id']], [
                            'value' => substr($item['value'], 0, 255),
                            'order' => $item['order'],
                        ]);
                    }
                }
            }

            if ($request->has('tags')) {
                $result->tags()->detach();
                foreach ($request->get('tags') as $tag) {

                    if (!is_numeric($tag)) {
                        $tag = Tag::create(['name' => remove_special_char($tag)])->id;
                    }
                    $result->tags()->attach($tag);
                }
            }

            if ($request->has('files')) {

                foreach ($request->get('files')  as $file) {
                    if ($file) {

                        $old = 'attachment/' . $file['file'];

                        if ($file['mime_type'] == 'image') {
                            foreach ([500, 300, 200, 100, 50] as $dir) {
                                $copy = Storage::copy($old, 'product/' . $result->id . '/' . $dir . '/' . $file['file']);
                                if ($copy) {
                                    $copy = \Intervention\Image\Facades\Image::make(storage_path('app/public/product/' . $result->id . '/' . $dir . '/' . $file['file']));
                                    $copy->resize($dir, $dir);
                                    $copy->save();
                                }
                            }
                        }

                        $new = 'product/' . $result->id . '/' . $file['file'];

                        $move = Storage::move($old, $new); // Move Main Image

                        if ($move) {

                            $result->files()->create([
                                'created_by' => Auth::id(),
                                'file' => $file['file'],
                                'collection' => $file['collection'],
                                'directory' => 'product',
                                'size' => $file['mime_type'] == 'image' ? json_encode([500,300,200,100,50]): NULL,
                                'link' => $file['link'],
                                'caption' => $file['caption'],
                                'order' => $file['order']
                            ]);
                        }

                    }

                }
            }

            if ($result) {
                return response()->json(['status' => true,'msg' => 'با موفقیت انجام شد.' ,'result' => $result], 200);
            }

            return response()->json(['status' => false, 'msg' => 'un success'], 200);
        } catch (\Exception $exception) {
            return response()->json(['status' => false, 'msg' => $exception->getMessage()]);
        }

    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'code' => 'required',
            'brand_id' => 'required',
            'package_type_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'msg'  =>  $validator->errors()->first()]);
        }

        if ($request->get('brand_id') == -1) {
            return response()->json(['status' => false, 'msg'  =>  'برند را وارد کنید.']);
        }

        if ($request->get('package_type_id') == -1) {
            return response()->json(['status' => false, 'msg'  =>  'واحد را وارد کنید.']);
        }

        if (count($request->get('categories')) == 0) {
            return response()->json(['status' => false, 'msg'  =>  'دسته بندی محصول را انتخاب نکرده اید.']);
        }

        if ($request->get('code') && $request->get('code') != "") {
            $code = Product::where('code', $request->get('code'))->where('id', '<>', $id)->count();
            if ($code > 0) {
                return Response()->json(['status' => false, 'msg' => 'کد قبلا ثبت شده است.']);
            }
        }

        if ($request->get('slug') && $request->get('slug') != "") {
            $slug = Product::where('slug', str_replace(' ', '-', $request->get('slug')))->where('id', '<>', $id)->count();
            if ($slug > 0) {
                return Response()->json(['status' => false, 'msg' => 'اسلاگ قبلا ثبت شده است.']);
            }
        }

        try {
            $result = Product::updateOrCreate(['id' => $id] ,[
                'title' => $request->get('title'),
                'heading' => $request->get('heading'),
                'content' => $request->get('content'),
                'brand_id' => $request->get('brand_id'),
                'package_type_id' => $request->get('package_type_id'),
                'code' => $request->get('code'),
                'status' => $request->get('status'),
                'slug' => $request->get('slug') == '' ? null : str_replace(' ', '-', $request->get('slug')),
                'meta_title' => $request->get('meta_title'),
                'meta_description' => $request->get('meta_description'),
            ]);

            $result->categories()->detach();

            $categories_result = [];

            foreach ($request->get('categories') as $category) {
                $ancestors = ProductCategory::ancestorsAndSelf($category);
                foreach ($ancestors as $ancestor) {
                    if ( ! in_array($ancestor->value, $categories_result)) {
                        $categories_result[] = $ancestor->value;
                    }
                }
            }

            $result->categories()->attach($categories_result);

            if ($request->has('attributes')) {
                $result->attributes()->detach();
                foreach ($request->get('attributes') as $item) {
                    if ($item['value']) {
                        $result->attributes()->attach(['id' => $item['id']], [
                            'value' => substr($item['value'], 0, 255),
                            'order' => $item['order'],
                        ]);
                    }
                }
            }


            if ($request->has('tags')) {
                $result->tags()->detach();
                foreach ($request->get('tags') as $tag) {

                    if (!is_numeric($tag)) {
                        $tag = Tag::create(['name' => remove_special_char($tag)])->id;
                    }

                    $result->tags()->attach($tag);
                }
            }

            if ($request->has('files')) {

                foreach ($request->get('files')  as $file) {

                    if ($file) {

                        $check_exist = File::where('file', $file['file']);
                        if ($check_exist->count() > 0) {

                            $result->files()->updateOrCreate(['file' => $file['file']],[
                                'collection' => $file['collection'],
                                'link' => $file['link'],
                                'order' => $file['order']
                            ]);

                        }
                        else { // update

                            $old = 'attachment/' . $file['file'];

                            if (Storage::exists($old)) {

                                if ($file['mime_type'] == 'image') {

                                    foreach ([500,300,200,100,50] as $dir) {

                                        $copy = Storage::copy($old, 'product/' . $id . '/' . $dir . '/' . $file['file']);

                                        if ($copy) {

                                            $copy = \Intervention\Image\Facades\Image::make(storage_path('app/public/product/' . $id . '/' . $dir . '/' . $file['file']));
                                            $copy->resize($dir, $dir);
                                            $copy->save();
                                        }
                                    }
                                }

                                $new = 'product/' . $id . '/' . $file['file'];

                                $move = Storage::move($old, $new); // Move Main Image

                                if ($move) {
                                    $result->files()->updateOrCreate([
                                        'created_by' => Auth::id(),
                                        'mime_type' => $file['mime_type'],
                                        'file' => $file['file'],
                                        'collection' => $file['collection'],
                                        'directory' => 'product',
                                        'size' => $file['mime_type'] == 'image' ? json_encode([500,300,200,100,50]): NULL,
                                        'link' => $file['link'],
                                        'caption' => $file['caption'],
                                        'order' => $file['order']
                                    ]);
                                }
                            }
                        }
                    }

                }
            }

            if ($result) {
                return response()->json(['status' => true, 'msg' => 'عملیات موفقیت امیز بود.'], 200);
            }

            return response()->json(['status' => false, 'msg' => 'un success'], 200);
        } catch (\Exception $exception) {

            if ($exception->getPrevious()) {
                $msg = $exception->getPrevious()->errorInfo[2];
            } else {
                $msg = $exception->getMessage();
            }

            return response()->json(['status' => false, 'msg' => $msg], 200);
        }



    }


    // get product pins with price parameter
    public function pins($id)
    {

        $list = [];
        //get all price parameter
        $price_parameters = [];

        // get product
        $product = Product::with(['pins', 'packageType', 'categories'])->find($id);


        $price_parameters_ids = DB::table('price_parameter_switch_category')->whereIn('category_id', $product->categories()->pluck('value'))->pluck('price_parameter_id');

        foreach (ProductPriceParameter::whereNull('parent_id')->where('status', 1)->whereIn('value', $price_parameters_ids)->get() as $parameter) {
            $price_parameters[] = [
                'value' => $parameter->value,
                'label' => $parameter->label,
                'selected' => ''
            ];
        }

        $list = [ // base info from product
            'count' => $product->count,
            'discount' => $product->discount,
            'price' => $product->price,
            'weight' => $product->weight,
            'pins' => [
                [
                    'id' => '',
                    'status' => 1,
                    'count' => 0,
                    'discount' => 0,
                    'price' => 0,
                    'weight' => 0,
                    'price_parameters' => $price_parameters
                ]
            ]
        ];

        if (count($product->pins) > 0) {
            foreach ($product->pins as $key=>$pins) {

                $list['pins'][$key] = [
                    'id' => $pins['id'],
                    'status' => $pins['status'],
                    'count' => $pins['count'],
                    'discount' => $pins['discount'],
                    'price' => $pins['price'],
                    'weight' => $pins['weight']
                ];

                foreach ($price_parameters as $k=>$parameter) {

                    $selected = '';
                    foreach ($pins->priceParameters as $item) {
                        $bool = $item->isDescendantOf(ProductPriceParameter::find($parameter['value']));
                        if ($bool) {
                            $selected = [
                                'value' => $item->value,
                                'label' => $item->label
                            ];
                            break;
                        }
                    }

                    $list['pins'][$key]['price_parameters'][] = [
                        'value' => $parameter['value'],
                        'label' => $parameter['label'],
                        'selected' => $selected
                    ];
                }
            }
        }

        return response(['product' => $product, 'list' => $list]);
    }

    // get product id and change pins
    public function storePins($id, Request $request)
    {

        $validator = Validator::make($request->all(), [
            'price' => 'required',
            'count' => 'required',
            'weight' => 'required',
            'discount' => 'required'
        ]);


        if ($validator->fails()) {
            return response()->json(['status' => false, 'msg'  =>  $validator->errors()->first()]);
        }

        if ($request->get('price') == 0) {
            return response()->json(['status' => false, 'msg'  =>  'قیمت نمیتواند صفر باشد.']);
        }

        try {
            // insert into product
            $product = Product::find($id);

            // if product is bulk update count and weight
            if ($product->packageType->type == PackageType::IS_BULK) {
                $product->update([
                    'count' => $request->get('count'),
                    'weight' => $request->get('count'),
                ]);
            } else {
                $product->update([
                    'price' => $request->get('price'),
                    'discount' => $request->get('discount'),
                    'weight' => $request->get('weight'),
                ]);
            }

            foreach ($request->get('pins') as $pin) {

                $price_parameter = [];
                // product pins relations with price parameter
                foreach ($pin['price_parameters'] as $parameter) {
                    if ($parameter['selected']['value'] != '') {
                        if (ProductPriceParameter::where('value', $parameter['selected']['value'])->exists()) {
                            $price_parameter[] = $parameter['selected']['value'];
                        }
                    }
                }

                if (count($price_parameter) > 0) {

                    $product_pins = $product->pins()->updateOrCreate(['id' => $pin['id'] ], [
                        'price' => $pin['price'],
                        'discount' => $pin['discount'],
                        'weight' => $pin['weight'],
                        'count' => $pin['count'],
                        'status' => $pin['status'],
                    ]);

                    $product_pins->priceParameters()->detach();
                    $product_pins->priceParameters()->attach($price_parameter);

                } else {
                    return response()->json(['status' => false, 'msg' => 'حداقل یک ویژگی اضافه کنید.']);
                }


            }

            return response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);

        } catch (\Exception $exception) {
            return response()->json(['status' => false, 'msg' => $exception->getMessage()]);
        }

    }

}
