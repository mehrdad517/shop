<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = 'tag';

    protected $primaryKey = 'id';

    protected $guarded = [];

    public $timestamps= false;

    protected $hidden = ['pivot'];


    public function contents()
    {
        return $this->belongsToMany(BlogContent::class, 'blog_tags', 'tag_id', 'content_id');
    }

}
