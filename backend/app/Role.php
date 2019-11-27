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


    public function permissions() {
        return $this->belongsToMany(Permission::class);
    }

    public function user() {
        return $this->hasMany(User::class);
    }
}
