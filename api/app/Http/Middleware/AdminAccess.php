<?php

namespace App\Http\Middleware;

use App\Role;
use App\User;
use Closure;
use Illuminate\Support\Facades\Auth;

class AdminAccess
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


        $access = false;

        if (Auth::check()) {


            $role = Auth::user()->role_key;

            if ($role != User::USER_TYPE_GUEST) {

                if (in_array($role, Role::where('full_access', 1)->pluck('key')->toArray()) ) {
                    $access = true;
                } else {
                    if (Role::find($role)->permissions->whereIn('method', strtoupper($request->getMethod()))->where('url', 'like',  $request->getPathInfo())->count() > 0) {
                        $access = true;
                    } else {
                        $access = false;
                    }
                }
            }


        }

        if (! $access) {
            return response()->json(['status' => false, 'msg' => 'NotFoundHttpException'], 403);
        }

        return $next($request);
    }
}
