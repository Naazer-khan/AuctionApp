import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
 
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-player-management',
  templateUrl: './PlayerManagement.component.html',
  styleUrls: ['./PlayerManagement.component.css'],
  providers :[DataService]
})
export class PlayerManagementComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    
  }
  onSubmit(playerForm: NgForm) {
    if(playerForm.value.$key == null){
      this.dataService.insertPlayer(playerForm.value);
      console.log('Submitted Succcessfully');
      playerForm.reset();
    }
    else{
      this.dataService.updatePlayer(playerForm.value);
      console.log('update Succcessfully')
      playerForm.reset();
    }
  }

}
