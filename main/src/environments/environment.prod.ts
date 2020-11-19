/** 生产环境下的微应用配置 */
const MICRO_APPS_CONFIG = [
  {
    name: 'app1',
    entry: '//localhost:17401',
    container: '#subapp-viewport',
    activeRule: '/app1',
  },
];

export const environment = {
  production: true,
  apiPrefix: '/apis',
  appsConfig: MICRO_APPS_CONFIG
};
