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

import { AngularFireDatabaseModule } from 'angularfire2/database';
 
import {DataService} from './data.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
 
@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    RemainingPlayersComponent,
    TeamsComponent,
    AdminComponent
  ],
  imports: [TruncateModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment),
    AngularFireDatabaseModule
  ],
  providers: [CommunicationServiceService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
