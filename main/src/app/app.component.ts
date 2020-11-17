import { Component, OnInit } from '@angular/core';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.registerMicroApps();

    setDefaultMountApp('/app1');

    start();

    runAfterFirstMounted(() => {
      console.log('[MainApp] first app mounted');
    });
  }

  registerMicroApps(): void {
    registerMicroApps(
      [
        {
          name: 'app1',
          entry: '//localhost:7401',
          container: '#subapp-viewport',
          activeRule: '/app1',
        },
      ],
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
}
