import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFireList } from 'angularfire2/database';
import { Team } from '../model/team';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [DataService]
})
export class AdminComponent implements OnInit {

  newTeam: Team = new Team();
  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log("team - "+JSON.stringify(this.newTeam));
  }

  createTeam(form) {
    let additionalFields: any = {};
    additionalFields.remainingAmount=3;

    console.log("form value: " + JSON.stringify(form.value) + ",  additionalField-"+JSON.stringify(additionalFields));
    //this.dataService.addTeam(form.value, additionalFields);

  }

}
