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
            $table->integer('brand_id')->index();
            $table->string('slug')->nullable()->unique();
            $table->string('title');
            $table->string('code', 50)->nullable();
            $table->integer('count')->default(0);
            $table->integer('price');
            $table->integer('discount')->default(0);
            $table->text('content');
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->integer('sales_number')->default(0);
            $table->integer('visitor')->default(0);
            $table->boolean('status')->default(1);

            $table->timestamps();
            $table->softDeletes();
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_persian_ci';
        });
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
