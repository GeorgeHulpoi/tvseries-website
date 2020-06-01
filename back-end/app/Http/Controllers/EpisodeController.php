<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Episode;

class EpisodeController extends Controller
{
    public function index($episode)
    {
        $model = Episode::where('url', $episode)->first();

        if ($model)
        {
            return response()->json($model);
        } else return response(null, 404);
    }
}