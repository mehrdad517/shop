<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class OrderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('fa_IR');
        foreach (range(1,100) as $index) {
            $id = DB::table('order')->insertGetId([
                'user_id' => $faker->numberBetween(1,10),
                'tax_id' => $faker->numberBetween(40000, 1000000),
                'tax' => 0,
                'discount' => 0,
                'pure_price' => $faker->numberBetween(40000, 1000000),
                'total_price' => $faker->numberBetween(40000, 1000000),
                'status' => $faker->numberBetween(0,1),
                'created_at' => $faker->dateTime,
                'updated_at' => $faker->dateTime
            ]);

            \Illuminate\Support\Facades\DB::table('order_receiver')->insert([
                'order_id' => $id,
                'region_id' => $id,
                'mobile' => $faker->phoneNumber,
                'phone' => $faker->phoneNumber,
                'full_name' => $faker->name,
                'national_code' => $faker->numberBetween(1, 100000000000),
                'postal_code' => $faker->postcode,
                'address' => $faker->address
            ]);

            foreach (range(1, 3) as $item) {
                \Illuminate\Support\Facades\DB::table('order_product_pins')->insert([
                    'order_id' => $id,
                    'product_pins_id' => rand($id, 100),
                    'count' => rand(1, 5),
                    'price' => $faker->numberBetween(40000, 86000),
                    'detail' => $faker->realText()
                ]);
            }
        }
    }
}
