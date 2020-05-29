<?php

use Illuminate\Database\Seeder;

class GenresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('genres')->insert
        ([
            'id' => 1,
            'name' => 'Dramatic',
            'url' => 'dramatic',
        ]);

        DB::table('images')->insert 
        ([
            'id' => 1,
            'src' => '/assets/genres/breaking-bad-1600x720.jpg',
            'title' => 'Breaking Bad: Walter and Jessey',
            'alt' => 'Breaking Bad: Walter and Jessey',
            'width' => 1600,
            'height' => 720
        ]);

        DB::table('genres_images')->insert
        ([
            'image_id' => 1,
            'genre_id' => 1,
            'type' => 'Normal'
        ]);

        DB::table('genres')->insert
        ([
            'id' => 2,
            'name' => 'Horror',
            'url' => 'horror',
        ]);

        DB::table('images')->insert 
        ([
            'id' => 2,
            'src' => '/assets/genres/the-outsider-1500x1125.jpg',
            'title' => 'The Outsider',
            'alt' => 'The Outsider',
            'width' => 1500,
            'height' => 1125
        ]);

        DB::table('genres_images')->insert
        ([
            'image_id' => 2,
            'genre_id' => 2,
            'type' => 'Normal'
        ]);

        DB::table('genres')->insert
        ([
            'id' => 3,
            'name' => 'Fantasy',
            'url' => 'fantasy',
        ]);

        DB::table('images')->insert 
        ([
            'id' => 3,
            'src' => '/assets/genres/got-1024x576.jpeg',
            'title' => 'Game of Thrones',
            'alt' => 'Game of Thrones',
            'width' => 1024,
            'height' => 576
        ]);

        DB::table('genres_images')->insert
        ([
            'image_id' => 3,
            'genre_id' => 3,
            'type' => 'Normal'
        ]);

        DB::table('genres')->insert
        ([
            'id' => 4,
            'name' => 'Science fiction',
            'url' => 'science-fiction',
        ]);

        DB::table('images')->insert 
        ([
            'id' => 4,
            'src' => '/assets/genres/mandalorian-1170x658.jpg',
            'title' => 'The Mandalorian',
            'alt' => 'The Mandalorian',
            'width' => 1170,
            'height' => 658
        ]);

        DB::table('genres_images')->insert
        ([
            'image_id' => 4,
            'genre_id' => 4,
            'type' => 'Normal'
        ]);

        DB::table('genres')->insert
        ([
            'id' => 5,
            'name' => 'Comedy',
            'url' => 'comedy',
        ]);

        DB::table('images')->insert 
        ([
            'id' => 5,
            'src' => '/assets/genres/sex-education-936x401.jpg',
            'title' => 'Sex Education',
            'alt' => 'Sex Education',
            'width' => 936,
            'height' => 401
        ]);

        DB::table('genres_images')->insert
        ([
            'image_id' => 5,
            'genre_id' => 5,
            'type' => 'Normal'
        ]);

        DB::table('genres')->insert
        ([
            'id' => 6,
            'name' => 'Action',
            'url' => 'action',
        ]);

        DB::table('images')->insert 
        ([
            'id' => 6,
            'src' => '/assets/genres/money-heist-1067x600.jpg',
            'title' => 'Money Heist',
            'alt' => 'Money Heist',
            'width' => 1067,
            'height' => 600
        ]);

        DB::table('genres_images')->insert
        ([
            'image_id' => 6,
            'genre_id' => 6,
            'type' => 'Normal'
        ]);

        DB::table('genres')->insert
        ([
            'id' => 7,
            'name' => 'Cartoon',
            'url' => 'cartoon',
        ]);

        DB::table('images')->insert 
        ([
            'id' => 7,
            'src' => '/assets/genres/rick-and-morty-1024x768.jpg',
            'title' => 'Rick and Morty',
            'alt' => 'Rick and Morty',
            'width' => 1024,
            'height' => 768
        ]);

        DB::table('genres_images')->insert
        ([
            'image_id' => 7,
            'genre_id' => 7,
            'type' => 'Normal'
        ]);
    }
}
