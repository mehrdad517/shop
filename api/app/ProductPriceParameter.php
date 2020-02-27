<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class ProductPriceParameter extends Model
{

    use NodeTrait;

    protected $table = 'price_parameter';

    protected $primaryKey = 'value';

    protected $guarded = [];

    protected $hidden = ['pivot'];


}
