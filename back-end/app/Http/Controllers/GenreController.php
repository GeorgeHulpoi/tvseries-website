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
            $response = [];

            $response['name'] = 'All';
            $response['url'] = 'all';

            $series = Series::with('images')->paginate(16);

            $series->map(function ($item) 
            {
                $temp = $item;
    
                $temp->image = $item->images->first();
                unset($item->images);
    
                return $temp;
            });

            $response['series'] = $series->getCollection();
            $response['last_page'] = $series->lastPage();

            return response()->json($response);
        }
        else 
        {
            $model = Genre::where('url', $type)->first();

            if ($model)
            {
                $response = [];

                $response['name'] = $model->name;
                $response['url'] = $model->url;

                $series = $model->series()->with('images')->paginate(16);

                $series->map(function ($item) 
                {
                    $temp = $item;
        
                    $temp->image = $item->images->first();
                    unset($item->images);
        
                    return $temp;
                });

                $response['series'] = $series->getCollection();
                $response['last_page'] = $series->lastPage();

                return response()->json($response);
                
            } else return response(null, 404);
        }
    }
}