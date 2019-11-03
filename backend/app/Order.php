<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $table = 'order';

    protected $primaryKey = 'id';

    public function productPins()
    {
        return $this->belongsToMany(ProductPins::class, 'order_product_pins', 'order_id', 'product_pins_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }



}
