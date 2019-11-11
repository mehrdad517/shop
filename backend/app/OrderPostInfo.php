<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderPostInfo extends Model
{
    protected $table = 'order_post_info';

    protected $primaryKey = 'order_id';

    public function region()
    {
        return $this->belongsTo(Region::class);
    }
}
