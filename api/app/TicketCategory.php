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


    protected static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub

        static::created(function ($model) {

            \Artisan::call('cache:clear');
        });

        static::updated(function ($model) {
            \Artisan::call('cache:clear');
        });

        static::deleted(function ($model) {
            \Artisan::call('cache:clear');
        });

    }


}
