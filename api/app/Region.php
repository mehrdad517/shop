<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class Region extends Model
{
    use NodeTrait;

    protected $primaryKey = 'value';

    protected $table = 'region';

    protected $fillable=['label'];



}
