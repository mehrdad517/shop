<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderPostInfo extends Model
{
    protected $table = 'order_post_info';

    protected $primaryKey = 'order_id';
}
