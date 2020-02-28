<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class ProductCategory extends Model
{
    use NodeTrait;

    protected $primaryKey = 'value';

    protected $table = 'product_category';

    protected $guarded = [];


    public function attributes()
    {
        return $this->belongsToMany(GroupAttribute::class, 'group_attribute_category', 'category_id', 'attribute_id');
    }

    public function brands()
    {
        return $this->belongsToMany(Brand::class, 'brand_switch_category', 'category_id', 'brand_id');
    }


    public function priceParameters()
    {
        return $this->belongsToMany(Brand::class, 'price_parameter_switch_category', 'category_id', 'price_parameter_id');
    }


    // content files
    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }


    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_categories', 'category_id', 'product_id');
    }


}
