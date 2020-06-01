<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Series;
use App\Http\Resources\Series as SeriesResource;

class SeriesController extends Controller
{
    public function index($series)
    {
        $model = Series::where('url', $series)->first();

        if ($model)
        {
            SeriesResource::withoutWrapping();
            return new SeriesResource($model);
        } else return response(null, 404);
    }
}