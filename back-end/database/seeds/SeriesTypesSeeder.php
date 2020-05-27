<?php

use Illuminate\Database\Seeder;

class SeriesTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('series_types')->insert
        ([
            'id' => 1,
            'name' => 'Dramatic',
            'url' => 'dramatic',
        ]);

        DB::table('series_types')->insert
        ([
            'id' => 2,
            'name' => 'Horror',
            'url' => 'horror',
        ]);

        DB::table('series_types')->insert
        ([
            'id' => 3,
            'name' => 'Fantasy',
            'url' => 'fantasy',
        ]);

        DB::table('series_types')->insert
        ([
            'id' => 4,
            'name' => 'Science fiction',
            'url' => 'science-fiction',
        ]);

        DB::table('series_types')->insert
        ([
            'id' => 5,
            'name' => 'Comedy',
            'url' => 'comedy',
        ]);

        DB::table('series_types')->insert
        ([
            'id' => 6,
            'name' => 'Action',
            'url' => 'action',
        ]);

        DB::table('series_types')->insert
        ([
            'id' => 7,
            'name' => 'Cartoon',
            'url' => 'cartoon',
        ]);
    }
}
