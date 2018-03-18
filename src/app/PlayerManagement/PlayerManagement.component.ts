import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
 
import { DataService } from '../services/data.service';
import { Player } from '../model/player';

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
