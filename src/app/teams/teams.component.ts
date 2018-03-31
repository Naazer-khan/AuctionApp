import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { DataService } from '../services/data.service';
import { CommunicationServiceService } from '../services/communication-service.service';

import { Router } from '@angular/router';

import { Team } from '../model/team';
import { Player } from '../model/player';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: any[] = [];
  p2: Player;
  
  constructor(private dataService: DataService
    , private commService: CommunicationServiceService
    , private router: Router) {
  }

  ngOnInit() {
    this.updateTheTeams();
  }

  updateTheTeams() {

    this.commService.currentTeamLoaded.subscribe(
      data => {
        console.log("currentTeamLoaded .. in teams components");
        for (var t in this.dataService.teamList) {
          let localTeam = this.dataService.teamList[t];
          localTeam.players = [];
          console.log("teams componets " + JSON.stringify(localTeam));
          var obj = {}
          this.teams.push(localTeam as Team);
          console.log("asdfasd " + JSON.stringify(this.teams[0]));
        }
        this.commService.setMessageToAllplayersLoaded(2);
        console.log("Updated teams in teams array... sending message.");
      }

    );

    this.commService.allplayersLoaded.subscribe(
      data => {
        console.log(data + "from teams playerlist -" + JSON.stringify(this.dataService.playerList));
        if (this.teams.length == 0) {
          console.log("Teams arrays is zero length.");
          return;
        }


        for (var p in this.dataService.playerList) {
          this.p2 = this.dataService.playerList[p];
          console.log('Player inifo:' + JSON.stringify(this.p2));
          if (this.p2.isSold) {
            this.teams.forEach(item => {
              if (item.tid == this.p2["tid"]) {
                console.log("updating teams after sell players" + item.tid);
                item.players.push(this.p2 as Player);
              }
            })
          }
        }
        console.log("single Player updated" + JSON.stringify(this.teams[0]));

      }
    );
  }

  printTeams() {
    console.log("teams in Team component45 - " + this.dataService.teamList);
  }

}
