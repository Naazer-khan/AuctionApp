import { Component, OnInit } from '@angular/core';

import { fakeTeams } from '../FakeData';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams = [];
  constructor() { }

  ngOnInit() {
    this.teams = fakeTeams;
  }

}
