<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    use HasFactory;
    protected $fillable = ['account_id', 'amount', 'source','description'];

    // Define relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}