<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class BlogCategory extends Model
{
    use NodeTrait;

    protected $primaryKey = 'value';

    protected $table = 'blog_category';

    protected $fillable=['label'];

    protected $hidden = ['pivot'];


    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }




}
