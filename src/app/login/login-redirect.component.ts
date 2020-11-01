import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { AuthService } from '../core/services';


@Component({
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRedirectComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    console.log('LoginRedirectComponent: ngOnInit()');

    this.authService.startAuthentication();
  }

}