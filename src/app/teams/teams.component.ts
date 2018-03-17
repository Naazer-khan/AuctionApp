import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { CommunicationServiceService } from '../services/communication-service.service';

import { Team } from '../model/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  
  teams: any[][];
  
  constructor(private dataService: DataService
    , private commService: CommunicationServiceService) { }

  ngOnInit() {

    this.commService.playersPopulated.subscribe(
      data => {
        let players = this.dataService.playerList;
        for (var p in players) {
          this.teams[p["tid"]].push(p);
        }
        console.log(" all teams and player " + JSON.stringify(this.teams));
      });
    console.log("teams in Team component - " + this.dataService.teamList);

  }

  printTeams() {
    console.log("teams in Team component - " + this.dataService.teamList);
  }
}
