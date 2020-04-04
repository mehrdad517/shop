<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\ProductList;
use App\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductListController extends Controller
{
    public function index(Request $request)
    {

        $entities = ProductList::with(['createdBy', 'products'])
            ->where(function ($q) use ($request) {
                if ($request->has('filter')) {

                    $filter = json_decode($request->get('filter'), true);

                    if (@$filter['created_by'] != -1) {
                        $q->where('created_by', '=', $filter['created_by']);
                    } elseif (! in_array(Auth::user()->role_key, Role::where('crud', 1)->pluck('key')->toArray())) {
                        $q->where('created_by', '=', Auth::id());
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
        try {

            $validator = \Validator::make($request->all(), [
                'title' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
            }

            if (count($request->get('products')) == 0) {
                return response()->json(['status' => false, 'msg' => 'هیچ محصولی انتخاب نشده است.']);
            }

            $result = ProductList::firstOrCreate([
                'title' => $request->get('title'),
                'status' => $request->get('status'),
                'order' => $request->get('order'),
                'link' => $request->get('link'),
                'created_by' => Auth::id()
            ]);


            if ($request->has('products')) {

                $result->products()->detach();
                $result->products()->attach($request->get('products'));

            }


            if ($result) {
                return response()->json(['status' => true, 'msg' => 'با موفقیت انجام شد.'], 200);
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
        $result = ProductList::with(['products' => function($q) {
            $q->select('id', 'title as name');
        }])->find($id);


        if ($result) {
            return response([
                'title' => $result->title,
                'status' => $result->status,
                'order' => $result->order,
                'link' => $result->link,
                'products' => $result->products
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

        $validator = \Validator::make($request->all(), [
            'title' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        if (count($request->get('products')) == 0) {
            return response()->json(['status' => false, 'msg' => 'هیچ محصولی انتخاب نشده است.']);
        }

        $result = ProductList::updateOrCreate(['id' => $id], [
            'title' => $request->get('title'),
            'status' => $request->get('status'),
            'order' => $request->get('order'),
            'link' => $request->get('link'),
        ]);


        if ($request->has('products')) {

            $result->products()->detach();
            $result->products()->attach($request->get('products'));

        }



        if ($result) {
            return response()->json(['status' => true, 'msg' => 'عملیات موفقیت امیز بود.'], 200);
        }

        return response()->json(['status' => false, 'msg' => 'un success'], 200);

    }
}
