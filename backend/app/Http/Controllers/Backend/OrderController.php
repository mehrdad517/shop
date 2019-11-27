<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Order;
use App\OrderFractiveRequest;
use App\OrderProductPins;
use App\Payment;
use App\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\LazyCollection;

class OrderController extends Controller
{

    // show all order
    public function index(Request $request)
    {
        $entities = Order::select('order.id', 'order.user_id' ,'order.order_status', 'order.transport_status','order.delivery_status', 'order.items_status', 'order.total_price', 'created_at')
            ->with(['user'])->where(function ($q) use($request) {

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
            ->paginate($request->get('limit') ?? 10);


        foreach ($entities as $key=>$entity) {
            $entities[$key] = Order::g($entity);
        }

        LazyCollection::make($entities);



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
        }, 'fractiveRequest'])->find($id);

        $result = Order::g($order, true);

        return response($result);
    }


    public function update($id, Request $request)
    {
        try{

            $order = Order::find($id);

            $order->update([
                'transport_status' => $request->get('transport_status'),
                'delivery_status' => $request->get('delivery_status'),
            ]);


            return response()->json(['status' => true, 'message' => 'موفقیت آمیز', 'entity' => Order::g(Order::find($id), true)]);
        } catch (QueryException $exception) {
            return response()->json(['status' => false, 'message' => $exception->getPrevious()->errorInfo[2]], 200);
        }
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     * form for fractive request
     */
    public function fractiveRequest($id, Request $request)
    {
        try {
            $order = Order::find($id);

            if ($order->order_status != 1)  return response()->json(['status' => false, 'message' => 'سفارش تایید شده نیست.']);
            if ($order->delivery_status != 1)  return response()->json(['status' => false, 'message' => 'سفارش تحویل به مشتری نشده است.']);
            if ($order->fractiveRequest && $order->fractiveRequest->status == 1)  return response()->json(['status' => false, 'message' => 'این درخواست تایید شده و قابل تغییر نمیباشد.']);



            foreach ($request->get('product_pins') as $pins) {
                if ($pins['fractional_count'] + $pins['defactive_count'] > $pins['count']) {
                    return response()->json(['status' => false, 'message' => 'تعداد خرابی کالا بیش تر از تعداد سفارش داده شده است.']);
                }
            }

            $r = $order->fractiveRequest()->updateOrCreate(['order_id' => $id],[
                'product_pins' => json_encode($request->get('product_pins')),
                'type' => $request->get('type'),
                'status' => $request->has('status') ? $request->get('status') : 0
            ]);

            if ($r) {
                return response()->json(['status' => true, 'message' => 'موفقیت آمیز']);
            }

        } catch (QueryException $exception) {
            return response()->json(['status' => false, $exception->getPrevious()->errorInfo[2]]);
        }
    }
}
