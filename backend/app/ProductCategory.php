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




}
