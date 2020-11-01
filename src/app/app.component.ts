import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor () {}

  ngOnInit() {
  //   this.authService.completeAuthentication()
  //   .catch((error) => {
  //     console.error(`could not complete authentication: ${error}`);
  //   })
  //   .then(() => {
  //     if (this.authService.isLoggedIn()) {
  //       console.log("Ok da login: ", this.authService.getAccessToken());
  //     }
  //   }
  // );
}
}

