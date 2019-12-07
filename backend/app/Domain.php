<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    protected $primaryKey = 'key';

    protected $table = 'domain';

    public $incrementing = false;

    protected $guarded = [];


    public function socialMedias()
    {
        return $this->belongsToMany(SocialMedia::class)->withPivot(['value']);
    }


    public function communicationChannels()
    {
        return $this->belongsToMany(CommunicationChannel::class, 'domain_communication_channel')->withPivot(['value']);
    }
}
