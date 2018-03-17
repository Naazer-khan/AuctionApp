import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RemainingPlayersComponent,
    TeamsComponent,
    TeamManagementComponent,
    PlayerManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    TruncateModule 
  ],
  providers: [CommunicationServiceService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
