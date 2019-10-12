<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class usersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('fa_IR');
        foreach (range(1,50) as $index) {
            \Illuminate\Support\Facades\DB::table('users')->insert([
                'name' => $faker->name(),
                'email' => $faker->email(),
                'mobile' => $faker->phoneNumber(),
                'password'=> $faker->password(),
                'created_at' => $faker->dateTime,
                'updated_at' => $faker->dateTime
            ]);
        }
    }
}
