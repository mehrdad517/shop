<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class PackageType extends Model
{

    const IS_BULK = 0;
    const IS_COUNTABLE = 1;


    protected $primaryKey = 'id';

    protected $table = 'package_type';

    protected $guarded = [];

}
