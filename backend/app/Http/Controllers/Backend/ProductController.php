<?php

namespace App\Http\Controllers\Backend;

use App\Product;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

class ProductController extends Controller
{

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $limit = $request->get('limit') ?? 10;

        // sort parameter
        $field = $request->get('field') ?? 'id';
        $type = $request->get('type') ?? 'desc';

        $result = Product::orderBy($field, $type)->paginate($limit);

        return response($result);
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

}
