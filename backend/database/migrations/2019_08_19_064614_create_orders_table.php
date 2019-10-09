<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id')->index();
            $table->integer('region_id')->index();
            $table->integer('total')->default(0);
            $table->integer('price')->default(0);
            $table->integer('post_cost')->default(0);
            $table->integer('tax_cost')->default(0);
            $table->integer('discount')->default(0);
            $table->string('receiver_name');
            $table->string('receiver_mobile');
            $table->string('receiver_phone');
            $table->text('receiver_address');
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
        Schema::dropIfExists('orders');
    }
}
