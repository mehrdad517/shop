<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('slug')->nullable()->unique();
            $table->text('content');
            $table->integer('count')->default(0);
            $table->integer('price');
            $table->integer('discount')->default(0);
            $table->boolean('is_active')->default(1);
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->integer('sales_number')->default(0);
            $table->integer('visitor')->default(0);

            $table->timestamps();
            $table->softDeletes();
        });

        DB::statement('ALTER TABLE products ADD FULLTEXT title_content (title,content)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
