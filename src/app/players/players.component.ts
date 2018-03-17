import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
//import { PlayerDetail } from '../PlayerType';
//import { allPlayers } from '../FakeData';
import { RemainingPlayersComponent } from '../remaining-players/remaining-players.component';
//import { fakeTeams } from '../FakeData';
import {CommunicationServiceService} from '../communication-service.service';
import { DataService } from '../data.service';
import { Player } from '../model/player';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  
 // RemainingPlayersComponentRef:RemainingPlayersComponent;
  basePrice: number = 200;
  maxPlayers: number = 12;
  currentPlayer: Player = new Player();
  allPlayers:  Player[];;// PlayerDetail[] = [];//allPlayers;
  index: number = 0;
  playerAvailable: boolean;
  biddingAmount: number = 400;
  teams = [];
 // @Output() messageEvent = new EventEmitter<string>();
  selectedTeam: { [key: string]: any } = {
    value: null,
    description: null
  };

  allCandidates: Player[];
  

  ngOnInit() {

    var x = this.dataService.getCandidateList(); 
    var arr = [];
    x.snapshotChanges().subscribe(item => {
      this.allCandidates = [];
      item.forEach(element => {
        //console.log("in subscribe data " + element);
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        console.log("y is " + JSON.stringify(y) );
        this.allCandidates.push(y as Player);
        //arr.push(y as Player);
        //console.log("arr" + arr);
      });
      this.currentPlayer = this.allCandidates[this.index];
      this.playerAvailable = !this.currentPlayer.status;
    });
  }

  constructor(public communicationService: CommunicationServiceService
    , private dataService: DataService) {
    this.index=0;
    //this.currentPlayer = this.allPlayers[this.index];
    //this.playerAvailable = !this.currentPlayer.sold;
    //this.teams = [];// fakeTeams;

    // select the first one
    if(this.teams) {
      //this.onSelectionChange(this.teams[0]);  
    }
    
    }
   getNextCandidate() {
     this.index++;
     if(this.index >= this.allCandidates.length)
          this.index=0;
     console.log("in getNextPlayer " + this.index);
     this.currentPlayer = this.allCandidates[this.index];
     this.playerAvailable = !this.currentPlayer.status;
   }

  onSelectionChange(entry) {
    // clone the object for immutability
    this.selectedTeam = Object.assign({}, this.selectedTeam, entry);
    console.log(this.selectedTeam.id + ", biddingAmount " + this.biddingAmount);
  }
  performTransaction(biddingAmount:number, currentPlayerId: number) {

    console.log("Selling player  "+ currentPlayerId + " at amount " +biddingAmount + " to team with id " + this.selectedTeam.description)
  
    // update current team amounts
    // reduce reserveAmount
    // increment number player bought
    let currentTeam = this.teams[this.selectedTeam.id-1];
    if(biddingAmount > currentTeam.nextBidMaxAmount )
    {
      console.log("can't buy as not enough money to buy all 12 players");
     
      return;
    }
    this.currentPlayer.status = true;
    this.playerAvailable = false;
    

    currentTeam.playerIds.push(currentPlayerId);
    console.log("updated team : player ids : " + currentTeam.playerIds);
    let numberOfPlayerBought  = currentTeam.playerIds.length;
    console.log("numberOfPlayersBought : " + numberOfPlayerBought);

    // reserve amount to be updated

    currentTeam.remainingAmount -= biddingAmount;

    currentTeam.reserveAmount = (this.maxPlayers - numberOfPlayerBought-1) * 2 * this.basePrice;
    console.log("reserveAmount : " +currentTeam.reserveAmount);
    
    currentTeam.nextBidMaxAmount = currentTeam.remainingAmount - currentTeam.reserveAmount;
    let output = JSON.stringify(currentTeam);
    console.log("current team : " + output);
    //this.RemainingPlayersComponentRef.refreshUnsoldPlayers();
    this.communicationService.sendMessageToUpdateUnsoldPlayers();
   
    
  }

  sendMessage() {
 //   this.messageEvent.emit(null);
  }
}
