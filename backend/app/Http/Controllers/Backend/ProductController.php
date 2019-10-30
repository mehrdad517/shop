<?php

namespace App\Http\Controllers\Backend;

use App\Product;
use App\ProductCategory;
use Foo\Bar\Baz;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Validator;

class ProductController extends Controller
{

    public function index(Request $request)
    {

        $entities = Product::with(['brand'])->where(function ($q) use($request) {
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
            }
        })->orderBy($request->get('sort_field') ?? 'id', $request->get('sort_type') ?? 'desc')
            ->paginate($request->get('limit') ?? 10);

        return response($entities);

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
                'code' => 'required',
                'brand_id' => 'required'
            ],[
                'title.required' => 'عنوان نمیتواند خالی باشد.',
                'code.required' => 'کد محصول نمیتواند خالی باشد.',
                'brand_id' => 'برند را وارد نکرده اید.'
            ]);

            if ($validator->fails()) {
                return response()->json(['status' => false, 'msg'  =>  $validator->errors()->first()]);
            }

            if ($request->get('slug')) {
                $slug = Product::where('slug', $request->get('slug'))->count();
                if ($slug > 0) {
                    return Response()->json(['status' => false, 'msg' => 'اسلاگ قبلا ثبت شده است.']);
                }
            }

            $result = Product::firstOrCreate([
                'title' => $request->get('title'),
                'content' => $request->get('content'),
                'brand_id' => $request->get('brand_id') != 0 ?? null,
                'code' => $request->get('code'),
                'price' => $request->get('price'),
                'status' => $request->get('status'),
                'slug' => $request->get('slug'),
                'meta_title' => $request->get('meta_title'),
                'meta_description' => $request->get('meta_description'),
            ]);

            $result->categories()->detach();
            $result->categories()->attach($request->get('categories'));
            if ($request->has('attributes')) {
                foreach ($request->get('attributes') as $item) {
                    if ($item['value']) {

                        $result->attributes()->attach($item['id'], [
                            'value' => $item['value'],
                            'order' => $item['order'],
                            'main' => $item['main']
                        ]);
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
     * @param $product_id
     * @param Request $request
     * @return \Illuminate\Support\Collection
     */
    public function productAttributes($product_id, $categories)
    {
        $list = [];

        $join = DB::table('group_attribute_product')
            ->select('attribute_id' ,'value', 'order', 'main')
            ->where('product_id', $product_id);

        $result = DB::table('group_attribute_category as gac')
            ->select(DB::raw('distinct ga.id as id'), 'ga.title as title', DB::raw('IFNULL(sub.value, "") as value'), DB::raw('IFNULL(sub.order, "") as ord'), DB::raw('IF(main, "true", "false") as main'))
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
                'value' => $r->value,
                'order' => $r->ord == '' ? $key : $r->ord,
                'main' => $r->main == 'true' ? true : false

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
        }])->find($id);

        if ($result) {

            return response([
                'title' =>  $result->title,
                'code' =>  $result->code,
                'brand_id' =>  $result->brand_id,
                'status' =>  $result->status,
                'slug' =>  $result->slug ?? '',
                'meta_title' =>  $result->meta_title ?? '',
                'meta_description' =>  $result->meta_description ?? '',
                'content' =>  $result->content ?? '',
                'categories' => $result->categories
            ]);
        }

        return response()->json(['status' => false, 'msg' => 'request is invalid'], 200);
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
            'brand_id' => 'required'
        ],[
            'title.required' => 'عنوان نمیتواند خالی باشد.',
            'code.required' => 'کد محصول نمیتواند خالی باشد.',
            'brand_id.required' => 'برند را وارد نکرده اید.'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'msg'  =>  $validator->errors()->first()]);
        }

        if ($request->get('slug')) {
            $slug = Product::where('slug', $request->get('slug'))->where('id', '<>', $id)->count();
            if ($slug > 0) {
                return Response()->json(['status' => false, 'msg' => 'اسلاگ قبلا ثبت شده است.']);
            }
        }
        $result = Product::updateOrCreate(['id' => $id] ,[
            'title' => $request->get('title'),
            'content' => $request->get('content'),
            'brand_id' => $request->get('brand_id') > 0 ? $request->get('brand_id') : null,
            'code' => $request->get('code'),
            'status' => $request->get('status'),
            'slug' => $request->get('slug'),
            'meta_title' => $request->get('meta_title'),
            'meta_description' => $request->get('meta_description'),
        ]);

        $result->categories()->detach();
        $result->categories()->attach($request->get('categories'));
        if ($request->has('attributes')) {
            $result->attributes()->detach();
            foreach ($request->get('attributes') as $item) {
                if ($item['value']) {
                    $result->attributes()->attach($item['id'], [
                        'value' => $item['value'],
                        'order' => $item['order'],
                        'main' => $item['main']
                    ]);
                }
            }
        }

        if ($result) {
            return response()->json(['status' => true, 'msg' => 'عملیات موفقیت امیز بود.'], 200);
        }

        return response()->json(['status' => false, 'msg' => 'un success'], 200);

    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changestatus($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required',
        ], [
            'status.required' => 'وضعیت را وارد نکرده اید.',
        ]);

        if ($validator->fails()) {

            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        $model = Product::where('id', $id)->update([
            'status' => $request->get('status')
        ]);

        if ($model) {

            return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);
        }
        return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
    }

    public function x($id)
    {
        $list = [];
        $mains = DB::table('group_attribute_product as gap')
            ->select('ga.id', 'ga.title')
            ->leftJoin('group_attribute as ga', 'ga.id', '=', 'gap.attribute_id')
            ->where('product_id', $id)
            ->where('main', 1)
            ->groupBy('ga.id', 'ga.title')
            ->get();

        foreach ($mains as $key=>$main) {
            $list[] = [
                'title' => $main->title,
                'children' =>DB::table('group_attribute_product as gap')
                    ->select('gap.id', 'gap.value', 'gap.order')
                    ->leftJoin('group_attribute as ga', 'ga.id', '=', 'gap.attribute_id')
                    ->where('product_id', $id)
                    ->where('main', 1)
                    ->where('attribute_id', $main->id)
                    ->get()->toArray()
            ];
        }

        return response($list);
    }

}
