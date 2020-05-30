<?php

use Illuminate\Database\Seeder;
use App\Models\Image;

class RandomSeriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Series::class, 300)->create()->each(function ($series) 
        {
            DB::table('genres_series')->insert
            ([
                'series_id' => $series->id,
                'genre_id' => rand(1, 7)
            ]);

            $data = Image::create
            ([
                'src' => 'https://picsum.photos/700/980',
                'title' => $series->name,
                'alt' => $series->name,
                'width' => 700,
                'height' => 980
            ]);

            DB::table('series_images')->insert
            ([
                'series_id' => $series->id,
                'image_id' => $data->id
            ]);
        });
    }
}
