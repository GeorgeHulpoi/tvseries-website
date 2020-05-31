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

        // The series
        DB::table('series')->insert
        ([
            'id' => 1,
            'name' => 'Game of Thrones',
            'url' => 'game-of-thrones',
            'description' => $faker->sentence(30),
        ]);

        // Seasons
        DB::table('seasons')->insert
        ([
            'id' => 1,
            'series_id' => 1,
            'index' => 1
        ]);

        DB::table('episodes')->insert
        ([
            'id' => 1,
            'name' => 'Winter Is Coming',
            'url' => 'winter-is-coming',
            'src' => '<iframe src="https://jetload.net/e/HsD8jASc95bt" scrolling="no" frameborder="0" width="700" height="430" allowfullscreen="true" webkitallowfullscreen="true"></iframe>',
            'index' => 1,
            'season_id' => 1
        ]);

        DB::table('episodes')->insert
        ([
            'id' => 2,
            'name' => 'The kingsroad',
            'url' => 'the-kingsroad',
            'src' => '<iframe src="https://jetload.net/e/h8Y8WwsRqXeC" scrolling="no" frameborder="0" width="700" height="430" allowfullscreen="true" webkitallowfullscreen="true"></iframe>',
            'index' => 2,
            'season_id' => 1
        ]);

        
        DB::table('episodes')->insert
        ([
            'id' => 3,
            'name' => 'Lord Snow',
            'url' => 'lord-snow',
            'src' => '<iframe src="https://jetload.net/e/kzPAsAeKwL2N" scrolling="no" frameborder="0" width="700" height="430" allowfullscreen="true" webkitallowfullscreen="true"></iframe>',
            'index' => 3,
            'season_id' => 1
        ]);

        DB::table('seasons')->insert
        ([
            'id' => 2,
            'series_id' => 1,
            'index' => 2
        ]);

        DB::table('episodes')->insert
        ([
            'id' => 4,
            'name' => 'The North Remembers',
            'url' => 'the-north-remembers',
            'src' => '<iframe src="https://jetload.net/e/F9t1JaZUPMgN" scrolling="no" frameborder="0" width="700" height="430" allowfullscreen="true" webkitallowfullscreen="true"></iframe>',
            'index' => 1,
            'season_id' => 2
        ]);

        DB::table('episodes')->insert
        ([
            'id' => 5,
            'name' => 'The Night Lands',
            'url' => 'the-night-lands',
            'src' => '<iframe src="https://jetload.net/e/yxnaHqGJH3kD" scrolling="no" frameborder="0" width="700" height="430" allowfullscreen="true" webkitallowfullscreen="true"></iframe>',
            'index' => 2,
            'season_id' => 2
        ]);

        DB::table('seasons')->insert
        ([
            'id' => 3,
            'series_id' => 1,
            'index' => 3
        ]);

        DB::table('episodes')->insert
        ([
            'id' => 6,
            'name' => 'Valar Dohaeris',
            'url' => 'valar-dohaeris',
            'src' => '<iframe src="https://jetload.net/e/sIx0pQeCfppP" scrolling="no" frameborder="0" width="700" height="430" allowfullscreen="true" webkitallowfullscreen="true"></iframe>',
            'index' => 1,
            'season_id' => 3
        ]);

        DB::table('episodes')->insert
        ([
            'id' => 7,
            'name' => 'Dark Wings, Dark Words',
            'url' => 'dark-wings-dark-words',
            'src' => '<iframe width="600" height="480" src="//mixdrop.co/e/vscnj8ubg2" scrolling="no" frameborder="0" allowfullscreen="true"></iframe>',
            'index' => 2,
            'season_id' => 3
        ]);

        DB::table('episodes')->insert
        ([
            'id' => 8,
            'name' => 'Walk of Punishment',
            'url' => 'walk-of-punishment',
            'src' => '<iframe src="https://jetload.net/e/Su0OEsiVMpOT" scrolling="no" frameborder="0" width="700" height="430" allowfullscreen="true" webkitallowfullscreen="true"></iframe>',
            'index' => 3,
            'season_id' => 3
        ]);

        // Genres
        DB::table('genres_series')->insert
        ([
            'series_id' => 1,
            'genre_id' => 1
        ]);
        
        DB::table('genres_series')->insert
        ([
            'series_id' => 1,
            'genre_id' => 3
        ]);

        // Images
        DB::table('images')->insert 
        ([
            'id' => 8,
            'src' => '/assets/series/got-473x709.jpg',
            'title' => 'Game of Thrones',
            'alt' => 'Game of Thrones',
            'width' => 473,
            'height' => 709
        ]);

        DB::table('series_images')->insert
        ([
            'image_id' => 8,
            'series_id' => 1,
        ]);


        // Series
        DB::table('series')->insert
        ([
            'id' => 2,
            'name' => 'Breaking Bad',
            'url' => 'breaking-bad',
            'description' => $faker->sentence(30),
        ]);

        // Genres
        DB::table('genres_series')->insert
        ([
            'series_id' => 2,
            'genre_id' => 1
        ]);

        DB::table('genres_series')->insert
        ([
            'series_id' => 2,
            'genre_id' => 5
        ]);

        // Images
        DB::table('images')->insert 
        ([
            'id' => 9,
            'src' => '/assets/series/breaking-bad-1439x2004.jpg',
            'title' => 'Breaking Bad',
            'alt' => 'Breaking Bad',
            'width' => 1439,
            'height' => 2004
        ]);

        DB::table('series_images')->insert
        ([
            'image_id' => 9,
            'series_id' => 2,
        ]);
        
        // Series
        DB::table('series')->insert
        ([
            'id' => 3,
            'name' => 'The Mandalorian',
            'url' => 'the-mandalorian',
            'description' => $faker->sentence(30),
        ]);

        // Genres
        DB::table('genres_series')->insert
        ([
            'series_id' => 3,
            'genre_id' => 4
        ]);

        // Images
        DB::table('images')->insert 
        ([
            'id' => 10,
            'src' => '/assets/series/mandalorian-404x658.jpg',
            'title' => 'The Mandalorian',
            'alt' => 'The Mandalorian',
            'width' => 404,
            'height' => 658
        ]);

        DB::table('series_images')->insert
        ([
            'image_id' => 10,
            'series_id' => 3,
        ]);

        // Series
        DB::table('series')->insert
        ([
            'id' => 4,
            'name' => 'The Outsider',
            'url' => 'the-outsider',
            'description' => $faker->sentence(30),
        ]);

        // Genres
        DB::table('genres_series')->insert
        ([
            'series_id' => 4,
            'genre_id' => 1
        ]);

        DB::table('genres_series')->insert
        ([
            'series_id' => 4,
            'genre_id' => 2
        ]);

        // Images
        DB::table('images')->insert 
        ([
            'id' => 11,
            'src' => '/assets/series/the-outsider-1280x1920.jpg',
            'title' => 'The Outsider',
            'alt' => 'The Outsider',
            'width' => 1280,
            'height' => 1920
        ]);

        DB::table('series_images')->insert
        ([
            'image_id' => 11,
            'series_id' => 4,
        ]);

    }
}
