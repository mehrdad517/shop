<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{

    protected $primaryKey = 'id';

    protected $table = 'attachment';

    public function attachmentable()
    {
        return $this->morphTo();
    }


}
