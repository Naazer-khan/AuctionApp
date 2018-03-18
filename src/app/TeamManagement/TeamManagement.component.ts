import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AngularFireList } from 'angularfire2/database';
import { Team } from '../model/team';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-team-management',
  templateUrl: './TeamManagement.component.html',
  styleUrls: ['./TeamManagement.component.css'],
  providers: [DataService]
})
export class TeamManagementComponent implements OnInit {

  newTeam: Team = new Team();
  
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log("team - " + JSON.stringify(this.newTeam));
  }

  onEdit(tm: Team) {
    console.log("on update team object is " + JSON.stringify(tm));
    this.dataService.selectedTeam = Object.assign({}, tm);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.dataService.deleteTeam(key);
    }
  }

  createTeam(form: NgForm) {
    if (form.value.$key == null) {
      this.dataService.insertTeam(form.value);
      console.log('Submitted Succcessfully', form.value);
    } else {
      this.dataService.updateTeam(form.value);
      console.log('update Succcessfully');

    }
    form.reset();
  }
}
