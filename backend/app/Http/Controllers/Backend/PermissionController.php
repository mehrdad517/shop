<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{

    /**
     * @param Request $request
     * @return array
     */
    public function initial(Request $request) {
        $final = [];

        $routeCollection = \Route::getRoutes()->get();

        foreach ($routeCollection as $key => $route) {

            if (preg_match('/backend/', $route->uri)) {

                // get action parameter list
                $action = $route->getAction();

                // explode action and get single controller
                $explodedAction = explode('@', @$action['controller']);

                if (count($explodedAction) == 2) {

                    preg_match('/(.*)Controller/',last(explode("\\", $explodedAction[0])), $matches);

                    // explode controller
                    $controller_name =  $matches[1];

                    $final[$controller_name][] = [
                        'method' => $route->methods[0],
                        'url' => '/'.$route->uri,
                        'key' => str_replace('/', '_', $action['prefix']) . '_' . $explodedAction[1],
                    ];
                }

            }

        }

        foreach ($final as $key=>$value) {

            foreach ($value as $k=>$item) {

                \App\Permission::updateOrCreate([
                    'key' => $item['key'],
                    'url' => $item['url'],
                    'method' => $item['method'],
                    'title' => $item['key'],
                    'parent' => lcfirst($key)
                ], ['key' => $item['key']]);

            }
        }

        return $final;


    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $list = [];
        $parents = Permission::select(['parent'])->groupBy('parent')->orderBy('created_at', 'asc')->pluck('parent');
        foreach ($parents as $parent) {
            $list[] = [
                'controller' => $parent,
                'actions' => Permission::select(['key as id', 'parent', 'method', 'title', 'url'])->where('parent', $parent)->orderBy('created_at', 'asc')->get()
            ];
        }

        return response($list);

    }





}
