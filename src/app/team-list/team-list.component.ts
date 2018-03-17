import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Team } from '../model/team';
import { Player } from '../model/player';
import { CommunicationServiceService } from '../communication-service.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  teams: any[][];
  constructor(private dataService: DataService
    ,private commService: CommunicationServiceService) { }

  ngOnInit() {

    this.commService.playersPopulated.subscribe(
      data => {

        let players = this.dataService.playerList;
        for( var p in players) {
          this.teams[ p["tid"] ].push(p);
        }
        console.log(" all teams and player2 " + JSON.stringify(this.teams));
      });
    
    console.log(" all teams and player3 " + JSON.stringify(this.teams));
  }    
}
