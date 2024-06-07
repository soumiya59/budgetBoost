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
    
    // public function expenses()
    // {
    //     return $this->hasMany(Expense::class);
    // }
    
    // public function incomes()
    // {
    //     return $this->hasMany(Income::class);
    // }

      public function updateBalance($amount, $type)
    {
        if ($type == 'expense') {
            $this->balance -= $amount;
        } else if ($type == 'income') {
            $this->balance += $amount;
        }
        $this->save();
    }

    // Method to revert balance
    public function revertBalance($amount, $type)
    {
        if ($type == 'expense') {
            $this->balance += $amount;
        } else if ($type == 'income') {
            $this->balance -= $amount;
        }
        $this->save();
    }
    public function updateBalanceWithRecordUpdate($oldAmount, $oldType, $newAmount, $newType)
    {
        // Revert the old balance first
        $this->revertBalance($oldAmount, $oldType);
        // Apply the new balance
        $this->updateBalance($newAmount, $newType);
    }
}