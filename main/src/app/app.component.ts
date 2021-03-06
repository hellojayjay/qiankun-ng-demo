import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-root',
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

    this.registerMicroApps();

    setDefaultMountApp('/app1');

    start();

    runAfterFirstMounted(() => {
      console.log('[MainApp] first app mounted');
    });
  }

  /** 注册子项目 */
  registerMicroApps(): void {
    registerMicroApps(
      env.appsConfig,
      {
        beforeLoad: [
          app => {
            console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
            return Promise.resolve();
          },
        ],
        beforeMount: [
          app => {
            console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
            return Promise.resolve();
          },
        ],
        afterUnmount: [
          app => {
            console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
            return Promise.resolve();
          },
        ],
      }
    );
  }

  sendReq(): void {
    this.http.get(`${env.apiPrefix}`).subscribe(res => {
      this.apiMsg = JSON.stringify(res);
    });
  }
}
