<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id')->index();
            $table->integer('tax_id');
            $table->decimal('post_cost', 18, 2)->default(0);
            $table->decimal('tax', 18, 2)->default(0);
            $table->decimal('discount', 18, 2)->default(0);
            $table->decimal('pure_price', 18, 2);
            $table->decimal('total_price', 18, 2);
            $table->boolean('status')->default(0);
            $table->tinyInteger('transport')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order');
    }
}
