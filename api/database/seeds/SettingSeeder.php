<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('fa_IR');
        foreach (range(1,10) as $key=> $value) {
            \App\Setting::create([
                'main_domain' => env('APP_URL'),
                'address' => $faker->address,
                'fax' => $faker->phoneNumber,
                'mobile' => $faker->phoneNumber,
                'phone' => $faker->phoneNumber,
                'title' => $faker->realText(100),
                'description' => $faker->realText(255),
                'hours_of_work' => $faker->realText(50),
                'facebook' => $faker->url,
                'instagram' => $faker->url,
                'google' => $faker->url,
                'telegram' => $faker->url,
                'mail_info' => $faker->email



            ]);
        }
    }

}
