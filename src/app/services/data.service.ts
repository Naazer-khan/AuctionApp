import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Team } from '../model/team';
import { Player } from '../model/player';
import { BookKeeping } from '../model/bookKeeping';
import { Client } from '../model/clients';
import { AuctionSettings } from '../model/auctionSetting';
import { CommunicationServiceService } from './communication-service.service';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {

  privateIp: any;
  auctionStatus: string;
  currentUser: string = "none";
  
  bookRef: AngularFireList<{}>;
  clientRef: AngularFireList<{}>;
  teamRef: AngularFireList<any>;
  playerRef: AngularFireList<any>;
  auctionRef: AngularFireList<any>;
  
  clientName: string = "/development";

  isAuctionComplete: boolean = false;
  isAdmin: boolean = true;

  auctionSettings: any;
  selectedPlayer: Player = new Player();
  selectedTeam: Team = new Team();
  selectedClient: Client = new Client();
  selectedauctionSetting: AuctionSettings = new AuctionSettings();

  // $teamListWithUpdate: any[];
  teamList: Team[];
  playerList: Player[];
  unsoldPlayerList: Player[];
  bookList: BookKeeping[];

  // temporary variables
  resetplayers: any;
  resetteamdata: any;
  deleteBookLIst: any;
  clients: Client[];

  initializeDatabaseNodeReferences() {
    let baseDbName = this.getBaseDBName();
    this.playerRef = this.fb.list(baseDbName + '/players');
    this.teamRef = this.fb.list(baseDbName + '/teams');
    this.auctionRef = this.fb.list(baseDbName + '/AuctionSettings');
    this.bookRef = this.fb.list(baseDbName + '/BooKeeping');
   }

  constructor(public fb: AngularFireDatabase
    , private commService: CommunicationServiceService) {
    
    this.initializeDatabaseNodeReferences();

    this.teamRef.snapshotChanges().subscribe(item => {
      this.teamList = [];
      let maxId = 0;
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.teamList.push(y as Team);
        if (parseInt(y["tid"]) > maxId) {
          maxId = y["tid"];
        }
      });
      Team.counter = maxId + 1;
      this.commService.setMessageToCurrentTeamLoaded();
    });

    this.setListnerOnAuctionSettings();

    this.playerRef.snapshotChanges().subscribe(item => {
      this.playerList = [];
      this.unsoldPlayerList = [];
      let maxId = 0;

      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        if (parseInt(y["pid"]) > maxId) {
          maxId = y["pid"];
        }
        this.playerList.unshift(y as Player);
        if (y["isSold"] == false) {
          this.unsoldPlayerList.push(y as Player)
        }
      });
      if (this.unsoldPlayerList.length == 0) {
        this.commService.setMessageToAuctionComplete();
        this.commService.setMessageToCurrentClient();
      } else {
        this.commService.sendMessageToUpdateCurrentPlayer();
      }
      Player.counter = maxId + 1;
      this.commService.setMessageToAllplayersLoaded();
    });

    this.bookRef.snapshotChanges().subscribe(item => {
      this.bookList = [];
      item.forEach(element => {
        var a = element.payload.toJSON();
        a["$key"] = element.key;
        a["playerName"] = this.getPlayerNameFromId(a["playerId"]);
        a["teamName"] = this.getTeamNameFromId(a["teamId"]);
        this.bookList.unshift(a as BookKeeping);
      });
      BookKeeping.counter = item.length;
      console.log("length of bookkeeping list:", this.bookList.length);
    });

  }


  /*
  * Unused methods
  */
  getClientsdataRef() {
    // get all clients
    // match username and return series-name
    this.clientRef = this.fb.list("/Clients");
    this.clientRef.snapshotChanges().subscribe(item => {
      this.clients = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.clients.push(y as Client);
      });
      // console.log("individual client is  : " + JSON.stringify(this.clients));
      //this.commService.setMessageToCurrentClinet()
    });
    return this.clientRef;
  }
  createClient(client: Client) {
    console.log("Updating clients node in db " + JSON.stringify(client));
    this.fb.object("/Clients/" + client.name).set({
      name: client.name,
      adminUser: client.adminUser,
      adminPassword: client.adminPassword,
      observerUser: 'user',
      observerPassword: 'user123'
    });
  }
  insertAuctionDetails(auctionsdata: AuctionSettings) {
    this.auctionRef.push({
      AuctionCurrency: auctionsdata.AuctionCurrency,
      AuctionStatus: auctionsdata.AuctionStatus,
      InitialAmountPerTeam: auctionsdata.InitialAmountPerTeam,
      MinimumBidAmount: auctionsdata.MinimumBidAmount,
      NumberOfPlayersPerTeam: auctionsdata.NumberOfPlayersPerTeam,
      PerTeamSafetyBidAmountMultiplier: auctionsdata.PerTeamSafetyBidAmountMultiplier
    });
  }

  /*
  * Book keeping/Transaction Methods
  */

  insertbookeeping(bookeeping) {
    console.log("insert bookeeping" + JSON.stringify(bookeeping));
    let nextId = BookKeeping.getNextId();
    let t = new Date() + "";
    this.bookRef.push({
      transactionId: nextId,
      playerId: bookeeping.playerId,
      teamId: bookeeping.teamId,
      playerSoldAt: bookeeping.playerSoldAt,
      time: t,
      deleted: false
    });
  }

  deleteBookkeeping(bookList) {
    bookList.forEach(item => {
      this.deleteBookLIst = item;
      this.bookRef.remove(this.deleteBookLIst.$key)
    })
    console.log("booklist from database" + JSON.stringify(bookList));
  }


  /*
  * Player Management methods
  */

  updatePlayer(player: Player, isSoldParam = false, soldToTeamId = -1, biddingAmt = 0) {
    console.log("Updating Player " + JSON.stringify(player));
    this.playerRef.update(player.$key,
      {
        name: player.name,
        batting: player.batting,
        bowling: player.bowling,
        role: player.role,
        run: 0,
        wicket: 0,
        isSold: isSoldParam,
        tid: soldToTeamId,
        biddingAmount: biddingAmt
      });
  }

  insertPlayer(player: Player) {
    let nextPlayerId = Player.counter;
    this.playerRef.push({
      name: player.name,
      pid: nextPlayerId,
      batting: player.batting,
      bowling: player.bowling,
      role: player.role,
      run: 0,
      wicket: 0,
      isSold: false
    });
  }

  resetPlayer(playerList) {
    playerList.forEach(item => {
      this.resetplayers = item;
      this.playerRef.update(this.resetplayers.$key, {
        name: this.resetplayers.name,
        batting: this.resetplayers.batting,
        bowling: this.resetplayers.bowling,
        role: this.resetplayers.role,
        run: this.resetplayers.run,
        wicket: this.resetplayers.wicket,
        isSold: false,
        tid: -1,
        biddingAmount: 0
      })
      console.log('single Player data', JSON.stringify(this.resetplayers));
    })
  }

  deletePlayer($key: string) {
    this.playerRef.remove($key);
  }


  /* 
   * Team Management methods
   */
  resetTeam(teamList) {
    teamList.forEach(item => {
      this.resetteamdata = item;
      let initialAmount = this.auctionSettings.InitialAmountPerTeam;
      let maxNumberOfPlayerThatCanBeBought = this.auctionSettings.NumberOfPlayersPerTeam;
      let minimumBidAmount = this.auctionSettings.MinimumBidAmount
        * this.auctionSettings.PerTeamSafetyBidAmountMultiplier;
      let reservedAmount = (maxNumberOfPlayerThatCanBeBought - 1) * minimumBidAmount;
      let nextBidMaxAmount = initialAmount - reservedAmount;
      let remainingAmt = initialAmount;
      this.teamRef.update(this.resetteamdata.$key, {
        tid: this.resetteamdata.tid,
        name: this.resetteamdata.name,
        numberOfPlayersBought: 0,
        playerIds: "",
        remainingAmount: remainingAmt,
        nextBidMaxAmount: nextBidMaxAmount,
        reservedAmount: reservedAmount
      })
      console.log('single Player data', JSON.stringify(this.resetteamdata));
    })
  }

  insertTeam(team: Team) {
    console.log("insertTeam " + JSON.stringify(team));

    let initialAmount = this.auctionSettings.InitialAmountPerTeam;
    let maxNumberOfPlayerThatCanBeBought = this.auctionSettings.NumberOfPlayersPerTeam;
    let minimumBidAmount = this.auctionSettings.MinimumBidAmount
      * this.auctionSettings.PerTeamSafetyBidAmountMultiplier;
    let reservedAmount = (maxNumberOfPlayerThatCanBeBought - 1) * minimumBidAmount;
    let nextBidMaxAmount = initialAmount - reservedAmount;
    let remainingAmt = initialAmount;
    let nextTeamId = Team.getNextId();
    this.teamRef.push({
      tid: nextTeamId,
      name: team.name,
      numberOfPlayersBought: 0,
      playerIds: "",
      remainingAmount: remainingAmt,
      nextBidMaxAmount: nextBidMaxAmount,
      reservedAmount: reservedAmount
    });
    this.selectedTeam = new Team();
  }

  deleteTeam($key: string) {
    this.teamRef.remove($key);
  }

  updateTeamAfterSellTransaction(team: Team) {
    console.log("Updating Team after sell transaction " + JSON.stringify(team));
    this.teamRef.update(team.$key, {
      name: team.name,
      playerIds: team.playerIds,
      numberOfPlayersBought: team.numberOfPlayersBought,
      nextBidMaxAmount: team.nextBidMaxAmount,
      reservedAmount: team.reservedAmount,
      remainingAmount: team.remainingAmount
    });
  }

  updateTeam(team: Team) {
    console.log("Updating Team " + JSON.stringify(team));
    this.teamRef.update(team.$key, {
      name: team.name
    });
  }

  /*
  * AuctionSettings methods
  */
  updateAuctionSetting(auctionsetting: AuctionSettings) {
    this.auctionRef.update(auctionsetting.$key, {
      AuctionCurrency: auctionsetting.AuctionCurrency,
      AuctionStatus: auctionsetting.AuctionStatus,
      InitialAmountPerTeam: auctionsetting.InitialAmountPerTeam,
      MinimumBidAmount: auctionsetting.MinimumBidAmount,
      NumberOfPlayersPerTeam: auctionsetting.NumberOfPlayersPerTeam,
      PerTeamSafetyBidAmountMultiplier: auctionsetting.PerTeamSafetyBidAmountMultiplier
    });
  }

  setListnerOnAuctionSettings() {
    var auctionSettingsLocal = {};
    // var x = this.fb.list('/AuctionSettings')
    this.auctionRef.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        var z = element.payload.toJSON();
        auctionSettingsLocal[element.key] = z;
        // console.log("individual AuctionSetting " + JSON.stringify(z) + " " + element.key);
        // console.log("auctionSettings " + JSON.stringify(auctionSettings));
        if (element.key == "AuctionStatus") {
          let zz = JSON.stringify(z);
          if (zz == '"Started"' && this.auctionStatus != "Started") {
            this.auctionStatus = "Started";
            console.log("if matched");
            // subject
            this.commService.sendMessageToAuctionStarted();
          } else {
            this.auctionStatus = zz;
          }
          console.log("auction status changed " + this.auctionStatus);
        }
        // if block for checking is this user admin?
        if (element.key == "AdminIP") {
          let zz = JSON.stringify(z);
          console.log("from databaseip address"+zz + ",privateIp " +  this.privateIp );
          if (zz == '"' + this.privateIp + '"') {
            this.isAdmin = true;
          }
          console.log("admin is set to2 ", this.isAdmin);
        }

      });
    });
    this.auctionSettings = auctionSettingsLocal;
  }
 
  pingIP(): any {
    // throw new Error("Method not implemented.");
  }
  
  getMinimumBidAmount(): any {
    // console.log("minimum bid amount " + JSON.stringify(this.auctionSettings)+ ", "+  this.auctionSettings["MinimumBidAmount"]);
    return this.auctionSettings["MinimumBidAmount"];
  }
  
  evaluateAdminPermission0() {
    // this.fb.list(this.getBaseDBName + "/AuctionSettings/AdminIP").take(1);  //'/teams/' , { preserveSnapshot: true }).take(1);
    console.log("evaluateAdminPermission");
    this.fb.database.ref(this.getBaseDBName() + '/AuctionSettings/AdminIP').once('value').then(
      (snapshot) => {
        snapshot.forEach(element => {
          var z = element.toJSON();
          // [element.key] = z;
          console.log("individual evaluateAdminPermission  " + JSON.stringify(z) + " " + element.key);
          
        });
      });
  }


  /**
   * Helper Methods
   {
      "234" : {Player object}
   }
   */

  getPlayerNameFromId(id: any): any {
    for (var p in this.playerList) {
      if (this.playerList[p].pid == id) {
        return this.playerList[p].name;
      }
    }
  }

  getPlayerObjectFromId(id: any): any {
    for (var p in this.playerList) {
      if (this.playerList[p].pid == id) {
        return this.playerList[p];
      }
    }
  }

  getTeamNameFromId(id: any): any {
    for (var p in this.teamList) {
      if (this.teamList[p].tid == id) {
        return this.teamList[p].name;
      }
    }
  }
  
  getTeamObjectFromId(id: any): any {
    for (var p in this.teamList) {
      if (this.teamList[p].tid == id) {
        return this.teamList[p];
      }
    }
  }

  setAuctionCompleted(): any {
    this.isAuctionComplete = true;
  }

  updateIP(ip: any): any {
    console.log("Updating IP in db , ip" + ip);
    this.privateIp = ip;
    this.updateKeyValueInDB("/AuctionSettings/AdminIP", ip);  
  }

  updateKeyValueInDB(key: any, value: any): any {
    console.log("Updating AuctionSettings " + key + ", value: " + value);
    this.fb.object(this.getBaseDBName() + key).set(value);
  }

  getBaseDBName(): string {
    return environment.baseDBName;
  }

  updateAuctionStatus(value): any {
    this.updateKeyValueInDB("/AuctionSettings/AuctionStatus", value);
    this.auctionStatus = value;
  }

}
