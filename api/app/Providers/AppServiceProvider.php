<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {



//        foreach ($request->all() as $value) {
//
//            if (preg_match('/\'|\"|\<|\>|select|union|select|insert|drop|delete|update|cast|create|convert|alter|declare|order|script|md5|benchmark|encode|\;/', strtolower($value))) {
//                die('درخواست شما شامل کاراکترهای غیر مجاز است.');
//            }
//
//        }


    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

//        DB::listen(function($query) {
//            File::append(
//                storage_path('/logs/query.log'),
//                $query->sql . ' [' . implode(', ', $query->bindings) . ']' . PHP_EOL
//            );
//        });
    }
}
