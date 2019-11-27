<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    protected $table = 'order';

    protected $primaryKey = 'id';

    protected $guarded = [];

    const ORDER_STATUS_PENDING = 0;
    const ORDER_STATUS_ACCEPTED = 1;
    const ORDER_STATUS_REJECTED = 2;
    const ORDER_STATUS_FREE = 3;

    const TRANSPORT_STATUS_DEFAULT = 0;
    const TRANSPORT_STATUS_EXIT_THE_STOREROOM = 1;
    const TRANSPORT_STATUS_IN_QUEUE = 2;
    const TRANSPORT_STATUS_RESEND = 3;

    const DELIVERY_STATUS_DEFAULT=0;
    const DELIVERY_STATUS_ACCEPTED=1;
    const DELIVERY_STATUS_POST_OFFICE =2;
    const DELIVERY_STATUS_RETURN_TO_STOREROOM =3;
    const DELIVERY_STATUS_ADJUSTMENT= 4;

    const ITEMS_STATUS_DEFAULT = 0;
    const ITEMS_STATUS_ACCEPTED  = 1;
    const ITEMS_STATUS_FRACTIVE = 2;

    public static function status($key= null)
    {
        $list = [
            ['key' => self::ORDER_STATUS_PENDING, 'value'  => 'در انتظار'],
            ['key' => self::ORDER_STATUS_ACCEPTED, 'value' => 'تایید شده'],
            ['key' => self::ORDER_STATUS_REJECTED, 'value' => 'لغو شده'],
            ['key' => self::ORDER_STATUS_FREE, 'value' => 'رایگان'],
        ];

        if (is_numeric($key) && $key < 4) {
            foreach ($list as $item) {
                if ($item['key'] == $key) {
                    return $item;
                }
            }
        }

        return $list;

    }

    public static function transport($key= null)
    {

        $list = [
            ['key' => self::TRANSPORT_STATUS_DEFAULT , 'value'=> 'پیش فرض'],
            ['key' => self::TRANSPORT_STATUS_EXIT_THE_STOREROOM , 'value'=> 'خروج از انبار'],
            ['key' => self::TRANSPORT_STATUS_IN_QUEUE , 'value'=> 'در صف ارسال'],
            ['key' => self::TRANSPORT_STATUS_RESEND , 'value'=> 'ارسال مجدد'],
        ];
        if (is_numeric($key) && $key < 4) {
            foreach ($list as $item) {
                if ($item['key'] == $key) {
                    return $item;
                }
            }
        }
        return $list;
    }

    public static function delivery($key= null)
    {
        $list = [
            ['key' => self::DELIVERY_STATUS_DEFAULT, 'value' => 'پیش فرض'],
            ['key' => self::DELIVERY_STATUS_ACCEPTED, 'value' => 'تحویل مشتری'],
            ['key' => self::DELIVERY_STATUS_POST_OFFICE, 'value'  => 'تحویل پست'],
            ['key' => self::DELIVERY_STATUS_RETURN_TO_STOREROOM, 'value'  => 'بازگشت به انبار'],
            ['key' => self::DELIVERY_STATUS_ADJUSTMENT, 'value'  => 'مرجوعی'],
        ];
        if (is_numeric($key) && $key < 5) {
            foreach ($list as $item) {
                if ($item['key'] == $key) {
                    return $item;
                }
            }
        }
        return $list;
    }

    public static function items($key = null)
    {
        $list = [
            ['key' => self::ITEMS_STATUS_DEFAULT, 'value' =>  'پیش فرض'],
            ['key' => self::ITEMS_STATUS_ACCEPTED, 'value'  =>  'فاقد مشکل'],
            ['key' => self::ITEMS_STATUS_FRACTIVE, 'value' =>  'کسری یا معیوبی'],
        ];

        if (is_numeric($key) && $key < 3) {

            foreach ($list as $item) {
                if ($item['key'] == $key) {
                    return $item;
                }
            }
        }

        return $list;

    }


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function productPins()
    {
        return $this->belongsToMany(ProductPins::class, 'order_product_pins', 'order_id', 'product_pins_id')->withPivot('count', 'price', 'discount', 'defactive_count', 'fractional_count');
    }


    public function postInfo()
    {
        return $this->hasOne(OrderPostInfo::class);
    }


    public function payments()
    {
        return $this->morphMany(Payment::class, 'paymentable');
    }


    public function fractiveRequest()
    {
        return $this->hasOne(OrderFractiveRequest::class);
    }



    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachmentable');
    }

    /**
     * @param $order
     * @return array
     *
     * generate order array full
     */
    public static function g($order, $relation = false)
    {
        $list = [
            'id' => '',
            'discount' => '',
            'post_cost' => '',
            'tax' => '',
            'pure_price' => '',
            'total_price' => '',
            'order_status' => [],
            'transport_status' => [],
            'delivery_status' => [],
            'items_status' => [],
            'created_at' => '',
            'payments' => [],
            'user' => '',
            'post_info' => '',
            'product_pins' => [],
            'fractiveRequest'=> '',
            'attachments' => [],
        ];


        $list['id'] =  $order->id;
        $list['discount'] =  number_format($order->discount);
        $list['post_cost'] =  number_format($order->post_cost);
        $list['tax'] =  number_format($order->tax);
        $list['pure_price'] =  number_format($order->pure_price);
        $list['total_price'] =  number_format($order->total_price);
        $list['order_status'] =   Order::status($order->order_status);
        $list['transport_status'] =   Order::transport($order->transport_status);
        $list['delivery_status'] =   Order::delivery($order->delivery_status);
        $list['items_status'] =   Order::items($order->items_status);
        $list['created_at'] =  $order->created_at;

        $list['user']= [
            'id' => $order->user->id,
            'name' => $order->user->name,
            'mobile' => $order->user->mobile,
        ];

        if ($relation) {

            if ($order->postInfo) {
                $list['post_info'] =  [
                    'full_name' => $order->postInfo->full_name,
                    'national_code' => $order->postInfo->national_code,
                    'mobile' => $order->postInfo->mobile,
                    'phone' => $order->postInfo->phone,
                    'region' => [
                        'id' => $order->postInfo->region->id,
                        'title' => $order->postInfo->region->title,
                    ],
                    'postal_code' => $order->postInfo->postal_code,
                    'address' => $order->postInfo->address,
                ];
            }

            if ($order->payments) {
                $sum_payment = 0;
                foreach ($order->payments as $payment) {
                    $sum_payment += $payment->amount;
                    $list['payments'][] = [
                        'id' => $payment->id,
                        'amount' => number_format($payment->amount),
                        'ref_id' => $payment->ref_id,
                        'type' => ['key' => $payment->type, 'value' => Payment::type($payment->type)],
                        'status' => ['key' => $payment->status, 'value' => Payment::status($payment->status)],
                        'created_at' => $payment->created_at,
                        'updated_at' => $payment->updated_at,
                    ];
                }

                $list['sum_payments'] = number_format($sum_payment);
            }

            if ($order->productPins) {
                $sum_total = $sum_count = $sum_price = $sum_discount = 0;
                foreach ($order->productPins as $pins) {
                    $x = explode(',', $pins->group_attribute_product_ids);
                    $attr = DB::table('group_attribute_product')
                        ->leftJoin('group_attribute', 'group_attribute_product.attribute_id', '=', 'group_attribute.id')
                        ->whereIn('group_attribute_product.id', $x)
                        ->get(['title','value']);

                    $list['product_pins'][] = [
                        'product' => [
                            'id' => $pins->product->id,
                            'title' => $pins->product->title
                        ],
                        'attributes' => $attr,
                        'brand' => [
                            'id' => $pins->product->brand->id,
                            'title' => $pins->product->brand->title
                        ],
                        'count' => $pins->pivot->count,
                        'price' => number_format($pins->pivot->price),
                        'discount' => number_format($pins->pivot->discount),
                        'fractional_count' => $pins->pivot->fractional_count,
                        'defactive_count' => $pins->pivot->defactive_count,
                        'total' => number_format($pins->pivot->count * $pins->pivot->price - $pins->pivot->discount)
                    ];

                    $sum_total += ($pins->pivot->count * $pins->pivot->price) - $pins->pivot->discount;
                    $sum_count += $pins->pivot->count;
                    $sum_discount += $pins->pivot->discount;
                    $sum_price += $pins->pivot->price;

                }

                $list['sum_total'] = number_format($sum_total);
                $list['sum_price'] = number_format($sum_price);
                $list['sum_discount'] = number_format($sum_discount);
                $list['sum_count'] = number_format($sum_count);
            }

            if ($order->fractiveRequest) {
                $list['fractiveRequest'] = [
                    'product_pins' => json_decode($order->fractiveRequest->product_pins),
                    'type' => $order->fractiveRequest->type,
                    'status' => $order->fractiveRequest->status
                ];
            }
        }

        return $list;
    }

}
