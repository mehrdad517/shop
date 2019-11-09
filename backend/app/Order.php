<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'order';

    protected $primaryKey = 'id';

    const ORDER_STATUS_PENDING = 0;
    const ORDER_STATUS_ACCEPTED = 1;
    const ORDER_STATUS_REJECTED = 2;
    const ORDER_STATUS_RETURNED = 3;
    const ORDER_STATUS_ADJUSTMENT= 4;

    const TRANSPORT_STATUS_DEFAULT = 0;
    const TRANSPORT_STATUS_EXIT_THE_STOREROOM = 1;
    const TRANSPORT_STATUS_IN_QUEUE = 2;
    const TRANSPORT_STATUS_RESEND = 3;

    const DELIVERY_STATUS_DEFAULT=0;
    const DELIVERY_STATUS_ACCEPTED=1;
    const DELIVERY_STATUS_POST_OFFICE =2;
    const DELIVERY_STATUS_RETURN_TO_STOREROOM =3;

    const ITEMS_STATUS_DEFAULT = 0;
    const ITEMS_STATUS_FRACTIONAL = 1;
    const ITEMS_STATUS_DEFECTIVE =2;

    public function status($key= null)
    {
        $list = [
            self::ORDER_STATUS_PENDING  => 'در انتظار',
            self::ORDER_STATUS_ACCEPTED => 'تایید شده',
            self::ORDER_STATUS_REJECTED => 'لغو شده',
            self::ORDER_STATUS_RETURNED => 'مرجوعی',
        ];
        if ($key) {
            if (isset($list[$key])) {
                return $list[$key];
            } else {
                return 'نامشخص';
            }
        } else {
            return $list;
        }
    }

    public function transport($key= null)
    {
        $list = [
            self::TRANSPORT_STATUS_DEFAULT => 'پیش فرض',
            self::TRANSPORT_STATUS_EXIT_THE_STOREROOM => 'خروج از انبار',
            self::TRANSPORT_STATUS_IN_QUEUE => 'در صف ارسال',
            self::TRANSPORT_STATUS_RESEND => 'در صف ارسال مجدد',
        ];
        if ($key) {
            if (isset($list[$key])) {
                return $list[$key];
            } else {
                return 'نامشخص';
            }
        } else {
            return $list;
        }
    }

    public function delivery($key= null)
    {
        $list = [
            self::DELIVERY_STATUS_DEFAULT => 'پیش فرض',
            self::DELIVERY_STATUS_ACCEPTED => 'تحویل مشتری',
            self::DELIVERY_STATUS_POST_OFFICE  => 'تحویل پست',
            self::DELIVERY_STATUS_RETURN_TO_STOREROOM  => 'بازگشت به انبار',
        ];
        if ($key) {
            if (isset($list[$key])) {
                return $list[$key];
            } else {
                return 'نامشخص';
            }
        } else {
            return $list;
        }
    }

    public function items($key = null)
    {
        $list = [
            self::ITEMS_STATUS_DEFAULT =>  'پیش فرض',
            self::ITEMS_STATUS_FRACTIONAL =>  'کسری کالا',
            self::ITEMS_STATUS_DEFECTIVE => 'معیوبی کالا',
        ];
        if ($key) {
            if (isset($list[$key])) {
                return $list[$key];
            } else {
                return 'نامشخص';
            }
        } else {
            return $list;
        }
    }


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function productPins()
    {
        return $this->belongsToMany(ProductPins::class, 'order_product_pins', 'order_id', 'product_pins_id')->withPivot('count', 'price');
    }


    public function postInfo()
    {
        return $this->hasOne(OrderPostInfo::class);
    }


    public function payments()
    {
        return $this->morphMany(Payment::class, 'paymentable');
    }



    public function attachments()
    {
        return $this->morphMany(OrderAttachment::class, 'attachmentable');
    }

}
