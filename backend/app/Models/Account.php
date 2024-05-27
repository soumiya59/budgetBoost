<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'name', 'balance', 'type', 'currency'];


    // Define relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function records()
    {
        return $this->hasMany(Record::class);
    }
    
    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }
    
    public function incomes()
    {
        return $this->hasMany(Income::class);
    }
}