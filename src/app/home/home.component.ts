import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';

//declare let ClientIP: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public ds:DataService) { 
    //this.ds.updateIP(ClientIP);
   }

  ngOnInit() {}
}
