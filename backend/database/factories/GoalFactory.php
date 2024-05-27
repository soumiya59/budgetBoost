<?php

namespace Database\Factories;

use App\Models\Goal;
use Illuminate\Database\Eloquent\Factories\Factory;

class GoalFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Goal::class;

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
            'name' => $this->faker->randomElement(['Car', 'House', 'Vacation', 'Education', 'Business', 'Health', 'Charity', 'Other']),
            'target_amount' => $this->faker->randomFloat(2, 100, 10000),
            'current_amount' => $this->faker->randomFloat(2, 10, 1000),
            'completion_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'description' => $this->faker->sentence,
        ];
    }
}