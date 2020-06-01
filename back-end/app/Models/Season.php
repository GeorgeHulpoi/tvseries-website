<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
    protected $table = 'seasons';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'series_id', 'index'];

    protected $hidden = ['id', 'series_id'];

    public $timestamps = false;

    public function episodes()
    {
        return $this->hasMany('App\Models\Episode');
    }

    public function series()
    {
        return $this->belongsTo('App\Models\Series', 'series_id');
    }
}
