<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Order;
use App\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{

    // show all order
    public function index(Request $request)
    {


        $entities = Order::select('order.id', 'order.user_id' ,'order.order_status', 'order.transport_status','order.delivery_status', 'order.items_status', 'order.total_price', 'created_at')
           ->with(['user' => function($q) {
            return $q->select('id', 'name');
        }])->where(function ($q) use($request) {

            if ($request->has('filter')) {

                $filter = json_decode($request->get('filter'));

                if ($filter->id) {
                    $q->where('id', $filter->id);
                }
                if ($filter->order_status != -1) {
                    $q->where('order_status', $filter->order_status);
                }

                if ($filter->transport_status != -1) {
                    $q->where('transport_status', $filter->transport_status);
                }

                if ($filter->delivery_status != -1) {
                    $q->where('delivery_status', $filter->delivery_status);
                }

                if ($filter->items_status != -1) {
                    $q->where('items_status', $filter->items_status);
                }
            }
            })->orderBy($request->get('sort_field') ?? 'id', $request->get('sort_type') ?? 'desc')
            ->paginate($request->get('limit') ?? 50);

        return response($entities);

    }


    public function show($id)
    {
        $order = Order::with(['user' => function($q) {
            return $q->select('id', 'name', 'mobile');
        }, 'postInfo' => function($q) {
//            return $q->select('ord er_id','full_name');
        }, 'payments', 'attachments', 'productPins' => function($q) {
            return $q->with(['product' => function($q) {
                return $q->select('id', 'title', 'brand_id')->with(['brand' => function($q) {
                    return $q->select('id', 'title');
                }]);
            }]);
        }])->find($id)->toArray();


        return response($order);
    }
}
