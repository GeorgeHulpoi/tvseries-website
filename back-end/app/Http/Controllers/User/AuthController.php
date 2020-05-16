<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\RegisterRequest;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\CheckRequest;
use App\Models\User;
use Laravel\Passport\Client;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function check(CheckRequest $request)
    {
        $email = $request->input('email');

        $exists = User::where('email', '=', $email)->exists();

        return response()->json($exists);
    }

    public function login(LoginRequest $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $client = Client::where
        ([
            'password_client' => true,
            'revoked'         => false
        ])->first();

        $tokenRequest = Request::create('/api/oauth/token', 'post', 
        [
            'grant_type'    => 'password',
            'client_id'     => $client->id,
            'client_secret' => $client->secret,
            'username'      => $email,
            'password'      => $password,
        ]);

        $response = app()->handle($tokenRequest);

        if ($response->status() == 200)
        {
            $user = User::where('email', $email)->first();

            $content = json_decode($response->content());
            $content->name = $user->name;

            $response->setContent(json_encode($content));
        }

        return $response;
    }

    public function register(RegisterRequest $request) 
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::create
        ([
            'name'      => $name,
            'email'     => $email,
            'password'  => bcrypt($password),
        ]);

        $client = Client::where
        ([
            'password_client' => true,
            'revoked'         => false
        ])->first();

        $tokenRequest = Request::create('/api/oauth/token', 'post', 
        [
            'grant_type'    => 'password',
            'client_id'     => $client->id,
            'client_secret' => $client->secret,
            'username'      => $email,
            'password'      => $password,
        ]);

        $response = app()->handle($tokenRequest);
    
        return $response;
    }
}