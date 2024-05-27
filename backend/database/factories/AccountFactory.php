<?php

namespace Database\Factories;

use App\Models\Account;
use Illuminate\Database\Eloquent\Factories\Factory;

class AccountFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Account::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => function () {
                return \App\Models\User::factory()->create()->id;
            },
            'name' => $this->faker->randomElement(['general', 'cash', 'saving', 'creditcard', 'loan', 'bank']),
            'balance' => $this->faker->randomFloat(2, 100, 10000),
            'currency' => $this->faker->randomElement(['mad', 'usd', 'euro']),
        ];
    }
}