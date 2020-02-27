<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderFractiveRequest extends Model
{
    protected $primaryKey = 'order_id';

    protected $table = 'order_fractive_request';

    protected $guarded = [];
}
