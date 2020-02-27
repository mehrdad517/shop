<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderProductPins extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_product_pins', function (Blueprint $table) {
            $table->integer('order_id');
            $table->integer('product_pins_id');
            $table->integer('count');
            $table->decimal('price');
            $table->text('detail');

            $table->timestamps();
            $table->primary(['order_id', 'product_pins_id']);
            //$table->foreign('order_id')->references('id')->on('order')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('order_product_pins');
    }
}
