<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
     /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $fillable = ['name', 'email', 'password','isAdmin'];
    
    // Define relationships
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
    public function transfers()
    {
        return $this->hasMany(transfers::class);
    }
    public function accounts()
    {
        return $this->hasMany(Account::class);
    }
    public function budgets()
    {
        return $this->hasMany(Budget::class);
    }
    public function goals()
    {
        return $this->hasMany(Goal::class);
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}