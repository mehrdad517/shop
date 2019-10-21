<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GroupAttribute extends Model
{
    protected $table = 'group_attribute';
    protected $fillable = ['title'];
}
