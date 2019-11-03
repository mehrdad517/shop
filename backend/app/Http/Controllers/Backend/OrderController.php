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


        $entities = Order::select('order.id', 'order.user_id' ,'order.status', 'order.transport', 'order.total_price', 'created_at')
           ->with(['user' => function($q) {
            return $q->select('id', 'name');
        }])->where(function ($q) use($request) {

            if ($request->has('filter')) {
                $filter = json_decode($request->get('filter'));
                if ($filter->id) {
                    $q->where('id', $filter->id);
                }
                if ($filter->status != -1) {
                    $q->where('status', $filter->status);
                }

                if ($filter->transport != -1) {
                    $q->where('status', $filter->transport);
                }
            }
            })->orderBy($request->get('sort_field') ?? 'id', $request->get('sort_type') ?? 'desc')
            ->paginate($request->get('limit') ?? 50);

        return response($entities);

    }
}
