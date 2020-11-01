import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import * as oidcClient from 'oidc-client';
import { User } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class OidcAuthService{

  private authState$ = new BehaviorSubject(false);

  private authService: oidcClient.UserManager;

  private currentUser: any;
	private accessToken: string;
	private authenticated: boolean;
	private idToken: string;

  constructor(private router: Router) {
    this.currentUser = null;
  }

  public loadKeycloak(){

    const oidcConfig: oidcClient.UserManagerSettings = {
      authority: 'http://localhost:8180/auth/realms/demo',
      client_id: 'demo2',
      redirect_uri: 'http://localhost:4200/implicit-callback',
      post_logout_redirect_uri: 'http://localhost:4200',
      response_type: 'id_token token',
      scope: 'openid profile',
      filterProtocolClaims: true,
      loadUserInfo: true,
    };


    this.authService = new oidcClient.UserManager(oidcConfig);

    this.authService.getUser().then(user => {
      this.currentUser = user;
      console.log("AuthService Contructor: ", this.currentUser);
    })
    .catch(error => console.error("AuthService Contructor error: ", error));

    this._isAuthenticated().then(state => {

      this.authState$.next(state);

      this.authState$.subscribe((authenticated: boolean) => {

        this.authenticated = authenticated;
        this.accessToken = '';
        this.idToken = '';

        if (this.authenticated) {
          this.setAccessToken();
        }
      });
    });
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public getIdToken(): string {
    return this.idToken;
  }

  public getCurrentUser(): any {
    console.log("get Current user() : ", this.currentUser);
    return {
      id: this.currentUser.profile.sub,
      sub: this.currentUser.profile.sub,
      username: this.currentUser.profile.preferred_username,
      name: this.currentUser.profile.name,
      givenName: this.currentUser.profile.given_name,
      middleName: '',
      familyName: this.currentUser.profile.family_name,
      email: this.currentUser.profile.email,
      emailVerified: this.currentUser.profile.email_verified,
      groups: this.currentUser.profile.groups
    };
  }

  private setAccessToken() {
    this.idToken = this.currentUser.id_token;
    this.accessToken = this.currentUser.access_token;
  }

  public createUserWithEmailAndPassword(user): Promise<any> {

    return Promise.reject('OidcAuthService: createUserWithEmailAndPassword()');
  }

  public loginWithEmailAndPassword(username: string, password: string): Promise<any> {

    return Promise.reject('OidcAuthService: loginWithEmailAndPassword()');
  }

  public async loginWithRedirect(): Promise<void> {

    console.log('OidcAuthService: loginWithRedirect()');

    return this.authService.signinRedirect();
  }

  public async handleRedirectCallback(): Promise<void> {

    console.log('OidcAuthService: handleRedirectCallback()');

    this.currentUser = await this.authService.signinRedirectCallback();

    console.log('currentUser: ' + JSON.stringify(this.currentUser, null, 2));

    this.authenticated = await this._isAuthenticated();

    this.authState$.next(this.authenticated);

    this.router.navigate(['/']);
    // this.router.navigate(['/users/profile']);
  }

  public logout(returnUrl: string) {

    console.log('OidcAuthService: logout()');

    this.authState$.next(false);

    this.authService.signoutRedirect();
  }

  //
  // Private methods
  //

  private async _isAuthenticated(): Promise<boolean> {

    return this.currentUser !== null && !this.currentUser.expired;
  }

}