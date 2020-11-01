import { HeaderComponent } from './shared/layout/header.component';
import { OidcAuthService } from './core/services/auth.service.v2';
import { ImplicitCallbackComponent } from './implicit.callback/implicit.callback.component';
import { AuthGuardKeycloak } from './core/services/auth-guard-kc.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import {
  FooterComponent,
  SharedModule
} from './shared';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LoginRedirectComponent } from './login/login-redirect.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginRedirectComponent,
    ImplicitCallbackComponent,
    HeaderComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
  ],
  providers: [OidcAuthService, AuthGuardKeycloak, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {}
