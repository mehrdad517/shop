<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
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
    }
}
