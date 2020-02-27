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

    public function priceParameters()
    {
        return $this->belongsToMany(ProductPriceParameter::class, 'product_pins_price_parameter', 'product_pins_id', 'price_parameter_value');
    }
}
