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
        foreach (range(1,100000) as $key=>$index) {
            $id = DB::table('order')->insertGetId([
                'user_id' => $faker->numberBetween(1,1),
                'increment_id' => $key,
                'tax' => 0,
                'discount' => 0,
                'post_cost' => 10000,
                'pure_price' => 340000,
                'total_price' => 350000,
                'order_status' => 1,
                'created_at' => date_sub(date_create(date('Y-m-d')),date_interval_create_from_date_string(rand(0, 30) ." days")),
                'updated_at' => $faker->dateTime
            ]);

            \Illuminate\Support\Facades\DB::table('order_post_info')->insert([
                'order_id' => $id,
                'region_id' => 1,
                'mobile' => $faker->phoneNumber,
                'phone' => $faker->phoneNumber,
                'full_name' => $faker->name,
                'national_code' => $faker->numberBetween(1, 100000000000),
                'postal_code' => $faker->postcode,
                'address' => $faker->address
            ]);

            foreach (range(1, 1) as $item) {
                \Illuminate\Support\Facades\DB::table('order_product_pins')->insert([
                    'order_id' => $id,
                    'product_pins_id' => 1,
                    'count' => 1,
                    'price' => 340000,
                ]);
            }
        }
    }
}
