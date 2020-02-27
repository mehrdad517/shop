<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductList extends Model
{
    protected $table = 'product_list';

    protected $primaryKey = 'id';

    protected $guarded = [];

    protected $hidden = ['pivot'];


    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_list_items', 'list_id', 'product_id');
    }



}
