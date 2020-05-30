<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Series extends Model
{
    protected $table = 'series';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'name', 'description', 'genre_id'];

    protected $hidden = ['id', 'pivot'];

    public $timestamps = false;

    public function images()
    {
        return $this->belongsToMany('App\Models\Image', 'series_images');
    }
}
