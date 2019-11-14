<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class MessageModel extends Model
{
    protected $table = 'messages';
    protected $fillable = ['name', 'message', 'image'];
}
