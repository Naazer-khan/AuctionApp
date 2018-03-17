import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-remaining-players',
  templateUrl: './remaining-players.component.html',
  styleUrls: ['./remaining-players.component.css']
})
export class RemainingPlayersComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() { }

}
