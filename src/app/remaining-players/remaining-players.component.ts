import { Component, OnInit } from '@angular/core';


import { PlayerDetail } from '../PlayerType';
//import { allPlayers } from '../FakeData';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {CommunicationServiceService} from '../communication-service.service';
import { Player } from '../model/player';
import { DataService } from '../data.service';
 
@Component({
  selector: 'app-remaining-players',
  templateUrl: './remaining-players.component.html',
  styleUrls: ['./remaining-players.component.css']
})
export class RemainingPlayersComponent implements OnInit {
  //allPlayersArray: Player[] ;//= allPlayers;
  //unsoldPlayers: Player[] = [];
  // TODO : update unsold player list here not in UI/html
  temp: any;
  constructor(public communicationService: CommunicationServiceService
    ,private dataService: DataService) {
    
    // for( var p  in this.allPlayersArray) {
    //   if(!this.allPlayersArray[p].sold) {
    //     this.unsoldPlayers.push(this.allPlayersArray[p]);
    //   }
    //  }
    //  console.log("new init "+this.unsoldPlayers);
   }

  ngOnInit(){
    //this.dataService.getUnsoldPlayerFromDB();
    this.communicationService.unsoldPlayerSubject.subscribe(
       data => {
         console.log("remaingin player update "+data);
         //this.dataService.getUnsoldPlayerFromDB();
      }
    );
   }
  refreshUnsoldPlayers0() {
    console.log("updating unsoldPlayer array");
    //this.unsoldPlayers = [];
    //this.allPlayersArray = this.dataService.getCandidateList();
    // let allPlayers = this.dataService.getPlayersOnceFromDatabase();
    // console.log("getPlayersOnceFromDatabase : "+allPlayers);
    // for(var i=0; i < allPlayers.length; i++) {
    //   if(!(allPlayers[i].isSold)) {
    //     this.unsoldPlayers.push(allPlayers[i]);
    //   }
    // }
  }

  // ngOnInit0() {
  //   console.log("allPlayers "+allPlayers)
  //   Observable.of(allPlayers)
  //   .map(a => {
  //     console.log("inside map "+a);
  //     let fp = a.filter(p => p.sold === false);
  //     this.unsoldPlayers = fp;
  //   });
  //   //.subscribe(player => this.unsoldPlayers.push(player));
  //   console.log("unsolde player "+this.unsoldPlayers);
  // }

}
