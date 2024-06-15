<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Account;
use App\Models\Record;
use App\Models\Goal;
use Database\Factories\IncomeFactory;
use Database\Factories\ExpenseFactory;
use Database\Factories\AccountFactory;
use Database\Factories\GoalFactory;;
use Database\Factories\RecordFactory;;
use Database\Factories\TransferFactory;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(3)->create()->each(function ($user) {
            // Seed for each user
            AccountFactory::new()->count(2)->create(['user_id' => $user->id]);
            GoalFactory::new()->count(2)->create(['user_id' => $user->id]);
            TransferFactory::new()->count(2)->create(['user_id' => $user->id]);
        });
        Account::factory(3)->create()->each(function ($account){
            RecordFactory::new()->count(2)->create(['account_id' => $account->id]);
            // IncomeFactory::new()->count(2)->create(['account_id' => $account->id]);
            // ExpenseFactory::new()->count(2)->create(['account_id' => $account->id]);
        });
        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin'),
        ]);    
        Account::factory()->create([
            'user_id' => 25,
            'name' => 'general',
            'balance' => 1000,
            'currency' => 'mad',
        ]);
        Record::factory()->create([
            'user_id' => 25,
            'account_id' => 22,
            'amount' => 1000,
            'currency' => 'mad',
            'type' => 'income',
            'category' => 'income',
            'option' => 'sale',
            'description' => 'admin initial balance',
        ]);
        Goal::factory()->create([
            'user_id' => 25,
            'name' => 'New Car',
            'target_amount' => 1000,
            'current_amount' => 100,
            'last_added_amount' => 10,
            'completion_date' => '2024-10-10',
            'description' => 'first goal',
        ]);
    }
}