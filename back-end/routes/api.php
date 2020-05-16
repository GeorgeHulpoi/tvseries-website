<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'user'], function()
{
    Route::get('me', 'User\MeController@index')->middleware('auth:api');
    Route::get('check', 'User\AuthController@check')->middleware('guest');
    Route::post('login', 'User\AuthController@login')->middleware('guest');
    Route::post('register', 'User\AuthController@register')->middleware('guest');
});

Route::group(['prefix' => 'oauth'], function()
{
    Route::post('token', '\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken')->middleware('guest');
});