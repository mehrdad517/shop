<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('fa_IR');

        DB::table('brand')->insert([
            ['title' => 'مای'],
            ['title' => 'مورال اپ'],
            ['title' => 'mnd'],
            ['title' => 'بیوتی'],
        ]);

        DB::table('group_attribute')->insert([
            ['title' => 'وزن'],
            ['title' => 'حجم'],
            ['title' => 'محفظه نگهداری'],
            ['title' => 'رنگ'],
            ['title' => 'جنس'],
            ['title' => 'موارد تشکیل دهنده'],
            ['title' => 'گارانتی'],
        ]);


        foreach (range(1,100) as $index) {
            $id = DB::table('products')->insertGetId([
                'brand_id' => $faker->numberBetween(1, 4),
                'title' => $faker->realText(100),
                'slug' => $faker->slug,
                'code' => 'DC-' . $faker->numberBetween(1, 100),
                'status' => $faker->numberBetween(0, 1),
                'content' => $faker->realText(),
                'count' => $faker->numberBetween(0, 1000),
                'price' => $faker->numberBetween(40000, 86000),
                'discount' => $faker->numberBetween(10000, 20000),
                'sales_number' => $faker->numberBetween(1, 10000),
                'visitor' => $faker->numberBetween(1, 10000),
                'meta_title' => $faker->realText(),
                'meta_description' => $faker->realText(),
                'created_at' => $faker->dateTime,
                'updated_at' => $faker->dateTime
            ]);

            \App\Product::find($id)->categories()->attach(rand(1, 7));
            \App\Product::find($id)->categories()->attach(rand(8, 15));
            \App\Product::find($id)->attributes()->attach(rand(1, 3));
            \App\Product::find($id)->attributes()->attach(rand(3, 6));

            \Illuminate\Support\Facades\DB::table('product_pins')->insert([
                'product_id' => $id,
                'price' => $faker->numberBetween(40000, 86000),
                'discount' => $faker->numberBetween(5000, 10000),
                'count' => 1000
            ]);
        }


        foreach (range(1,5) as $index) {
            \App\ProductCategory::create([
                'label' => $faker->realText(25)
            ]);
        }

        foreach (range(1,10) as $index) {
            \App\ProductCategory::create([
                'label' => $faker->realText(25)
            ], \App\ProductCategory::find(rand(1, 100)));
        }
    }

}
