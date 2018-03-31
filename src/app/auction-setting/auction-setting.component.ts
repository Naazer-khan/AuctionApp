import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { NgForm } from '@angular/forms';
import { AuctionSettings } from '../model/auctionSetting';
import { HeaderComponent } from '../header/header.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-auction-setting',
  templateUrl: './auction-setting.component.html',
  styleUrls: ['./auction-setting.component.css'],
  providers: [DataService]
})
export class AuctionSettingComponent implements OnInit {

  settingValueStr: string;
  settingValueNum: number;
  SweetAlert: any;

  constructor(public ds: DataService) {  
    //this.ds.updateIP(ClientIP);
    this.ds.pingIP();
    }
  ngOnInit() {  }

  onEdit(auction: AuctionSettings) {
    console.log("hello", auction);
    this.ds.selectedauctionSetting = Object.assign({}, auction);
  }

  updateSettingsString(settingsKey, updated) {
    console.log(settingsKey + " : " + updated.value);
    this.ds.updateKeyValueInDB("/AuctionSettings/" + settingsKey, updated.value);
    updated.value = '';
  }

  updateSettingsNumber(settingsKey, updated) {
    var updatedValueNum = parseInt(updated.value);
    console.log(settingsKey + " : " + updatedValueNum);
    this.ds.updateKeyValueInDB("/AuctionSettings/" + settingsKey, updatedValueNum);
    updated.value = '';
  }

  startAuction() {
    this.ds.updateAuctionStatus("Started");
  }

  stopAuctionAndRestart() {
    this.ds.updateAuctionStatus("NotStarted");
  }

  resetTeams(){
    swal({
      title: 'Are you sure?',
       text: "You won't be able to revert this!",
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, Reset it!'
      //buttonsStyling: false,
      //reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.ds.updateKeyValueInDB("/AuctionSettings/AuctionStatus", "NotStarted");
        this.ds.resetTeam(this.ds.teamList);
        this.ds.resetPlayer(this.ds.playerList);
        this.ds.deleteBookkeeping(this.ds.bookList);
        swal(
          'Reset!',
          'Players and Teams Reset Successful.',
          'success'
        )
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        // swal(
        //   'Cancelled',
        //   // 'You imaginary file is safe :)',
        //   // 'error'
        // )
      }
    })
   
  
  }


}
