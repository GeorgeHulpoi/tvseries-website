<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeriesImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('series_images', function (Blueprint $table) 
        {
            $table->engine = 'InnoDB';

            $table->foreignId('series_id');
            $table->foreignId('image_id');
            $table->enum('type', ['thumbnail', 'background']);

            $table->foreign('series_id')->references('id')->on('series');
            $table->foreign('image_id')->references('id')->on('images');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('series_images');
    }
}
