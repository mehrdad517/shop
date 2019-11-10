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
            $table->smallInteger('order_status')->default(0);
            $table->smallInteger('transport_status')->default(0);
            $table->smallInteger('delivery_status')->default(0);
            $table->smallInteger('items_status')->default(0);

            //$table->foreign('user_id')->references('id')->on('users');

            $table->timestamps();
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
        Schema::dropIfExists('order');
    }
}
