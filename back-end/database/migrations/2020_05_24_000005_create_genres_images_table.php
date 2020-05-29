<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGenresImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('genres_images', function (Blueprint $table) 
        {
            $table->engine = 'InnoDB';

            $table->foreignId('genre_id');
            $table->foreignId('image_id');
            $table->enum('type', ['Normal', 'Thumbnail']);

            $table->foreign('genre_id')->references('id')->on('genres');
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
        Schema::dropIfExists('genres_images');
    }
}
