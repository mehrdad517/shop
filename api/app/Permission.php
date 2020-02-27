<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class Permission extends Model
{

    protected $table = 'permission';

    protected $primaryKey = 'key';

    protected $fillable = ['key', 'title', 'url', 'method', 'parent'];

    public $incrementing = false;

    protected $hidden = ['pivot'];


    public function role()
    {
        return $this->belongsToMany(Role::class);
    }

}
