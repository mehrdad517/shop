<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderReceiverTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_post_info', function (Blueprint $table) {
            $table->integer('order_id')->primary();
            $table->integer('region_id')->index();
            $table->string('full_name');
            $table->string('national_code');
            $table->string('mobile');
            $table->string('phone')->nullable();
            $table->string('postal_code');
            $table->mediumText('address');

            //$table->foreign('order_id')->references('id')->on('order')->onDelete('cascade')->onUpdate('cascade');
            //$table->foreign('region_id')->references('id')->on('region')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('order_receiver');
    }
}
