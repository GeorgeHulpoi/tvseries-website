<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Series;

class SeriesController extends Controller
{
    public function index($series)
    {
        $model = Series::where('url', $series)->with('seasons.episodes')->first();

        if ($model)
        {
            foreach ($model->seasons as $season) 
            {
                $season->episodes->map(function ($ep)
                {
                    $t = $ep;
                    unset($t->src);
                    return $t;
                });
            };

            return response()->json($model);
        } else return response(null, 404);
    }
}