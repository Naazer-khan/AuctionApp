import { Component, OnInit } from '@angular/core';

import { fakeTeams } from '../FakeData';
import { DataService } from '../data.service';
import { Team } from '../model/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams :Team[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.teams = fakeTeams;

    this.teams = this.dataService.getTeamList();
    console.log("teams in Team component - " + this.teams);

  }

  printTeams() {
    console.log("teams in Team component - " + this.teams);
  }
}
