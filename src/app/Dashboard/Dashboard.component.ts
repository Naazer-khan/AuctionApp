import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { RemainingPlayersComponent } from '../remaining-players/remaining-players.component';
import {CommunicationServiceService} from '../services/communication-service.service';
import { DataService } from '../services/data.service';
import { Player } from '../model/player';
import { Team } from '../model/team';
import { Message } from '../model/message';


@Component({
  selector: 'app-players',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
 // RemainingPlayersComponentRef:RemainingPlayersComponent;
  basePrice: number = 200;
  //maxPlayers: number = 12;
  currentPlayer: Player = new Player();
  allPlayers:  Player[];;// PlayerDetail[] = [];//allPlayers;
  index: number = 0;
  playerAvailable: boolean;
  biddingAmount: number = 400;
  //teams = [];
 // @Output() messageEvent = new EventEmitter<string>();
  selectedTeam: { [key: string]: any } = {
    value: null,
    description: null
  };

//  allCandidates: Player[];
  
  msg: Message;

  ngOnInit() {
    
    var x = this.ds.getCandidateRef(); 
    this.communicationService.currentPlayerToBidOn.subscribe(
      data => {
        this.currentPlayer = this.ds.playerList[this.index];
        this.playerAvailable = !this.currentPlayer.isSold;
        console.log("remaingin player update "+data);
        //this.dataService.getUnsoldPlayerFromDB();
     }
   );
   this.communicationService.auctionCompleted.subscribe(
     data => {
      this.setMessageToAuctionComplete();
     }
   )
  }

  constructor(public communicationService: CommunicationServiceService
    , private ds: DataService) {
    this.index=0;
    this.msg = new Message(); 
    this.msg.type = "info";
    this.msg.message = "Auction Started !!!";
    //this.currentPlayer = this.allPlayers[this.index];
    //this.playerAvailable = !this.currentPlayer.sold;
    //this.teams = this.dataService.teamList;// fakeTeams;

    // select the first one
    //if(this.teams) {
      //this.onSelectionChange(this.teams[0]);  
    //}
    
    }
   getNextCandidate() {
     this.index++;
     if(this.index >= this.ds.playerList.length)
          this.index=0;
     console.log("in getNextPlayer " + this.index);
     this.currentPlayer = this.ds.playerList[this.index];
     console.log("current player is " + JSON.stringify(this.currentPlayer));
     this.playerAvailable = !this.currentPlayer.isSold;
   }

  onSelectionChange(entry: Team) {
    // clone the object for immutability
    //this.selectedTeam = Object.assign({}, this.selectedTeam, entry);
    console.log("onSelectionChange - " + entry);
    this.selectedTeam =  Object.assign({}, this.selectedTeam, entry);
    console.log(JSON.stringify(this.selectedTeam) + ", biddingAmount " + this.biddingAmount);
  }

  performTransaction(biddingAmount:number) {
    console.log("current player : " + JSON.stringify(this.currentPlayer));
    console.log("Selling player  "+ this.currentPlayer.pid 
    + " at amount " + biddingAmount 
    + " to team with id " + this.selectedTeam.description);
  
    // update current team amounts
    // reduce reserveAmount
    // increment number player bought

    let currentTeam = this.ds.teamList[this.selectedTeam.tid];
    if(biddingAmount > currentTeam.nextBidMaxAmount )
    {
      this.msg = new Message(); 
      this.msg.type = "warning";
      this.msg.message = "Bid amount exceeds max amount to bid for the given team!";
      console.log("can't buy as not enough money to buy all 12 players");
      return;
    }

    // update the player sold status 
    this.currentPlayer.isSold = true;
    // disable the sell button for this player
    this.playerAvailable = false;
    
    // Get the current teams playersIds
    let playerIdsInDb = this.selectedTeam.playerIds;
    let playerIdsUpdated = "";
    if(playerIdsInDb.length > 0)
      playerIdsUpdated = playerIdsInDb + "," + this.currentPlayer.pid;
    else  
      playerIdsUpdated =  this.currentPlayer.pid + "";
    
    // update the playerIds for current team
    currentTeam.playerIds= playerIdsUpdated;
    console.log("updated team : player ids : " + currentTeam.playerIds);
    
    currentTeam.numberOfPlayersBought++;
    
    // reserve amount to be updated
    currentTeam.remainingAmount -= biddingAmount;

    currentTeam.reservedAmount = (this.ds.auctionSettings.NumberOfPlayersPerTeam
       - currentTeam.numberOfPlayersBought-1) * this.ds.auctionSettings.MinimumBidAmount
       * this.ds.auctionSettings.PerTeamSafetyBidAmountMultiplier;
       
    currentTeam.nextBidMaxAmount = currentTeam.remainingAmount - currentTeam.reservedAmount;
    console.log("current team : " + JSON.stringify(currentTeam));
    
    this.ds.updateTeamAfterSellTransaction(currentTeam);
    this.ds.updatePlayer(this.currentPlayer, true, currentTeam.tid);
    this.communicationService.sendMessageToUpdateUnsoldPlayers();
    
  }

  setMessageToAuctionComplete() {
    this.ds.setAuctionCompleted();
    this.msg = new Message(); 
    this.msg.type = "info";
    this.msg.message = "Auction Completed :)";
  }

  sendMessage() {
 //   this.messageEvent.emit(null);
  }
}
