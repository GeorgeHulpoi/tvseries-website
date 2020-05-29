<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Series;
use Faker\Generator as Faker;

$factory->define(Series::class, function (Faker $faker) {
    return [
        'name' => $faker->text(5),
        'url' => $faker->unique()->slug,
        'description' => $faker->sentence(30),
        'genre_id' => rand(1, 7)
    ];
});
