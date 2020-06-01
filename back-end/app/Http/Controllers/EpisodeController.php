<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Episode;
use App\Http\Resources\Episode as EpisodeResource;

class EpisodeController extends Controller
{
    public function index($episode)
    {
        $model = Episode::where('url', $episode)->first();

        if ($model)
        {
            EpisodeResource::withoutWrapping();
            return new EpisodeResource($model);
        } else return response(null, 404);
    }
}