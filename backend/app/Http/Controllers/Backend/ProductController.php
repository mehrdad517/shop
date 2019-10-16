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
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
            'price' => 'required',
        ],[
            'title.required' => 'عنوان نمیتواند خالی باشد.',
            'content.required' => 'محتوا اولیه را وارد نکرده اید.',
            'price.required' => 'قیمت را وارد نکرده اید'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'msg'  =>  $validator->errors()->first(), 'validator' => $validator->errors()]);
        }

        $result = Product::firstOrCreate([
            'title' => $request->get('title'),
            'content' => $request->get('content'),
            'price' => $request->get('price')
        ]);

        if ($result) {
            return response()->json(['status' => true, 'result' => $result], 200);
        }

        return response()->json(['status' => false, 'msg' => 'un success'], 200);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $result = Product::find($id);

        if ($result) {

            return response()->json(['status' => true, 'result' => $result], 200);
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
            'content' => 'required',
            'price' => 'required',
        ],[
            'title.required' => 'عنوان نمیتواند خالی باشد.',
            'content.required' => 'محتوا اولیه را وارد نکرده اید.',
            'price.required' => 'قیمت را وارد نکرده اید'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'msg'  =>  $validator->errors()->first(), 'validator' => $validator->errors()]);
        }

        $result = Product::updateOrCreate([
            'title' => $request->get('title'),
            'content' => $request->get('content'),
            'price' => $request->get('price')
        ], ['id' => $id]);

        if ($result) {
            return response()->json(['status' => true, 'result' => $result], 200);
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
