<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'type' => 'food',
                'options' => ['groceries', 'bar, cafe', 'restaurant', 'fast food'],
            ],
            [
                'type' => 'shopping',
                'options' => ['clothes & footwear', 'drug-store, chemist', 'electronics, accessories', 'gifts', 'health & beauty', 'home, garden', 'jewellery', 'kids', 'pets', 'stationery, tools'],
            ],
            [
                'type' => 'housing',
                'options' => ['energy, utilities', 'rent', 'water', 'internet', 'phone', 'insurance', 'mortgage', 'repairs', 'furniture', 'decoration', 'cleaning', 'tools', 'garden', 'security'],
            ],
            [
                'type' => 'transportation',
                'options' => ['Business trip','Car','Public transport','Taxi','Train','bus','plane'],
            ],
            [
                'type' => 'vehicle',
                'options' => ['fuel', 'insurance', 'maintenance', 'parking', 'rental', 'car wash', 'spare parts', 'accessories'],
            ],
            [
                'type' => 'life & entertainment',
                'options' => ['fitness', 'alcohol','tabacco','books','charity, gifts','education','health care' ,'hobbies', 'books', 'music', 'games', 'movies', 'concerts', 'theatre', 'museum', 'exhibitions', 'events', 'party', 'vacation','hotel', 'spa', 'beauty', 'catering',  'lottery, gambling','wellness, beauty'],
            ],
            [
                'type' => 'communication, PC',
                'options' => ['internet', 'phone', 'software', 'postal services'],
            ],
            [
                'type' => 'financial expenses',
                'options' => ['advisory', 'charges, fees', 'child support', 'fines', 'insurance', 'loans, interests', 'taxes'],
            ],
            [
                'type' => 'investments',
                'options' => ['brokerage', 'crypto', 'funds', 'gold', 'real estate', 'shares', 'startups'],
            ],
            [
                'type' => 'income',
                'options' => ['salary', 'bonus', 'dividends', 'interests', 'rental', 'sale', 'gift', 'others'],
            ],
            [
                'type' => 'others',
                'options' => ['others', 'missing'],
            ],
            
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'type' => $category['type'],
                'options' => json_encode($category['options']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}