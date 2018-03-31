import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { RemainingPlayersComponent } from '../remaining-players/remaining-players.component';
import { CommunicationServiceService } from '../services/communication-service.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Player } from '../model/player';
import { Team } from '../model/team';
import { Message } from '../model/message';
import { BookKeeping } from '../model/bookKeeping';

//declare let ClientIP: any;


@Component({
  selector: 'app-players',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  highestBidPlayer: any;
  hide: boolean = true;
  // RemainingPlayersComponentRef:RemainingPlayersComponent;
  basePrice: number = 200;
  //maxPlayers: number = 12;
  currentPlayer: Player = new Player();
  allPlayers: Player[];;// PlayerDetail[] = [];//allPlayers;
  index: number = 0;
  playerAvailable: boolean;
  biddingAmount: number = 400;
  //teams = [];
  // @Output() messageEvent = new EventEmitter<string>();
  selectedTeam: any;
  //  { [key: string]: any } = {
  //   value: null,
  //   description: null
  // };

  //  allCandidates: Player[];

  msg: Message;

  ngOnInit() {
    // var x2;// = this.ds.getCandidateRef(); 
    this.communicationService.currentPlayerToBidOn.subscribe(
      data => {


        this.currentPlayer = this.ds.unsoldPlayerList[this.index];

        //var j = Math.floor(Math.random()  this.ds.unsoldPlayerList[]);
        var randomindex = this.getRandomInt(0, this.ds.unsoldPlayerList.length - 1);
        //this.currentPlayer = randomindex;

        this.currentPlayer = this.ds.unsoldPlayerList[randomindex];



        this.playerAvailable = !this.currentPlayer.isSold;
        console.log("remaingin player update " + data);
        //this.dataService.getUnsoldPlayerFromDB();

        this.biddingAmount = parseInt(this.ds.auctionSettings["MinimumBidAmount"]) * parseInt(this.ds.auctionSettings["PerTeamSafetyBidAmountMultiplier"])
        console.log("calculate bidding amount" + this.biddingAmount)
      }
    );
    this.communicationService.auctionCompleted.subscribe(
      data => {
        this.setMessageToAuctionCompleteLocal();
      });
    this.communicationService.auctionStarted.subscribe(
      data => { this.displayMsg(); });


  }

  getRandomInt(min, max): number {

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  constructor(public communicationService: CommunicationServiceService
    , public ds: DataService, private router: Router) {
    //this.ds.updateIP(ClientIP);

    if (this.ds.currentUser == "none") {

      //this.router.navigate(["/signup-login"]);
    }
    //this.router.navigate(["/teams"]);
    this.index = 0;
    this.displayMsg();


  }
  displayMsg() {
    this.msg = new Message();
    this.msg.type = "info";
    if (this.ds.auctionStatus == "Started") {
      console.log("auction in progress")
      this.msg.message = "Auction is in progress !!!";
    } else {
      this.msg.message = "Auction Not Started By Admin !!!"
    }
  }
  getNextCandidate() {
    console.log("All Players information from data base" + JSON.stringify(this.ds.playerList));
    if (this.ds.unsoldPlayerList.length == 0)
      return;
    this.index = this.getRandomInt(0, this.ds.unsoldPlayerList.length - 1);

    if (this.index >= this.ds.unsoldPlayerList.length) {
      this.index = 0;
    }
    console.log("in getNextPlayer " + this.index);
    if (this.index < this.ds.unsoldPlayerList.length)
      this.currentPlayer = this.ds.unsoldPlayerList[this.index];
    //  else 
    //   return;
    console.log("current player is " + JSON.stringify(this.currentPlayer));
    //  this.playerAvailable = !this.currentPlayer.isSold;

  }

  onSelectionChange(entry: Team) {
    // clone the object for immutability
    //this.selectedTeam = Object.assign({}, this.selectedTeam, entry);
    console.log("onSelectionChange - " + entry);
    this.selectedTeam = Object.assign({}, this.selectedTeam, entry);
    console.log(JSON.stringify(this.selectedTeam) + ", biddingAmount " + this.biddingAmount);
  }


  performTransaction(biddingAmount: number) {

    if (this.selectedTeam == undefined || this.selectedTeam.tid == undefined) {
      this.msg = new Message();
      this.msg.type = "warning";
      this.msg.message = "Please select team";
      return;
    }
    if (this.currentPlayer == undefined || this.currentPlayer.pid == undefined)
      return;
    console.log("current player : " + JSON.stringify(this.currentPlayer));

    console.log("selected team : " + JSON.stringify(this.selectedTeam));
    console.log("Selling player  " + this.currentPlayer.pid
      + " at amount " + biddingAmount
      + " to team " + this.selectedTeam.name);

    // update current team amounts
    // reduce reserveAmount
    // increment number player bought

    if (this.currentPlayer.pid == undefined) {
      this.currentPlayer = this.ds.unsoldPlayerList[0];
      return;
    }
    let currentTeam = this.ds.getTeamObjectFromId(this.selectedTeam.tid);
    if (biddingAmount < this.ds.getMinimumBidAmount()) {
      this.msg = new Message();
      this.msg.type = "warning";
      this.msg.message = "Bid amount less than minimum bid amount [" + this.ds.getMinimumBidAmount() + "]";
      console.log("Bid amount less");
      return;

    }
    if (biddingAmount > currentTeam.nextBidMaxAmount) {
      this.msg = new Message();
      this.msg.type = "warning";
      this.msg.message = "Bid amount exceeds max amount to bid for the given team!";
      console.log("can't buy as not enough money to buy all 12 players");
      return;
    }
    console.log("currentteam " + currentTeam);

    // update the player sold status 
    this.currentPlayer.isSold = true;
    //this.currentPlayer.biddingAmount = biddingAmount;
    // disable the sell button for this player
    this.playerAvailable = false;

    // Get the current teams playersIds
    let playerIdsInDb = this.selectedTeam.playerIds;
    let playerIdsUpdated = "";
    if (playerIdsInDb.length > 0)
      playerIdsUpdated = playerIdsInDb + "," + this.currentPlayer.pid;
    else
      playerIdsUpdated = this.currentPlayer.pid + "";

    // update the playerIds for current team
    currentTeam.playerIds = playerIdsUpdated;
    console.log("updated team : player ids : " + currentTeam.playerIds);

   

    // reserve amount to be updated
    if (currentTeam.remainingAmount == 0 || currentTeam.remainingAmount < biddingAmount) {
      //currentTeam.nextBidMaxAmount = 0;
      this.msg = new Message();
      this.msg.type = "warning";
      this.msg.message = "Sorry you don't have money to buy player!"
      return 0
      
    } else {
      currentTeam.numberOfPlayersBought++;
      currentTeam.remainingAmount -= biddingAmount;
    }
    if (currentTeam.reservedAmount == 0) {
      this.ds.updateTeamAfterSellTransaction(currentTeam);

      this.ds.updatePlayer(this.currentPlayer, true, currentTeam.tid, biddingAmount);
      this.communicationService.sendMessageToUpdateUnsoldPlayers();
      let bookeeping = new BookKeeping();
      bookeeping.playerId = this.currentPlayer.pid;
      bookeeping.playerSoldAt = biddingAmount;
      bookeeping.teamId = currentTeam.tid;
      this.ds.insertbookeeping(bookeeping);
      this.biddingAmount = 400;
      return 0
    }
    else {
      currentTeam.reservedAmount = (this.ds.auctionSettings.NumberOfPlayersPerTeam
        - currentTeam.numberOfPlayersBought - 1) * this.ds.auctionSettings.MinimumBidAmount
        * this.ds.auctionSettings.PerTeamSafetyBidAmountMultiplier;
    }
    
      currentTeam.nextBidMaxAmount = currentTeam.remainingAmount - currentTeam.reservedAmount;
      console.log("nextbidAmount"+currentTeam.nextBidMaxAmount);
    
    console.log("current team : " + JSON.stringify(currentTeam));
    this.msg = new Message();
    this.msg.type = "info";
    this.msg.message =
      this.ds.getPlayerNameFromId(this.currentPlayer.pid)
      + " sold at " + biddingAmount
      + " to " + this.ds.getTeamNameFromId(this.selectedTeam.tid);


    this.ds.updateTeamAfterSellTransaction(currentTeam);

    this.ds.updatePlayer(this.currentPlayer, true, currentTeam.tid, biddingAmount);
    this.communicationService.sendMessageToUpdateUnsoldPlayers();
    let bookeeping = new BookKeeping();
    bookeeping.playerId = this.currentPlayer.pid;
    bookeeping.playerSoldAt = biddingAmount;
    bookeeping.teamId = currentTeam.tid;
    this.ds.insertbookeeping(bookeeping);
    this.biddingAmount = 400;
    if (this.ds.unsoldPlayerList.length > 1) {
      //  this.currentPlayer = this.ds.unsoldPlayerList[0];
      // this.getNextCandidate(); 
    }
    else
      this.hide = false;




    this.selectedTeam = Object.assign({}, this.selectedTeam, {});
    console.log('selected team id' + JSON.stringify(this.selectedTeam));
    this.selectedTeam = undefined;

    // this.ds.playerList.forEach(item =>{
    //   if(item.biddingAmount < biddingAmount ){
    //     this.currentPlayer.biddingAmount = biddingAmount

    //     //this.highestBidPlayer = this.currentPlayer(biddingAmount,currentTeam.tid)
    //   }
    //   console.log('item data'+ item.biddingAmount);
    // })

    if (this.highestBidPlayer == undefined || this.highestBidPlayer.biddingAmount < biddingAmount) {
      this.currentPlayer.biddingAmount = biddingAmount;
      this.currentPlayer.tid = currentTeam.tid;
      this.highestBidPlayer = this.currentPlayer;
      console.log("All Stats data" + JSON.stringify(this.highestBidPlayer.name + "soldAmount" + this.highestBidPlayer.biddingAmount));
    }
    console.log("uppdating bidding Amount" + JSON.stringify(this.currentPlayer));

  }


  setMessageToAuctionCompleteLocal() {
    this.ds.setAuctionCompleted();
    this.msg = new Message();
    this.msg.type = "info";
    //this.msg.type = "warning";
    this.msg.message = "Auction Completed :)";
    this.hide = false;
  }


}
