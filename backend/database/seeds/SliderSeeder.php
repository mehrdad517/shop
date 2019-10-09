<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('fa_IR');

        foreach (range(1,10) as $index) {
            DB::table('slider')->insert([
                'shop_id' => $faker->numberBetween(1, 100),
                'pic_link' => $faker->imageUrl(),
                'url' => $faker->url
            ]);
        }
    }
}
