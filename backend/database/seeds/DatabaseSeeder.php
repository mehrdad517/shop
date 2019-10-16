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
        $this->call(RoleSeeder::class);
        $this->call(usersSeeder::class);
        $this->call(BrandSeeder::class);
        $this->call(ProductTableSeeder::class);
//        $this->call(PermissionSeeder::class);
//        $this->call(SettingSeeder::class);
//        $this->call(SliderSeeder::class);
//        $this->call(ProductCategorySeeder::class);
//        $this->call(OrderTableSeeder::class);
    }
}
