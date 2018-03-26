import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
//declare let ClientIP: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Auction Management';
  constructor(public ds:DataService) {
    //this.ds.updateIP(ClientIP);
   }

  ngOnInit() {
  }

}
