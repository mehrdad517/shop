<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'payment';

    public function paymentable()
    {
        return $this->morphTo();
    }

}
