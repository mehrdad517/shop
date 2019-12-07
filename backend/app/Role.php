<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Role extends Model
{
    protected $table = 'role';

    protected $primaryKey = 'key';

    public $incrementing = false;

    protected $hidden = ['pivot'];

    protected $fillable=['key', 'title'];


    /**
     * @param $role_key Role
     * @param bool $has_mapping
     * @return array
     */
    public static function getPermissions($role_key, $has_mapping = false)
    {
        $list = [];

        $parents = Permission::select(['parent'])->groupBy('parent')->orderBy('created_at', 'asc')->pluck('parent');
        foreach ($parents as $parent) {

            $join = DB::select('call fetch_permissions_with_access(?, ?)', [$role_key, $parent]);

            if ( $has_mapping ) {
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
            } else {

                foreach ($join as $item) {
                    preg_match('/'.$parent.'_(.*)/', $item->key, $match);
                    $list[$parent][$match[1]] = [
                        'title' => $item->title,
                        'access' => $item->access,
                        'method' => $item->method,
                        'url' => $item->url
                    ];
                }
            }



        }

        return $list;
    }


    public function permissions() {
        return $this->belongsToMany(Permission::class);
    }

    public function user() {
        return $this->hasMany(User::class);
    }
}
