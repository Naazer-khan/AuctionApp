import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
//declare let ClientIP: any;

@Component({
  selector: 'app-remaining-players',
  templateUrl: './remaining-players.component.html',
  styleUrls: ['./remaining-players.component.css']
})
export class RemainingPlayersComponent implements OnInit {

  constructor(public dataService: DataService) {
    //this.dataService.updateIP(ClientIP);
   }

  ngOnInit() { }

}
