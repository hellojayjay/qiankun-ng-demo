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

命令：`npm i qiankun-ng-common`