import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Player } from '../model/player';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  playerList: Player[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    var x = this.dataService.getCandidateList();
    x.snapshotChanges().subscribe(item => {
      this.playerList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
         y["$key"] = element.key;
        this.playerList.unshift(y as Player);
      });
    });
  }
  

  onEdit(plyr: Player) {
    this.dataService.selectedPlayer = Object.assign({}, plyr);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.dataService.deletePlayer(key);
      // this.tostr.warning("Deleted Successfully", "Employee register");
    }
  }

}
