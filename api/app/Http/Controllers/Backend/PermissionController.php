<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PermissionController extends Controller
{

    /**
     * @param Request $request
     * @return array
     */
    public function initial(Request $request)
    {

        $final = [];

        $routeCollection = \Route::getRoutes()->get();
        // Get all Routes
        foreach ($routeCollection as $key => $route) {

            if (preg_match('/backend/', $route->uri)) {

                /**
                 * contain prefix, namespace, controller
                 */
                $action = $route->getAction();

                // For Routes That Define In Controller
                if (@$action['controller']) {
                    // explode action and get single controller
                    $explodedAction = explode('@', @$action['controller']); // expload controller, App\Http\Controllers\Backend\AnbarController@index

                    // check controller is valid
                    if (count($explodedAction) == 2) {

                        // expload expload action  and get last part , AnbarController => 0, Anbar => 1
                        preg_match('/(.*)Controller/', last(explode("\\", $explodedAction[0])), $matches);

                        preg_match_all('/(?:^|[A-Z])[a-z]+/',$matches[1],$controller_name); // create array that contain 0 index and more tha one key, ProductCategory product category or Product Category

                        preg_match_all('/(?:^|[A-Z])[a-z]+/',$explodedAction[1],$action_name); // create array that contain 0 index and more tha one key, getAttribute get Attribute or Get Attribute

                        // join array Product Category Or get Attribute
                        $final[mb_strtolower(join('_', $controller_name[0]))][] = [
                            'key' => mb_strtolower(join('_', $controller_name[0])) . '_' . mb_strtolower(join('_', $action_name[0])),
                            'action' => trans('permissions.' . mb_strtolower(join(' ', $action_name[0]))),
                            'method' => $route->methods[0],
                            'url' => '/'.$route->uri,
                        ];
                    }
                } else {

                    preg_match('/api\/backend\/(.*)/', $route->uri, $key_name);

                    preg_match_all('/(?:^|[A-Z])[a-z]+/', $key_name[1],$parent); // create array that contain 0 index and more tha one key, ProductCategory product category or Product Category

                    if (count($parent[0]) > 1) {
                        $key_name[1] = join('/', $parent[0]);
                    }

                    $final[mb_strtolower(join('_', $parent[0]))][] = [
                        'key' => mb_strtolower(str_replace('/', '_', $key_name[1])  . '_' .  $route->methods[0]),
                        'action' => trans('permissions.' . mb_strtolower(str_replace('/', ' ', $key_name[1])) . ' ' . mb_strtolower($route->methods[0])),
                        'method' => $route->methods[0],
                        'url' => '/'.$route->uri,
                    ];

                }
            }
        }

        foreach ($final as $key=>$value) {
            foreach ($value as $k=>$item) {
                \App\Permission::updateOrCreate(['key' => $item['key']],[
                    'key' => $item['key'],
                    'url' => $item['url'],
                    'method' => $item['method'],
                    'title' => $item['action'],
                    'parent' => $key
                ]);

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
            $actions = [];
            $join = DB::select('call fetch_permissions_with_access(?, ?)', [null, $parent]);
            foreach ($join as $item) {
                $actions[] = [
                    'id' => $item->key,
                    'parent' => $parent,
                    'title' => $item->title,
                    'access' => $item->access,
                    'method' => $item->method,
                    'url' => $item->url
                ];
            }

            $list[] = [
                'controller' => [
                    'key' => trans('permissions.' . str_replace('_', ' ', $parent)),
                    'value' => $parent
                ],
                'actions' => $actions
            ];

        }

        return response($list);

    }






}
