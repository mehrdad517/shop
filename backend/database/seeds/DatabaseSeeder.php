<?php

use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(usersSeeder::class);
//        $this->call(SettingSeeder::class);
//        $this->call(SliderSeeder::class);
//        $this->call(ProductTableSeeder::class);
//        $this->call(ProductCategorySeeder::class);
//        $this->call(OrderTableSeeder::class);
    }
}
