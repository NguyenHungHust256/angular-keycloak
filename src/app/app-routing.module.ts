import { ProfileComponent } from './profile/profile.component';
import { ImplicitCallbackComponent } from './implicit.callback/implicit.callback.component';
import { AuthGuardKeycloak } from './core/services/auth-guard-kc.service';
import { LoginRedirectComponent } from './login/login-redirect.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginRedirectComponent,
    canActivate: [AuthGuardKeycloak]
  },
  {
    path: 'implicit-callback',
    component: ImplicitCallbackComponent
  }, {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
