<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = 'images';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'src', 'title', 'alt', 'width', 'height'
    ];

    protected $hidden = ['pivot'];

    public $timestamps = false;
}