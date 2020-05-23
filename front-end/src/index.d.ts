 interface Url 
 {
     name: string
     href: string;
 }
 
 /* Token */

 interface Token
 {
     token_type: string;
     expires_in: number; 
     access_token: string;
     refresh_token?: string;
 }

 declare type TokenEvent = number;

/* Token END */

/* User */

interface UserLoginResponse extends Token 
{
    name: string;
}

interface UserMeResponse 
{
    id: number;
    name: string;
    email: string;
}

declare type UserEvent = number;

/* User END */