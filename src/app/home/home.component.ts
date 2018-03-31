import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

//declare let ClientIP: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public ds:DataService,private router:Router) { 
    //router.navigate(["/dashboard"]);
    //this.ds.updateIP(ClientIP);
    
   }
   navigatepage(){
     console.log("hello add number");
    this.router.navigate(["/dashboard"]);
   }

  ngOnInit() {}
}
