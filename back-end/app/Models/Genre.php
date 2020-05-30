<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $table = 'genres';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'name', 'url'];
    protected $hidden = ['id'];

    public $timestamps = false;

    public function series()
    {
        return $this->belongsToMany('App\Models\Series', 'genres_series');
    }

    public function images()
    {
        return $this->belongsToMany('App\Models\Image', 'genres_images')->withPivot('type');
    }

    public function normalImage()
    {
        return $this->belongsToMany('App\Models\Image', 'genres_images')->where('type', 'Normal')->withPivot('type');
    }
}
