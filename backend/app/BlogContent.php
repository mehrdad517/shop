<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogContent extends Model
{
    protected $table = 'blog_content';

    protected $primaryKey = 'id';

    protected $guarded = [];
}
