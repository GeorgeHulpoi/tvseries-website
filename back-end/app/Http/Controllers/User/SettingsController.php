<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\User\ChangeNameRequest;
use App\Http\Requests\User\ChangePasswordRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class SettingsController extends Controller
{
    public function changePassword(ChangePasswordRequest $request)
    {
        $user = Auth::user();

        if (Hash::check($request->input('password'), $user->password))
        {
            $user->password = Hash::make($request->get('new_password'));
            $user->save();

            return response(null, 200);
        }
        else 
        {
            $token = $user->token();
            $token->revoke();
            return response('The password is incorrect.', 401);
        }
    }

    public function changeName(ChangeNameRequest $request)
    {
        $user = Auth::user();

        $user->name = $request->input('name');
        $user->save();

        return response(null, 200);
    }
}