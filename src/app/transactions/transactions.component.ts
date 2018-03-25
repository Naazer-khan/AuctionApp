import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { BookKeeping } from '../model/bookKeeping';

//declare let ClientIP: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  collection = [];
  constructor(public ds:DataService) {
    //this.ds.updateIP(ClientIP);
  }
  
  ngOnInit() {

  }

  revertTransaction(transaction: BookKeeping) {
    console.log("Request to revert - "+JSON.stringify(transaction));
    // player reset
    // set isSold = false and tid = -1, biddingAmount = 0

    // team playerIds reset
    // team number of players bought - 1


    // recalculate team amounts 

    // currentTeam.remainingAmount += biddingAmount;

    // currentTeam.reservedAmount = (this.ds.auctionSettings.NumberOfPlayersPerTeam
    //    - currentTeam.numberOfPlayersBought-1) * this.ds.auctionSettings.MinimumBidAmount
    //    * this.ds.auctionSettings.PerTeamSafetyBidAmountMultiplier;
       
    // currentTeam.nextBidMaxAmount = currentTeam.remainingAmount - currentTeam.reservedAmount;


  }
}
