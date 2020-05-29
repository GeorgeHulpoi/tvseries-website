<?php

use Illuminate\Database\Seeder;

class RandomSeriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Series::class, 100)->create()->each(function ($series) 
        {
            
        });
    }
}
