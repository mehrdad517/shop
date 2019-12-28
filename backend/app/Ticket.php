<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property $id
 * @property $created_by
 * @property $status
 * @property $created_at
 * @property $updated_at
 */
class Ticket extends Model
{
    protected $table = 'ticket';

    protected $primaryKey = 'id';

    protected $guarded = [];


    const WAITING_FOR_ANSWER = 0;
    const HAS_BEEN_ANSWERED = 1;

    public static function status($key = null)
    {
        $list = [
            ['key' => self::WAITING_FOR_ANSWER, 'value' =>  'در انتطار پاسخ'],
            ['key' => self::HAS_BEEN_ANSWERED, 'value'  =>  'پاسخ داده شده'],
        ];

        if (is_numeric($key) && $key < 2) {

            foreach ($list as $item) {
                if ($item['key'] == $key) {
                    return $item;
                }
            }
        }

        return $list;

    }

    public function conversations()
    {
        return $this->hasMany(TicketConversation::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function category()
    {
        return $this->belongsTo(TicketCategory::class, 'category_id', 'value');
    }
}
