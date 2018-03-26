import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 
// import { SweetAlertService } from 'angular-sweetalert-service';
import {HttpClientModule} from '@angular/common/http';

import { TruncateModule } from 'ng2-truncate';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { RemainingPlayersComponent } from './remaining-players/remaining-players.component';
import { TeamsComponent } from './teams/teams.component';

import { TeamManagementComponent } from './TeamManagement/TeamManagement.component';
import { PlayerManagementComponent } from './PlayerManagement/PlayerManagement.component';

import { DataService } from './services/data.service';
import { CommunicationServiceService } from './services/communication-service.service';


import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuctionSettingComponent } from './auction-setting/auction-setting.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RemainingPlayersComponent,
    TeamsComponent,
    TeamManagementComponent,
    PlayerManagementComponent,
    AuthenticationComponent,
    AuctionSettingComponent,
    TransactionsComponent,
    HomeComponent,
    HeaderComponent,
    AdminLoginComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    TruncateModule,
    NgxPaginationModule,
    HttpClientModule,
    [SweetAlert2Module.forRoot()],
  ],
  providers: [CommunicationServiceService, DataService],//SweetAlertService
  bootstrap: [AppComponent]
})
export class AppModule { }
