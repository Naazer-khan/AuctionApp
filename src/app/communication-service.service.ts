import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommunicationServiceService {

  public unsoldPlayerSubject = new Subject<any>();
  constructor() { }

  sendMessageToUpdateUnsoldPlayers() {
    this.unsoldPlayerSubject.next(1);
  }
}
