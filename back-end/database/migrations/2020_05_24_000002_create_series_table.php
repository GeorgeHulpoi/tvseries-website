<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('series', function (Blueprint $table) 
        {
            $table->engine = 'InnoDB';

            $table->id();
            $table->string('name');
            $table->string('url')->unique();
            $table->mediumText('description');
            $table->foreignId('type_id');

            $table->foreign('type_id')->references('id')->on('series_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('series');
    }
}
