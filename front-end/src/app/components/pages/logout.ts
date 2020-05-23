import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from '@services/user';

@Component
({
    template: ''
})
export class LogoutComponent implements OnInit
{
    constructor(private router: Router, private User: UserService) {}

    ngOnInit()
    {
        this.User.Logout();
        this.router.navigate(['/']);
    }
}