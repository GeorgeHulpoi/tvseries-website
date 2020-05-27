<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\SeriesType;

class TypesController extends Controller
{
    public function index($type)
    {
        if (strtolower($type) === 'all')
        {
            return response('all');
        }
        else 
        {
            $model = SeriesType::where('url', $type)->first();

            if ($model)
            {
                return response()->json($model);
                
            } else return response(null, 404);
        }
    }
}