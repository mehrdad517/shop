<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = 'file';

    protected $primaryKey = 'id';

    protected $guarded = [];

    // File Relation
    public function fileable()
    {
        return $this->morphTo();
    }
}
