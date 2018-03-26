import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
 
import { DataService } from '../services/data.service';
import { Player } from '../model/player';
import swal from 'sweetalert2';

//declare let ClientIP: any;

@Component({
  selector: 'app-player-management',
  templateUrl: './PlayerManagement.component.html',
  styleUrls: ['./PlayerManagement.component.css'],
  providers :[DataService]
})
export class PlayerManagementComponent implements OnInit {
  // list: any[] = ['Batsman','Bowler','All Rounder','Wicket Keeper'];
  // role = 0;
  p: any;
  constructor(public ds: DataService) { 
    //this.ds.updateIP(ClientIP);
  }

  ngOnInit() {
    
  }
  onSubmit(playerForm: NgForm) {
    console.log("batting style"+JSON.stringify(playerForm.value));
    if(playerForm.value.bowling == undefined) 
        playerForm.value.bowling = "";
      if(playerForm.value.batting == undefined) 
        playerForm.value.batting = "";
      if(playerForm.value.role == undefined) 
        playerForm.value.role = "";
      
    if(playerForm.value.$key == null){
      console.log("update player form " + JSON.stringify(playerForm.value));
      this.ds.insertPlayer(playerForm.value);
      console.log('Submitted Succcessfully', playerForm.value);
      playerForm.reset();
    }
    else{
      this.ds.updatePlayer(playerForm.value);
      console.log('update Succcessfully')
      playerForm.reset();
    } 
  }
  
  onEdit(plyr: Player) {
    console.log("PLayerdta",plyr);
    this.ds.selectedPlayer = Object.assign({}, plyr);
  }

  onDelete(key: string) {
    swal({
      title: 'Are you sure?',
       text: "You won't be able to revert this!",
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, Delete it!'
      //buttonsStyling: false,
      //reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.ds.deletePlayer(key);
        swal(
          'Deleted!',
          'Player Deleted.',
          'success'
        )
      }else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      )  {
        // swal(
        //   'Cancelled',
        //   // 'You imaginary file is safe :)',
        //   // 'error'
        // )
      }
    })
   
    // if (confirm('Are you sure to delete this record ?') == true) {
    //   this.ds.deletePlayer(key);
    //   // this.tostr.warning("Deleted Successfully", "Employee register");
    // }
  }

}
