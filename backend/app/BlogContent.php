<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogContent extends Model
{
    protected $table = 'blog_content';

    protected $primaryKey = 'id';

    protected $guarded = [];


    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }


    public function categories()
    {
        return $this->belongsToMany(BlogCategory::class, 'blog_categories', 'content_id', 'category_id');
    }


}
