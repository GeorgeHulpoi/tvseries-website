<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeriesType extends Model
{
    protected $table = 'series';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'description', 'type_id'
    ];

    public function type()
    {
        return $this->$this->belongsTo('App\Models\SeriesType');
    }

    public function images()
    {
        return $this->belongsToMany('App\Models\Image', 'series_images')->withPivot('type');
    }
}
