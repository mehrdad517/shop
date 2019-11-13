<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Order;
use App\Payment;
use App\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{

    // show all order
    public function index(Request $request)
    {
        $entities = Order::select('order.id', 'order.user_id' ,'order.order_status', 'order.transport_status','order.delivery_status', 'order.items_status', 'order.total_price', 'created_at')
            ->with(['user', 'payments', 'postInfo' => function($q){
                $q->with(['region']);
            }, 'attachments', 'productPins' => function($q) {
                $q->with(['product' => function($q) {
                    $q->with(['brand']);
                }]);
            }])->where(function ($q) use($request) {

                if ($request->has('filter')) {

                    $filter = json_decode($request->get('filter'));

                    if ($filter->id) {
                        $q->where('id', $filter->id);
                    }
                    if ($filter->user_id) {
                        $q->where('user_id', $filter->user_id);
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

                    if ($filter->from_date && $filter->to_date) {
                        $q->where('created_at', '>=', $filter->from_date);
                        $q->where('created_at', '<=', $filter->to_date);
                    } elseif ($filter->from_date) {
                        $q->where('created_at', '>=', $filter->from_date);
                    } elseif ($filter->to_date) {
                        $q->where('created_at', '<=', $filter->to_date);
                    }
                }
            })->orderBy($request->get('sort_field') ?? 'id', $request->get('sort_type') ?? 'desc')
            ->paginate($request->get('limit') ?? 50);

        foreach ($entities as $key=>$entity) {
            $entities[$key] = Order::g($entity);
        }


        return response($entities);

    }


    public function show($id)
    {

        $order = Order::with(['user', 'payments', 'postInfo' => function($q){
            $q->with(['region']);
        }, 'attachments', 'productPins' => function($q) {
            $q->with(['product' => function($q) {
                $q->with(['brand']);
            }]);
        }])->find($id);

        $result = Order::g($order);

        return response($result);
    }
}
