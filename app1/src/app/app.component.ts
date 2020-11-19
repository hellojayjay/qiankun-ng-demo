import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  apiMsg: string;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.sendReq();
  }

  sendReq(): void {
    this.http.get(`${env.apiPrefix}`).subscribe(res => {
      this.apiMsg = JSON.stringify(res);
    });
  }
}
