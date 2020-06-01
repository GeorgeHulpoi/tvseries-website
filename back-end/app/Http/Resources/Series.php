<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Series extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'url' => $this->url,
            'description' => $this->description,
            'image' => $this->background()->src ?? '',
            'genres' => $this->genres->makeHidden('pivot'),
            'seasons' => Season::collection($this->seasons)
        ];
    }
}

class Season extends JsonResource 
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'index' => $this->index,
            'episodes' => Episode::collection($this->episodes)
        ];
    }  
}

class Episode extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'url' => $this->url,
            'index' => $this->index
        ];
    }
}