<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','name', 'target_amount', 'current_amount', 'last_added_amount','completion_date','status','currency'];

    // Define relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}