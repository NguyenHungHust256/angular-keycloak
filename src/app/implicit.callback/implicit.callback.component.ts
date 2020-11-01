import { Router } from '@angular/router';

import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthService } from '../core';


@Component({
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImplicitCallbackComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
  }

  ngOnInit() {
    console.log('ImplicitCallbackComponent: ngOnInit()');
    this.authService.completeAuthentication()
    .catch((error) => {
      console.error(`could not complete authentication: ${error}`);
    })
    .then(() => {
      if (this.authService.isLoggedIn()) {
        console.log("Ok da login: ", this.authService.getAccessToken());
      }

    }
    
  );
    this.router.navigate(['/']);

  }

}