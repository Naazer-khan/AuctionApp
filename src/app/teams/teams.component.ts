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
  
  teams: Team[]=[];
  div1:boolean;
  div2:boolean;
  p2 : Player;
  @Output() teamsChange = new EventEmitter();
  constructor(private dataService: DataService
    , private commService: CommunicationServiceService
    , private router: Router) {
      
      this.dataService.miniTeamDisplay = false;
     }
     
     ShowButton(){
       
      this.dataService.miniTeamDisplay = false;
      console.log("into fuction show and hide");
      this.router.navigateByUrl('teams');
      //  this.div1 = !true;
      //  this.div2 = true;
     }
    
  ngOnInit() {
    this.updateTheTeams();
  }

  get updateTeam() {
    return this.teams;
  } 

  set updateTeam(val) {
    this.updateTheTeams();  
  }

  updateTheTeams() {

    
    
    this.commService.currentTeamLoaded.subscribe(
      data =>{
        console.log("currentTeamLoaded .. in teams components");
        for(var t in this.dataService.teamList){
          let localTeam = this.dataService.teamList[t];
          localTeam.players = [];
          this.teams.push(localTeam);
        }
        this.commService.setMessageToAllplayersLoaded(2);
        console.log("Updated teams in teams array... sending message.");
      }

    );




   this.commService.allplayersLoaded.subscribe(
      data =>{
        console.log(data + "from teams playerlist -"+ JSON.stringify(this.dataService.playerList));
        if (this.teams.length == 0) {
          console.log("Teams arrays is zero length.");
          return;
        }
          

        for (var p in this.dataService.playerList){
          this.p2 =  this.dataService.playerList[p];
          console.log('Player inifo:'+ JSON.stringify(this.p2));
          if(this.p2.isSold) 
            if( this.p2["tid"] < 4)
              this.teams[ this.p2["tid"]  ].players.push(this.p2 as Player);
        }

        this.teamsChange.emit(this.teams);
        console.log("single Player updated"+JSON.stringify(this.teams[0]));

      }
    );
  }

  printTeams() {
    console.log("teams in Team component45 - " + this.dataService.teamList);
  }
}
