import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Team} from './model/team';
import { Player } from './model/player';
@Injectable()
export class DataService {

playerList: AngularFireList<any>;
selectedPlayer: Player = new Player();

  teamList: AngularFireList<Team>;
  constructor(private fb: AngularFireDatabase) { 
    this.teamList = this.fb.list('/teams');
  }


  getCandidateList(){
    this.playerList = this.fb.list('players');
    return this.playerList;
  }

  insertPlayer(player: Player){
    this.playerList.push({
      name:player.name,
      batting: player.batting,
      bowling: player.bowling,
      role: player.role,
      run: player.run,
      wicket: player.wicket,
      status: false
    });
  }


  updatePlayer(player: Player){
    this.playerList.update(player.$key,
      {
        name:player.name,
      batting: player.batting,
      bowling: player.bowling,
      role: player.role,
      run: player.run,
      wicket: player.wicket,
      status: false
    });
  }

  deletePlayer($key: string){
    this.playerList.remove($key);
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
