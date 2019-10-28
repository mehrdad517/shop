<?php

namespace App\Http\Controllers\Backend;

use App\Product;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
                'price' => 'required',
                'brand_id' => 'required'
            ],[
                'title.required' => 'عنوان نمیتواند خالی باشد.',
                'code.required' => 'کد محصول نمیتواند خالی باشد.',
                'price.required' => 'قیمت را وارد نکرده اید',
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
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $result = Product::with(['attributes', 'categories'])->find($id);

        if ($result) {

            return response($result);
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
            'price' => 'required',
            'brand_id' => 'required'
        ],[
            'title.required' => 'عنوان نمیتواند خالی باشد.',
            'code.required' => 'کد محصول نمیتواند خالی باشد.',
            'price.required' => 'قیمت را وارد نکرده اید',
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
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function delete($id)
    {

        $product = Product::find($id);

        if ($product) {

            $result = $product->delete();
            if ($result) {
                return response()->json(['status'  =>  true]);
            }
        }


        return response()->json(['status'  =>  false, 'msg'=> 'error']);

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

}
