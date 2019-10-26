<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupAttributeAssignToProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_attribute_product', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('product_id')->index();
            $table->integer('attribute_id')->index();
            $table->string('value');
            $table->tinyInteger('order');
            $table->boolean('main');
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
        Schema::dropIfExists('group_attribute_assign_to_product');
    }
}
