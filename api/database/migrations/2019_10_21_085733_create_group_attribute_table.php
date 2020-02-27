<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupAttributeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_attribute', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title', 50);
            $table->string('slug')->nullable()->unique();
            $table->text('content')->nullable();
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->boolean('status')->default(1);
            $table->boolean('has_link')->default(1);

            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_persian_ci';
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
        Schema::dropIfExists('group_attribute');
    }
}
