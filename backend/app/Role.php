<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'role';

    protected $primaryKey = 'key';

    public $incrementing = false;

    protected $hidden = ['pivot'];

    protected $fillable=['key', 'title'];


    public function permission() {
        return $this->belongsToMany(Permission::class);
    }
}
