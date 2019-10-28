<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('fa_IR');

        foreach (range(1,20) as $index) {
            DB::table('brand')->insert([
                'title' => $faker->realText(25),
            ]);
        }

        foreach (range(1,5) as $index) {
            DB::table('group_attribute')->insert([
                'title' => $faker->realText(25),
            ]);
        }


        foreach (range(1,5) as $index) {
            \App\ProductCategory::create([
                'label' => $faker->realText(25)
            ]);
        }

        foreach (range(1,100) as $index) {
            \App\ProductCategory::create([
                'label' => $faker->realText(25)
            ], \App\ProductCategory::find(rand(1, 100)));
        }



        foreach (range(1,100) as $index) {
            DB::table('products')->insert([
                'brand_id' => $faker->numberBetween(1, 20),
                'title' => $faker->realText(100),
                'slug' => $faker->slug,
                'code' => 'DC-' . $faker->numberBetween(1, 100),
                'status' => $faker->numberBetween(0, 1),
                'content' => $faker->realText(),
                'count' => $faker->numberBetween(0, 1000),
                'price' => $faker->numberBetween(40000, 86000),
                'meta_title' => $faker->realText(),
                'meta_description' => $faker->realText(),
                'created_at' => $faker->dateTime,
                'updated_at' => $faker->dateTime
            ]);
        }
    }

}
