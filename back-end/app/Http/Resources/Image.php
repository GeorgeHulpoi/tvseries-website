<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Image extends JsonResource
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
            'src' => $this->src,
            'alt' => $this->alt,
            'title' => $this->title,
            'width' => $this->width,
            'height' => $this->height,
            'type' => $this->pivot->type
        ];
    }
}
