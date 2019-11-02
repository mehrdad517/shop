<?php

namespace App\Http\Controllers\Backend;

use App\Product;
use App\ProductCategory;
use App\ProductPins;
use Foo\Bar\Baz;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\Types\Integer;
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
            ->select('id as row','attribute_id' ,'value', 'order', 'main')
            ->where('product_id', $product_id);

        $result = DB::table('group_attribute_category as gac')
            ->select(DB::raw('distinct ga.id as id'), 'ga.title as title', 'sub.row',DB::raw('IFNULL(sub.value, "") as value'), DB::raw('IFNULL(sub.order, "") as ord'), DB::raw('IF(main, "true", "false") as main'))
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
                'row' => $r->row,
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
            foreach ($request->get('attributes') as $item) {
                if ($item['value']) {
                    $check = DB::table('group_attribute_product')->where('product_id', $id)->where('attribute_id', $item['id'])->where('value', $item['value']);
                    if ($check->count() > 0 ) {
                        $check->update([
                            'value' => $item['value'],
                            'order' => $item['order'],
                            'main' => $item['main']
                        ]);
                    } else {
                        DB::table('group_attribute_product')->insert([
                            'product_id' => $id,
                            'attribute_id' => $item['id'],
                            'value' => $item['value'],
                            'order' => $item['order'],
                            'main' => $item['main']
                        ]);
                    }
                } else {
                    if (@$item['row']) {
                        $check = DB::table('product_pins')->where('product_id', $id)->where('group_attribute_product_ids', 'like', "%$item[row]%");
                        if ($check->count() == 0) {
                            DB::table('group_attribute_product')->where('id', $item['row'])->delete();
                        } else {
                            foreach ($check->get() as $ch) {
                                DB::table('product_pins')->where('id', $ch->id)->update([
                                    'group_attribute_product_ids' => str_replace("$item[row]/", '', $ch->group_attribute_product_ids)
                                ]);
                            }
                            DB::table('group_attribute_product')->where('id', $item['row'])->delete();
                        }
                    }
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

    public function pins($id)
    {

        $product = Product::find($id);
        $list = [];

        $product_pins = DB::table('product_pins')->where('product_id', $id);

        if ($product_pins->count() > 0) {
            foreach ($product_pins->get() as $pins) {
                $select = -1;

                $selected = explode('/', trim($pins->group_attribute_product_ids, '/'));
                $row = [];
                // get main product attr
                $mains = DB::table('group_attribute_product as gap')
                    ->select('ga.id', 'ga.title')
                    ->leftJoin('group_attribute as ga', 'ga.id', '=', 'gap.attribute_id')
                    ->where('product_id', $id)
                    ->where('main', 1)
                    ->groupBy('ga.id', 'ga.title')
                    ->orderBy('order', 'asc')
                    ->get();

                foreach ($mains as $key=>$main) {

                    $children = DB::table('group_attribute_product as gap')
                        ->select('gap.id', 'gap.value', 'gap.order')
                        ->leftJoin('group_attribute as ga', 'ga.id', '=', 'gap.attribute_id')
                        ->where('product_id', $id)
                        ->where('main', 1)
                        ->where('attribute_id', $main->id)
                        ->get()
                        ->toArray();

                    foreach ($children as $child) {
                        if(in_array($child->id, $selected)) {
                            $select = $child->id;
                        }
                    }

                    $row[] = [
                        'id' => $main->id,
                        'title' => $main->title,
                        'selected' => @$select ? @$select : $children[0]->id,
                        'children' => $children
                    ];

                }

                $list[] = [
                    'pins' => $row,
                    'price' => $pins->price,
                    'count' => $pins->count,
                    'discount' => $pins->discount
                ];
            }
        } else {

            $list[0] = [
                'price' => $product->price,
                'count' => $product->count,
                'discount' => $product->discount,
            ];

            // get main product attr
            $mains = DB::table('group_attribute_product as gap')
                ->select('ga.id', 'ga.title')
                ->leftJoin('group_attribute as ga', 'ga.id', '=', 'gap.attribute_id')
                ->where('product_id', $id)
                ->where('main', 1)
                ->groupBy('ga.id', 'ga.title')
                ->orderBy('order', 'asc')
                ->get();

            foreach ($mains as $key=>$main) {

                $children = DB::table('group_attribute_product as gap')
                    ->select('gap.id', 'gap.value', 'gap.order')
                    ->leftJoin('group_attribute as ga', 'ga.id', '=', 'gap.attribute_id')
                    ->where('product_id', $id)
                    ->where('main', 1)
                    ->where('attribute_id', $main->id)
                    ->get()->toArray();

                $list[0]['pins'][] = [
                    'id' => $main->id,
                    'title' => $main->title,
                    'selected' => $children[0]->id,
                    'children' => $children
                ];
            }
        }


        return response($list);
    }

    public function storePins($id, Request $request)
    {
        ProductPins::where('product_id', $id)->delete();

        if (count($request->get('form')) == 1 && !$request->has('form')[0]['pins']) {
            Product::find($id)->update([
                'count' => $request->get('form')[0]['count'],
                'price' => $request->get('form')[0]['price'],
                'discount' => $request->get('form')[0]['discount'],
            ]);
        } else {
            $counter = 0;
            foreach ($request->get('form') as $frm) {
                $counter += $frm['count'];

                $pins = '/';
                foreach ($frm['pins'] as $pin) {
                    $pins .= "$pin[selected]/";
                }
                ProductPins::updateOrCreate( ['product_id' => $id, 'group_attribute_product_ids' => $pins],[
                    'product_id' => $id,
                    'group_attribute_product_ids' => $pins,
                    'count' => $frm['count'],
                    'discount' => $frm['discount'],
                    'price' => $frm['price'],
                    'detail' => json_encode($frm['pins']),
                ]);
            }

            Product::find($id)->update([
                'count' => $counter,
                'price' => $request->get('form')[0]['price'],
            ]);
        }




        return response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);

    }

}
