import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
import { Client } from '../model/clients';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  isShowHide: boolean;
  client: Client[];
 
 
  constructor(public ds: DataService,public router:Router) {
    
  //  this.isShowHide = true;
   // if(this.ds.currentUser != 'none')
  //    this.router.navigate(["/dashboard"]);
   }
   sigup(){
     console.log("hasssaa");
     this.isShowHide = false;
   }

   login(){
    this.isShowHide = true;
   }
  //  admin(){

  //  }
  onSubmitLogin(form: NgForm) {
  //  this.ds.currentUser = form.value.adminUser;
 //   this.router.navigate(["/dashboard"]);
  }
  onsubmit(form: NgForm){
    // this.ds.currentUser = ""; //admin user
  //  this.ds.createClient(form.value);
    //console.log("ssjklrhsjfhsdlkjf",JSON.stringify(form.value));
  ///  this.ds.currentUser = form.value.adminUser;


    // TODO: iterate over all clients
    // find matching adminUserName or OberserUserName
    // and set ds.currentUser, and set ds.clientName
    // and set ds.UserRole 
//     let data2: string;

    
// for (let i = 0; i < this.ds.clients.length; i++) {
// data2 = this.ds.clients[i].$key;
  
//   if(form.value.adminUser == this.ds.clients[i].adminUser){
//     console.log("sadasdas");
//     this.router.navigate(["/dashboard"]);
//   }
   
  
// }
// this.ds.clientName = data2;
   
    // TODO: create and save AuctionSetting for this client
    //
    form.reset();
  }

  ngOnInit() {
    this.ds.getClientsdataRef()    
  }

}
