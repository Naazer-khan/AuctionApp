import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { NgForm } from '@angular/forms';
import { AuctionSettings } from '../model/auctionSetting';
import { HeaderComponent } from '../header/header.component';

//declare let ClientIP: any;

// import { SweetAlertService } from '../../../node_modules/angular-sweetalert-service';
@Component({
  selector: 'app-auction-setting',
  templateUrl: './auction-setting.component.html',
  styleUrls: ['./auction-setting.component.css'],
  providers: [DataService]
})
export class AuctionSettingComponent implements OnInit {

  settingValueStr: string;
  settingValueNum: number;

  constructor(public ds: DataService) {
    //this.ds.updateIP(ClientIP);
    }
  ngOnInit() {  }

  onEdit(auction: AuctionSettings) {
    console.log("hello", auction);
    this.ds.selectedauctionSetting = Object.assign({}, auction);
  }

  updateSettingsString(settingsKey, updated) {
    console.log(settingsKey + " : " + updated.value);
    //this.ds.fb.object("/AuctionSettings/" + settingsKey).set(updated.value);
    this.ds.updateKeyValueInAuctionSettings("/AuctionSettings/" + settingsKey, updated.value);
    updated.value = '';
  }

  updateSettingsNumber(settingsKey, updated) {
    var updatedValueNum = parseInt(updated.value);
    console.log(settingsKey + " : " + updatedValueNum);
    this.ds.updateKeyValueInAuctionSettings("/AuctionSettings/" + settingsKey, updatedValueNum);
    updated.value = '';
  }

  resetTeams() {
    if (confirm('Are you sure to reset this record ?') == true) {
      this.ds.updateKeyValueInAuctionSettings("/AuctionSettings/AuctionStatus", "NotStarted");
      this.ds.resetTeam(this.ds.teamList);
      this.ds.resetPlayer(this.ds.playerList);
      this.ds.deleteBookkeeping(this.ds.bookList);
    }
  }

  startAuction() {
    this.ds.updateAuctionStatus("Started");
  }

  stopAuctionAndRestart() {
    this.ds.updateAuctionStatus("NotStarted");
  }


}
