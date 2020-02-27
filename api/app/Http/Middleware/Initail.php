<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Initail
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $databases = [
            'http://localhost:3000' =>  [
                'DB_CONNECTION' => 'mysql',
                'DB_HOST' => '127.0.0.1',
                'DB_PORT' => '3306',
                'DB_DATABASE' => '517_shop',
                'DB_USERNAME' => 'root',
                'DB_PASSWORD' => ''
            ],
        ];


        config([
            'app.host' => $databases[$request->header('origin')]['DB_HOST'],
            'app.port' => $databases[$request->header('origin')]['DB_PORT'],
            'app.database' => $databases[$request->header('origin')]['DB_DATABASE'],
            'app.username' => $databases[$request->header('origin')]['DB_USERNAME'],
            'app.password' => $databases[$request->header('origin')]['DB_PASSWORD'],
        ]);



        return $next($request);
    }
}
