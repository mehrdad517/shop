<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Kalnoy\Nestedset\NodeTrait;

class BlogCategory extends Model
{
    use NodeTrait;

    protected $primaryKey = 'value';

    protected $table = 'blog_category';

    protected $fillable=['label'];

    protected $hidden = ['pivot'];

    protected $appends = ['parents'];


    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }


    public function contents()
    {
        return $this->belongsToMany(BlogContent::class, 'blog_categories', 'category_id', 'content_id');
    }



    public function getParentsAttribute()
    {
        return DB::select('call fetch_parent_tree(?, ?, ?)', ["blog_category", "parent.value, parent.slug, parent.label" , $this->value]);
    }




}
