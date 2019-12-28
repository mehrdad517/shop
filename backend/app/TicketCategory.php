<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class TicketCategory extends Model
{
    use NodeTrait;

    protected $primaryKey = 'value';

    protected $table = 'ticket_category';

    protected $fillable=['label'];

    protected $hidden = ['pivot'];



}
