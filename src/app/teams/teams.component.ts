import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { DataService } from '../services/data.service';
import { CommunicationServiceService } from '../services/communication-service.service';

import { Router } from '@angular/router';

import { Team } from '../model/team';
import { Player } from '../model/player';
//declare let ClientIP: any;

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  
  teams: any[]=[];
  // div1:boolean;
  // div2:boolean;
  p2 : Player;
  // @Output() teamsChange = new EventEmitter();
  constructor(private dataService: DataService
    , private commService: CommunicationServiceService
    , private router: Router) {
      //this.dataService.updateIP(ClientIP);
    }
     
    
  ngOnInit() {
    this.updateTheTeams();
  }

  updateTheTeams() {    
    
    this.commService.currentTeamLoaded.subscribe(
      data =>{
        console.log("currentTeamLoaded .. in teams components");
        for(var t in this.dataService.teamList){
          let localTeam = this.dataService.teamList[t];
          localTeam.players = [];
          console.log("teams componets " + JSON.stringify(localTeam));
          var obj = {}
          // obj[localTeam.tid] = localTeam as Team;
          this.teams.push(localTeam as Team); // [localTeam.tid] = localTeam as Team;
          // this.teams[ localTeam.tid] = localTeam;
          console.log("asdfasd " + JSON.stringify(this.teams[0]));
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
          if(this.p2.isSold) {
        // write for loop on this.teams
        // check if forLoop variable t.tid == this.p2["tid"]
        // then push , else do nothing
        this.teams.forEach(item =>{
          if(item.tid == this.p2["tid"]){
            console.log("updating teams after sell players"+item.tid);
            item.players.push(this.p2 as Player);
          }


        })           
              
        }
      }

        //this.teamsChange.emit(this.teams);
        console.log("single Player updated"+JSON.stringify(this.teams[0]));

      }
    );
  }

  printTeams() {
    console.log("teams in Team component45 - " + this.dataService.teamList);
  }
  resetTeamData0(i){
    var teamPlayerlist: any;
    var resetTeam  = this.teams[i]; 
    resetTeam.nextBidMaxAmount = 5600;
    resetTeam.remainingAmount = 10000;
    resetTeam.reservedAmount =4400;
    resetTeam.numberOfPlayersBought =0;
    teamPlayerlist = resetTeam.playerIds;
    
    for (var p in teamPlayerlist) {
      this.p2 =  this.dataService.playerList[p];
      console.log('Player inifo:'+ JSON.stringify(this.p2));
      this.p2.isSold   = false;
      this.p2.biddingAmount = 0;

    }
    //console.log("hello welcome to teams components",JSON.stringify(this.teams[i]));
  }
}
