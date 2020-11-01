import { Injectable } from '@angular/core';


@Injectable()
export class StorageService {

  getAccessToken(): string {
    return window.localStorage['token'];
  }

  saveAccessToken(token: string) {
    window.localStorage['token'] = token;
  }

  destroyAccessToken() {
    window.localStorage.removeItem('token');
  }

  getUser(): string {
    return window.localStorage['user'];
  }

  saveUser(token: string) {
    window.localStorage['user'] = token;
  }

  destroyUser() {
    window.localStorage.removeItem('user');
  }
}
