# 从零开始创建以Angular为基座项目的qiankun微前端项目

## 一、创建及配置基座项目

**- 创建Angular项目**

命令：`ng n main`。询问是否需要路由时，选择Yes

**- 添加依赖**

所需依赖：`qiankun`，`qiankun-ng-common`

命令：`npm i qiankun qiankun-ng-common -S`

**- 配置默认路由**

*app-routing.module.ts*

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyComponent } from 'qiankun-ng-common';

const routes: Routes = [
  {
    path: '**',
    component: EmptyComponent // 配置默认路由，避免路由到子项目报错
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**- 配置页面路由**

*app.component.html*

```html
<h1>qiankun-ng-demo</h1>

<a routerLink="app1">app1</a>

<router-outlet></router-outlet>

<!--子应用渲染容器-->
<main id="subapp-container">
	<div id="subapp-viewport"></div>
</main>
```

此时，基座项目应该是可以启动，并且没有报错。

继续下面的将会报错和子项目配置有关，我们在配置完子项目后，便不会报错了。

**- 注册子项目**

```typescript
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

  /** 注册子项目 */
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
```



## 二、创建及配置子项目

**- 创建一个子项目**

命令：`ng n app1`

**- 使用single-spa-angular schematics**

命令：`ng add single-spa-angular`。PS：目前暂不支持angular11

具体做了啥，参考：https://single-spa.js.org/docs/ecosystem-angular/#schematics

**- 安装依赖**

命令：`npm i qiankun-ng-common -S`, `npm i @angular-builders/custom-webpack -D`

再安装一下缺失的依赖：`npm i`

**- 删除empty-route文件夹，添加公共的空组件**

*app1/app-routing.module.ts*

```typescript
const routes: Routes = [
  {
    path: '**',
    component: EmptyComponent
  }
];
```

**- 更改子项目根组件选择器**

*app.component.ts*

```typescript
@Component({
  selector: 'app1-root', // 此处不能和基座项目的根组件选择器相同
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {}
```

*index.html*

```html	
<body>
  <app1-root></app1-root>
</body>
```

## 三、启动项目

将基座项目启动端口改到7400，子项目启动端口改到7401后，运行下方命令分别启动基座项目和子项目。

**- 启动基座项目**

`npm start`

**- 启动子项目**

`npm run serve:single-spa:app1`

**- 页面展示效果：**

![demo.gif](https://raw.githubusercontent.com/hellojayjay/qiankun-ng-demo/main/demo.gif)

至此，应该已经能打开最基本的微前端项目了，若需后续配置，请查看 **四、TODO LIST**

## 四、TODO LIST

*以下配置可能需要有一定前端开发基础才能完成*

- [x] 项目内静态资源访问 [3d6ff7f](https://github.com/hellojayjay/qiankun-ng-demo/commit/3d6ff7ff52c09ba1cb13af48d1ddf4dbffe2b03d)
- [x] nginx多服务器部署 [ea98e35](https://github.com/hellojayjay/qiankun-ng-demo/commit/ea98e3543a72e4f8c37e04241d0749f37f9c4478) [cc41257](https://github.com/hellojayjay/qiankun-ng-demo/commit/cc4125701c03de0f8456f1fcd0855ab6bd5a4677)
- [x] 分别在基座项目和子项目中发起网络请求（需满足开发环境和生产环境）。*测试接口服务可在server文件夹下运行`npm start`以启动一个简易的api接口* 
  - 开发环境实现：[4181dad](https://github.com/hellojayjay/qiankun-ng-demo/commit/4181dad45a9e0f5c758084113cdb34c23bf3888b)
  - 生产环境实现：[493ed70](https://github.com/hellojayjay/qiankun-ng-demo/commit/493ed709c36f1b90fdc23364e9e5433fa14dcf1c)

