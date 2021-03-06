<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductPins extends Model
{
    protected $table = 'product_pins';

    protected $guarded = [];


    protected static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub

        static::created(function ($model) {

            \Artisan::call('cache:clear');
        });

        static::updated(function ($model) {
            \Artisan::call('cache:clear');
        });

        static::deleted(function ($model) {
            \Artisan::call('cache:clear');
        });

    }


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
