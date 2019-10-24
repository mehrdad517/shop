<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class ProductCategory extends Model
{
    use NodeTrait;

    protected $primaryKey = 'value';

    protected $table = 'product_category';

    protected $fillable=['label'];

    public function attributes()
    {
        return $this->belongsToMany(GroupAttribute::class, 'group_attribute_assign_to_product_category', 'category_id', 'attribute_id');
    }


}
