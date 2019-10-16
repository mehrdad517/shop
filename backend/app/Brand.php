<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $table = 'brand';

    public function product()
    {
        return $this->hasMany(Product::class);
    }


}
