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

    public function conversations()
    {
        return $this->hasMany(TicketConversation::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
