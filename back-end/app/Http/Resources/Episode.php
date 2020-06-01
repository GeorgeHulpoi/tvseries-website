<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
            'src' => $this->src,
            'image' => $this->image()->src ?? '',
            'series' => new Series($this->series())
        ];
    }
}

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
            'url' => $this->url
        ];
    }
}