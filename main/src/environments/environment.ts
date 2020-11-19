/** 开发环境下的微应用配置 */
const MICRO_APPS_CONFIG = [
  {
    name: 'app1',
    entry: '//localhost:7401',
    container: '#subapp-viewport',
    activeRule: '/app1',
  },
];

export const environment = {
  production: false,
  /** 后端接口地址 */
  apiPrefix: '/apis',
  /** 微应用配置 */
  appsConfig: MICRO_APPS_CONFIG
};
