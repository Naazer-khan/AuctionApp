import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { FormsModule } from '@angular/forms';
import { RemainingPlayersComponent } from './remaining-players/remaining-players.component';
import { TeamsComponent } from './teams/teams.component'; // <-- NgModel lives here

import { CommunicationServiceService} from './communication-service.service';
import { AdminComponent } from './admin/admin.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { ToastrModule } from 'ngx-toastr';
 
import {DataService} from './data.service';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './/app-routing.module';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { TeamListComponent } from './team-list/team-list.component';
 
@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    RemainingPlayersComponent,
    TeamsComponent,
    AdminComponent,
    PlayerDetailComponent,
    PlayerListComponent,
    TeamListComponent
  ],
  imports: [TruncateModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    // ToastrModule.forRoot()
  ],
  providers: [CommunicationServiceService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
