<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $primaryKey = 'id';

    protected $table = 'payment';

    const PAYMENT_STATUS_PENDING = 0;

    const PAYMENT_STATUS_ACCEPTED = 1;

    const PAYMENT_TYPE_ONLINE= 'online';

    public static function type($key= null)
    {
        $list = [
            self::PAYMENT_TYPE_ONLINE  => 'آنلاین',
        ];

        if (isset($list[$key])) {
            return $list[$key];
        } else {
            return 'نامشخص';
        }

        return $list;

    }

    public static function status($key= null)
    {
        $list = [
            self::PAYMENT_STATUS_PENDING  => 'در انتظار',
            self::PAYMENT_STATUS_ACCEPTED => 'تایید شده',
        ];

        if (isset($list[$key])) {
            return $list[$key];
        } else {
            return 'نامشخص';
        }

        return $list;

    }

    public function paymentable()
    {
        return $this->morphTo();
    }

}
