 interface Url 
 {
     name: string;
     href: string;
 }

 interface Image 
 {
    src: string;
    alt: string;
    title: string;
    width: number;
    height: number;
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

/* Genres */

interface GenresItem 
{
    name: string;
    url: string;
    image: Image;
}

declare type Genres = GenresItem[];

interface Genre 
{
    name: string;
    url: string;
    series: Series[];
    last_page: number;
}

/* Genres END */

/* Series */

interface Series 
{
    name: string;
    url: string;
    description: string;
    image: Image;
}

/* Series END */