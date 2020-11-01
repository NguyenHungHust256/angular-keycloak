import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'oidc-client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  user: Profile;
  ngOnInit(): void {
    this.user = this.authService.getProfileUser();
  }

}
