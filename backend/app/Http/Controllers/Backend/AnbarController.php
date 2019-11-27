<?php

namespace App\Http\Controllers\Backend;

use App\Anbar;
use App\Http\Controllers\Controller;
use App\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnbarController extends Controller
{

    public function index(Request $request)
    {
        $entities = Anbar::with(['orderBundle' => function($q) {
            return $q->select('order_id');
        }])->where(function ($q) use($request) {

            if ($request->has('filter')) {

                $filter = json_decode($request->get('filter'));

                if ($filter->from_date && $filter->to_date) {
                    $q->where('created_at', '>=', $filter->from_date);
                    $q->where('created_at', '<=', $filter->to_date);
                } elseif ($filter->from_date) {
                    $q->where('created_at', '>=', $filter->from_date);
                } elseif ($filter->to_date) {
                    $q->where('created_at', '<=', $filter->to_date);
                }
            }
        })->orderBy($request->get('sort_field') ?? 'id', $request->get('sort_type') ?? 'asc')
            ->paginate($request->get('limit') ?? 10);


        $list = [];
        foreach ($entities as $key=>$entity) {
            $collect = collect($entity->orders);
            $list[]= [
                'id' => $entity->id,
                'barcode' =>$entity->barcode,
                'anbar_label' =>$entity->anbar_label,
                'customer_invoice' =>$entity->customer_invoice,
                'transport_status' =>$entity->transport_status,
                'delivery_status' =>$entity->delivery_status,
                'items_status' =>$entity->items_status,
                'post_sending_data' =>$entity->post_sending_data,
                'created_at' =>$entity->created_at,
                'count' => $collect->count(),
                'min' => $collect->min('order_id'),
                'max' => $collect->max('order_id'),
            ];

        }

        return response($list);
    }

    /**
     * @param Request $request
     */
    public function store(Request $request)
    {
        $result = Anbar::firstOrCreate([

        ]);



    }

    // show all order
    public function orders(Request $request)
    {
        $entities = Order::select('order.id', 'order.user_id' ,'order.order_status', 'order.transport_status','order.delivery_status', 'order.items_status', 'order.total_price', 'created_at')
            ->with(['user'])
            ->orderBy($request->get('sort_field') ?? 'id', $request->get('sort_type') ?? 'asc')
            ->paginate($request->get('limit') ?? 10);


        foreach ($entities as $key=>$entity) {
            $entities[$key] = Order::g($entity);
        }

        return response($entities);
    }

}
