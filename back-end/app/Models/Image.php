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
        'id', 'src', 'title', 'alt', 'width', 'height'
    ];
}