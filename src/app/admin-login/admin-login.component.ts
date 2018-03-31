import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

declare let ClientIP: any;

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  constructor(private http: HttpClient
    , public ds:DataService
    , public router:Router
  ) {

    this.ds.updateIP(ClientIP);
    this.ds.pingIP();
    this.ds.isAdmin = true;
    this.router.navigate(["/dashboard"]);
  }

  ngOnInit() {}
}
