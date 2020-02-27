<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Anbar extends Model
{

    protected $primaryKey = 'id';

    protected $table = 'anbar';

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_in_anbar', 'anbar_id', 'order_id');
    }
}
