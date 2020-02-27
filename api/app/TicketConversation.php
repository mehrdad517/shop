<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TicketConversation extends Model
{
    protected $table = 'ticket_conversation';

    protected $primaryKey = 'id';

    protected $guarded = [];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }
}
