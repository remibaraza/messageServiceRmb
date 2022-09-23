import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AuthInterceptor, AuthModule, LogLevel} from 'angular-auth-oidc-client';


import {AppComponent} from './app.component';
import {ApiModule, Configuration} from "@railmybox/api-dispo";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {freeApiService} from "./services/freeApiService";

import {MessageComponent} from './message/message.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

function apiConfigFactory() {
  return new Configuration({
    basePath: 'https://api.dev.railmybox.io/dispo',
    credentials: {api_key: "ezmijCo2Sq0tnhF2wvWy93uhiczjtIh6EYOGnyjj"}
  });
}

@NgModule({
  declarations: [
    AppComponent,

    MessageComponent,
    HeaderComponent,


  ],
  imports: [
    BrowserModule,
    ApiModule.forRoot(apiConfigFactory
    ),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AuthModule.forRoot({
      config: {
        authority: 'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_tPHyoisdD',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'io9740u32lq0hlgkiim8fi3jv',
        scope: 'profile openid email aws.cognito.signin.user.admin',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
        secureRoutes: [
          'https://api.dev.railmybox.io/dispo'
        ]


      }
    })
  ],
  providers: [freeApiService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]

})
export class AppModule {
}
