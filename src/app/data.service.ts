import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Team} from './model/team';
@Injectable()
export class DataService {

  teamList: AngularFireList<Team>;
  constructor(private fb: AngularFireDatabase) { 
    this.teamList = this.fb.list('/teams');
  }


  addTeam(formValue, additionalFields) {
    this.teamList.push({
      tid: formValue.tid,
      name: formValue.teamName,
      numberOfPlayersBought: 0,
      initialAmount: formValue.initialAmount,
      reservedAmount: 10,
      nextBidMaxAmount: 2,
      remainingAmount: 8,
      playerIds: []
    });
  }

}
