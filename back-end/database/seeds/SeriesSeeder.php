<?php

use Illuminate\Database\Seeder;

class SeriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        DB::table('series')->insert
        ([
            'id' => 1,
            'name' => 'Game of Thrones',
            'url' => 'game-of-thrones',
            'description' => $faker->sentence(30),
            'genre_id' => 3
        ]);

        DB::table('series')->insert
        ([
            'id' => 2,
            'name' => 'Breaking Bad',
            'url' => 'breaking-bad',
            'description' => $faker->sentence(30),
            'genre_id' => 6
        ]);
        
        DB::table('series')->insert
        ([
            'id' => 3,
            'name' => 'The Mandalorian',
            'url' => 'the-mandalorian',
            'description' => $faker->sentence(30),
            'genre_id' => 3
        ]);

        DB::table('series')->insert
        ([
            'id' => 4,
            'name' => 'The Outsider',
            'url' => 'the-outsider',
            'description' => $faker->sentence(30),
            'genre_id' => 2
        ]);
    }
}
