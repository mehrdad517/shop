<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('fa_IR');
        DB::table('role')->insert([
            ['key' => 'programmer', 'title' => 'برنامه نویس'],
            ['key' => 'super_admin', 'title' => 'سوپر ادمین'],
            ['key' => 'admin', 'title' => 'ادمین'],
            ['key' => 'ticketing', 'title' => 'مدیر تیکت ها'],
            ['key' => 'content_manage' , 'title' => 'مدیر محتوا'],
            ['key' => 'warehouse_keeper', 'title' => 'انباردار'],
            ['key' => 'charging_products', 'title' => 'شارژ محصولات'],
            ['key' => 'sales_agent', 'title' => 'نماینده فروش'],
        ]);
    }
}
