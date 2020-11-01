import { Router } from '@angular/router';
import { AuthService } from '../../core';
import { Component, OnInit } from '@angular/core';
import {User, Profile} from 'oidc-client';
@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  currentUser: Profile;

  ngOnInit()  {
    this.currentUser = this.authService.getProfileUser();

    console.log("ngOnInit: ", this.authService.getProfileUser());
  }

  logout(){
    this.authService.logout();
  }
}

