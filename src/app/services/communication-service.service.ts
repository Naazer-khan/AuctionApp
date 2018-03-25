import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommunicationServiceService {

  public unsoldPlayerSubject = new Subject<any>();
  public currentPlayerToBidOn = new Subject<any>();
  public playersPopulated = new Subject<any>();
  public auctionCompleted = new Subject<any>();
  public allplayersLoaded = new Subject<any>();
  public currentTeamLoaded = new Subject<any>();
  public clientSetinDb = new Subject<any>();
  public auctionStarted = new Subject<any>();

  
  constructor() { }

  sendMessageToAuctionStarted(){
    this.auctionStarted.next(1);
  }

  sendMessageToUpdateUnsoldPlayers() {
    console.log("Updating unsold players");
    this.unsoldPlayerSubject.next(1);
  }

  sendMessageToUpdateCurrentPlayer() {
    this.currentPlayerToBidOn.next(1);
  }
  
  sendMessageToCreateTeamList(): any {
    console.log("SUBJECT: All players populated. sending message to create full team list");
    this.playersPopulated.next(1);
  }

  setMessageToAuctionComplete(): any {
    this.auctionCompleted.next(1);
  }

  setMessageToAllplayersLoaded(data = 234): any{
    this.allplayersLoaded.next(data);
  }

  setMessageToCurrentTeamLoaded(){
    console.log("comm service  currentTeam Loaded.");
    this.currentTeamLoaded.next(1);
  }

  setMessageToCurrentClient(){
    this.clientSetinDb.next(1);
  }
    

}
