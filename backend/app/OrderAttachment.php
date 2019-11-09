<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderAttachment extends Model
{

    protected $primaryKey = 'id';

    protected $table = 'order_attachment';

    public function attachmentable()
    {
        return $this->morphTo();
    }


}
