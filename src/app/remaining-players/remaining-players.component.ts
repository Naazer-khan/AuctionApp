import { Component, OnInit } from '@angular/core';


import { PlayerDetail } from '../PlayerType';
import { allPlayers } from '../FakeData';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {CommunicationServiceService} from '../communication-service.service';
 
@Component({
  selector: 'app-remaining-players',
  templateUrl: './remaining-players.component.html',
  styleUrls: ['./remaining-players.component.css']
})
export class RemainingPlayersComponent implements OnInit {
  allPlayersArray: PlayerDetail[] = allPlayers;
  unsoldPlayers: PlayerDetail[] = [];
  // TODO : update unsold player list here not in UI/html
  temp: any;
  constructor(public communicationService: CommunicationServiceService) {
    
    // for( var p  in this.allPlayersArray) {
    //   if(!this.allPlayersArray[p].sold) {
    //     this.unsoldPlayers.push(this.allPlayersArray[p]);
    //   }
    //  }
    //  console.log("new init "+this.unsoldPlayers);
   }

  ngOnInit(){
    this.refreshUnsoldPlayers();
    this.communicationService.unsoldPlayerSubject.subscribe(
       data => {
         console.log("remaingin player update "+data);
         this.refreshUnsoldPlayers();
      }
    );
   }
  refreshUnsoldPlayers() {
    console.log("updating unsoldPlayer array");
    this.unsoldPlayers = [];
    for(var i=0; i<this.allPlayersArray.length; i++) {
      if(!(this.allPlayersArray[i].sold)) {
        this.unsoldPlayers.push(this.allPlayersArray[i]);
      }
    }
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
