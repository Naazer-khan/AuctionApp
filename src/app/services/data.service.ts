import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Team } from '../model/team';
import { Player } from '../model/player';

import { CommunicationServiceService } from './communication-service.service';

@Injectable()
export class DataService {

  auctionSettings: any;
  teamRef: AngularFireList<any>;
  playerRef: AngularFireList<any>;
  selectedPlayer: Player = new Player();
  selectedTeam: Team = new Team();

  $teamListWithUpdate: any[];
  teamList: Team[];
  playerList: Player[];
  unsoldPlayerList: Player[];

  constructor(private fb: AngularFireDatabase
      ,private commService: CommunicationServiceService) {
    //   this.teamList = this.fb.list('/teams');
    //this.getTeamsFromDatabase();
    var x = this.getTeamRef();
    x.snapshotChanges().subscribe(item => {
      this.teamList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.teamList.push(y as Team);
      });
      Team.counter = item.length;
      console.log("Team counter is set to : " + Team.counter);
    });

    this.auctionSettings = this.getAuctionSettings();

    var x = this.getCandidateRef();
    x.snapshotChanges().subscribe(item => {
      this.playerList = [];
      this.unsoldPlayerList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
         y["$key"] = element.key;
        this.playerList.unshift(y as Player);
        if(y["isSold"] == false) {
          this.unsoldPlayerList.push(y as Player)
        }
      });
      
      console.log("unsold Players now are : " + JSON.stringify(this.unsoldPlayerList));
      Player.counter = item.length;
      console.log("Player counter is set to : " + Player.counter)
      this.commService.sendMessageToUpdateCurrentPlayer();
    });

  }

  /*
  getUnsoldPlayerFromDB() : Player[] {
    var p = this.getCandidateRef();
    p.snapshotChanges().subscribe(item => {
      this.unsoldPlayerList = [];
      item.forEach(element => {
         var y = element.payload.toJSON();
         y["$key"] = element.key;
         if(y["isSold"] == false) {
           this.unsoldPlayerList.push(y as Player)
         }
      });
    });
*/
    /*
  ).once('value').then(

      (snapshot) => {

        this.playerListToGetUnsoldPlayers = [];
        snapshot.forEach(element => {
          var z = element.toJSON();
          z["$key"] = element.key;
          console.log("individual player " + JSON.stringify(z) + " " + element.key);
          this.playerListToGetUnsoldPlayers.push(z as Player);
        });
        //console.log("promise " + JSON.stringify(snapshot));
        //console.log("promise2 " + JSON.stringify(snapshot.val()));
      });/
     return this.unsoldPlayerList;    
  }*/


  // getTeamsFromDatabase00() {

  //   this.fb.database.ref('/teams').once('value').then(

  //     (snapshot) => {

  //       this.teamList = [];
  //       snapshot.forEach(element => {
  //         var z = element.toJSON();
  //         z["$key"] = element.key;
  //         console.log("individual " + JSON.stringify(z) + " " + element.key);
  //         this.teamList.push(z as Team);
  //       });
  //       //console.log("promise " + JSON.stringify(snapshot));
  //       //console.log("promise2 " + JSON.stringify(snapshot.val()));
  //     });

  //   //    return teamList;    
  // }

  getCandidateRef() {
    this.playerRef = this.fb.list('players');
    return this.playerRef;
  }


  // https://firebase.google.com/docs/database/web/read-and-write#read_data_once
  getTeamRef() {
    //return this.getTeamsFromDatabase();

    this.teamRef = this.fb.list('/teams');
    return this.teamRef;
  }

  insertPlayer(player: Player) {
    
    let nextPlayerId = Player.getNextId();
    this.playerRef.push({
      name: player.name,
      pid: nextPlayerId,
      batting: player.batting,
      bowling: player.bowling,
      role: player.role,
      run: player.run,
      wicket: player.wicket,
      isSold: false
    });
  }


  getAuctionSettings(): any {
    var auctionSettings = {};
    this.fb.database.ref('/AuctionSettings').once('value').then(
      (snapshot) => {
        snapshot.forEach(element => {
          var z = element.toJSON();
          auctionSettings[element.key] = z;
          //console.log("individual " + JSON.stringify(z) + " " + element.key);
          //console.log("auctionSettings " + JSON.stringify(auctionSettings));
        });
      });
    return auctionSettings;
  }

  insertTeam(team: Team) {
    console.log("insertTeam " + JSON.stringify(team));

    let initialAmount = this.auctionSettings.InitialAmountPerTeam;
    let maxNumberOfPlayerThatCanBeBought = this.auctionSettings.NumberOfPlayersPerTeam;
    let minimumBidAmount = this.auctionSettings.MinimumBidAmount
      * this.auctionSettings.PerTeamSafetyBidAmountMultiplier;
    let reservedAmount = (maxNumberOfPlayerThatCanBeBought - 1) * minimumBidAmount;
    let nextBidMaxAmount = initialAmount - reservedAmount;
    let remainingAmt = initialAmount;
    let nextTeamId = Team.getNextId();
    this.teamRef.push({
      tid: nextTeamId,
      name: team.name,
      numberOfPlayersBought: 0,
      playerIds: "",
      remainingAmount: remainingAmt,
      nextBidMaxAmount: nextBidMaxAmount,
      reservedAmount: reservedAmount
    });
    this.selectedTeam = new Team();
  }

  
  updateTeamAfterSellTransaction(team: Team) {
    console.log("Updating Team " + JSON.stringify(team));
    this.teamRef.update(team.$key, {
      name: team.name,
      playerIds: team.playerIds,
      numberOfPlayersBought: team.numberOfPlayersBought,
      nextBidMaxAmount: team.nextBidMaxAmount,
      reservedAmount: team.reservedAmount,
      remainingAmount: team.remainingAmount      
    });
  }

  updateTeam(team: Team) {
    console.log("Updating Team " + JSON.stringify(team));
    this.teamRef.update(team.$key, {
      name: team.name
    });
  }


  updatePlayer(player: Player, isSoldParam = false, soldToTeamId = -1) {
    
    console.log("Updating Player " + JSON.stringify(player));
    this.playerRef.update(player.$key,
      {
        name: player.name,
        batting: player.batting,
        bowling: player.bowling,
        role: player.role,
        run: player.run,
        wicket: player.wicket,
        isSold: isSoldParam,
        tid: soldToTeamId
      });
  }

  //   updateTeam(team: Team) {
  //     this.fb.database.ref('/teams/'+team.$key).update({
  //       playerIds : team.playerIds,
  //       reservedAmount: team.reservedAmount
  //     });

  // }

  deletePlayer($key: string) {
    this.playerRef.remove($key);
  }

  deleteTeam($key: string) {
    this.teamRef.remove($key);
  }

  /*
    addTeam(formValue, additionalFields) {
      this.teamList.push({
        tid: formValue.tid,
        name: formValue.teamName,
        numberOfPlayersBought: 0,
        initialAmount: formValue.initialAmount,
        reservedAmount: 10,
        nextBidMaxAmount: 2,
        remainingAmount: 8,
        playerIds: updatedPlayerIds;
      });
    }*/



}
