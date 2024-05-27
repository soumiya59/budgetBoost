<?php

namespace Database\Factories;

use App\Models\Transfer;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransferFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Transfer::class;

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
            'source_account_id' => function () {
                return \App\Models\Account::factory()->create()->id;
            },
            'destination_account_id' => function () {
                return \App\Models\Account::factory()->create()->id;
            },
            'amount' => $this->faker->randomFloat(2, 10, 1000),
            // 'date' => $this->faker->date(),
            'description' => $this->faker->sentence,
        ];
    }
}