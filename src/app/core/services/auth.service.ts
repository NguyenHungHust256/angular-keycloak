import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User, Profile } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private manager = new UserManager(getClientSettings());
  private user: User = null;

  constructor(
    private jwtHelper: JwtHelperService,
    private storageService: StorageService) {
    // this.manager.getUser().then(user => {
    //   this.user = user;
    //   console.log("AuthService Contructor: ", this.user);
    // })
    // .catch(error => console.error("AuthService Contructor error: ", error));
    if (this.isTokenExpired()){
      this.logout().then(
      success => this.startAuthentication()
      ).catch(
        error => console.error(error)
      );
    }
  }

  isLoggedIn(): boolean
  {
      return this.storageService.getAccessToken() != null && !this.jwtHelper.isTokenExpired(this.storageService.getAccessToken());
  }

  isTokenExpired(): boolean {
    return this.storageService.getAccessToken() != null && this.jwtHelper.isTokenExpired(this.storageService.getAccessToken());
  }

  getProfileUser(): any {
    return JSON.parse(this.storageService.getUser());
  }

  getUser(): Promise<User> {
    return this.manager.getUser();
  }

  getAccessToken(): any {
    return this.storageService.getAccessToken();
  }

  // getAuthorizationHeaderValue(): string {
  //   return `${this.user.token_type} ${this.user.access_token}`;
  // }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
        this.user = user;
        this.storageService.saveAccessToken(this.user.access_token);
        this.storageService.saveUser(JSON.stringify(this.user.profile));
        console.log(JSON.stringify(this.user));
    }).catch(error => console.log(error));
  }

  logout() {
    this.storageService.destroyAccessToken();
    this.storageService.destroyUser();
    return this.manager.signoutRedirect();
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'http://localhost:8180/auth/realms/demo',
    client_id: 'demo2',
    redirect_uri: 'http://localhost:4200/implicit-callback',
    post_logout_redirect_uri: 'http://localhost:4200',
    response_type: 'id_token token',
    scope: 'openid profile',
    filterProtocolClaims: true,
    loadUserInfo: true,
  };
}