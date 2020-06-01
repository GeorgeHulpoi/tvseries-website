<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $table = 'episodes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'name', 'url', 'src', 'index', 'season_id'];

    protected $hidden = ['id', 'season_id'];

    public $timestamps = false;

    public function season()
    {
        return $this->belongsTo('App\Models\Season');
    }

    public function series()
    {
        return $this->season->series;
    }

    public function image()
    {
        return $this->series()->background();
    }
}
