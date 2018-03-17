import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
 
import { DataService } from '../data.service';
// import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css'],
  providers :[DataService]
})
export class PlayerDetailComponent implements OnInit {

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
