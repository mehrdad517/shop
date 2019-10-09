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
            DB::table('orders')->insert([
                'user_id' => $faker->numberBetween(1,10),
                'region_id' => $faker->numberBetween(1,500),
                'receiver_name' => $faker->name,
                'receiver_mobile'=> $faker->phoneNumber,
                'receiver_phone' => $faker->phoneNumber,
                'receiver_address' => $faker->address,
                'total' => $faker->numberBetween(40000, 1000000),
                'price' => $faker->numberBetween(40000, 1000000),
                'created_at' => $faker->dateTime,
                'updated_at' => $faker->dateTime
            ]);
        }
    }
}
