<?php

namespace Database\Factories;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

class ExpenseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Expense::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Get a random category from the Category model
        $category = Category::inRandomOrder()->first();
        // Decode the JSON options attribute to an array
        $options = json_decode($category->options, true);
        // Get a random name from the options array
        $option = $this->faker->randomElement($options);

        return [
            'account_id' => function () {
                return \App\Models\Account::factory()->create()->id;
            },
            'amount' => $this->faker->randomFloat(2, 10, 1000),
            'description' => $this->faker->sentence,
            'category' => $option,
        ];
    }
}