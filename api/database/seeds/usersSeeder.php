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
                'mobile' => $faker->phoneNumber(),
                'role_key' => 'programmer',
                'password'=> bcrypt($faker->password()),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]);
        }
    }
}
