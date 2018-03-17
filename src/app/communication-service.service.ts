import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommunicationServiceService {

  public unsoldPlayerSubject = new Subject<any>();
  public currentPlayerToBidOn = new Subject<any>();
  public playersPopulated = new Subject<any>();
  constructor() { }

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
  

}
