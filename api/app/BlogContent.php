<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogContent extends Model
{
    protected $table = 'blog_content';

    protected $primaryKey = 'id';

    protected $guarded = [];



    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }




    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }


    public function categories()
    {
        return $this->belongsToMany(BlogCategory::class, 'blog_categories', 'content_id', 'category_id');
    }


    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'blog_tags', 'content_id', 'tag_id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'blog_content_products', 'content_id', 'product_id');
    }


}
