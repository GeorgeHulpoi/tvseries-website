<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Genre;
use App\Models\Series;
use App\Http\Resources\Image;

class GenreController extends Controller
{
    public function list()
    {
        $genres = Genre::with('normalImage:src,alt,title,width,height')->inRandomOrder()->get();

        $genres->map(function ($genre) 
        {
            $item = $genre;
            unset($item->id);

            $item->image = $genre->normalImage->first();
            unset($item->normalImage);

            return $item;
        });

        return response($genres);
    }

    public function index($type)
    {
        if (strtolower($type) === 'all')
        {
            return response('all');
        }
        else 
        {
            $model = Genre::where('url', $type)->first();

            if ($model)
            {
                $response = [];

                $response['id'] = $model->id;
                $response['name'] = $model->name;
                $response['url'] = $model->url;

                $series = $model->series()->paginate(10);

                $response['series'] = $series->getCollection();
                $response['last_page'] = $series->lastPage();

                return response()->json($response);
                
            } else return response(null, 404);
        }
    }
}