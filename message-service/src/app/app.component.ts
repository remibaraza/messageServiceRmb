import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {freeApiService} from "./services/freeApiService";
import {MessageModel} from "./models/message.model";
import {ServiceMessage} from "./services/servicemessage";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  posData = {
    test: 'my content'
  }
  interval ?: Observable<string>
  myMessage !: MessageModel;

  constructor(private _freeApiService: freeApiService, private messageService: ServiceMessage, public oidcSecurityService: OidcSecurityService
    , public httpClient: HttpClient,public matDialog: MatDialog) {
  }

  ngOnInit(): void {


    this.myMessage = [new MessageModel()]
    this.oidcSecurityService.checkAuth().subscribe(({isAuthenticated, userData, accessToken, idToken}) => {
      if (!isAuthenticated) {
        this.login();
      }
    });

  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }


}


