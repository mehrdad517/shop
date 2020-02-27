<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('fa_IR');

        foreach (range(1,30) as $index) {
            \App\ProductCategory::create([
                'title' => $faker->jobTitle,

                'children' => [
                    [
                        'title' => $faker->name,

                        'children' => [
                            [ 'title' => $faker->name ],
                        ],
                    ],
                ],
            ]);
        }
    }
}
