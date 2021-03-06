<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{

    protected $table = 'product';

    protected $guarded = [];

    protected $hidden = ['pivot'];

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

    public function attributes()
    {
        return $this->belongsToMany(GroupAttribute::class, 'group_attribute_product', 'product_id', 'attribute_id')->withPivot('value', 'order');
    }

    public function categories()
    {
        return $this->belongsToMany(ProductCategory::class, 'product_categories', 'product_id', 'category_id');
    }


    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function packageType()
    {
        return $this->belongsTo(PackageType::class, 'package_type_id');
    }

    public function pins()
    {
        return $this->hasMany(ProductPins::class);
    }



    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }


    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }


    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'product_tags', 'product_id', 'tag_id');
    }

}
