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