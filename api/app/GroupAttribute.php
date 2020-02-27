<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GroupAttribute extends Model
{
    protected $table = 'group_attribute';

    protected $guarded = [];

    protected $hidden = ['pivot'];

    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'group_attribute_values', 'attribute_id', 'tag_id');
    }



}
