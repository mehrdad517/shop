<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class Menu extends Model
{
    use NodeTrait;

    protected $primaryKey = 'value';

    protected $table = 'menu';

    protected $fillable=['label'];

    protected $hidden = ['pivot'];



}
