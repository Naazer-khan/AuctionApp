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
  onEdit(tm: Team) {
    console.log("on update team object is "+ JSON.stringify(tm));
    this.dataService.selectedTeam = Object.assign({}, tm);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.dataService.deleteTeam(key);
      // this.tostr.warning("Deleted Successfully", "Employee register");
    }
  }


  createTeam(form:NgForm) {
    if(form.value.$key == null){
      this.dataService.insertTeam(form.value);
      console.log('Submitted Succcessfully',form.value);
    }else{
      this.dataService.updateTeam(form.value);
      console.log('update Succcessfully');

    }
    form.reset();
    
    // let additionalFields: any = {};
    // additionalFields.remainingAmount=3;

    //console.log("form value: " + JSON.stringify(form.value) + ",  additionalField-"+JSON.stringify(additionalFields));
    //this.dataService.addTeam(form.value, additionalFields);

  }

  

}
