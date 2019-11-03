<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductPins extends Model
{
    protected $table = 'product_pins';

    protected $guarded = [];


    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function order() {

        return $this->belongsToMany(Order::class);

    }
}
