<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'source_account_id' ,'destination_account_id', 'amount', 'description'];

    // Define relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sourceAccount()
    {
        return $this->belongsTo(Account::class, 'source_account_id');
    }

    public function destinationAccount()
    {
        return $this->belongsTo(Account::class, 'destination_account_id');
    }

    // public function fromAccount()
    // {
    //     return $this->belongsTo(Account::class, 'from_account_id');
    // }

    // public function toAccount()
    // {
    //     return $this->belongsTo(Account::class, 'to_account_id');
    // }
}