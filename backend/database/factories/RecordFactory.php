<?php

namespace Database\Factories;

use App\Models\Record;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

class RecordFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Record::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $category = Category::inRandomOrder()->first();
        $options = json_decode($category->options, true);
        $option = $this->faker->randomElement($options);
        
        return [
            'user_id' => function () {
                return \App\Models\User::factory()->create()->id;
            },
            'account_id' => function () {
                return \App\Models\Account::factory()->create()->id;
            },
            'amount' => $this->faker->randomFloat(2, -1000, 1000),
            'type' => $this->faker->randomElement(['expense', 'income']),
            'category' => $category->type,
            'option' => $option,
            'description' => $this->faker->sentence,
        ];
    }
}