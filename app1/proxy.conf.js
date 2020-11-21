const PROXY_CONFIG = [{
  context: [
    "/app1/assets" // 此处需要代理app1下的所有静态资源(/app1/assets)，不能用/app1，因为可能和路由路径重复
  ],
  target: "http://localhost:4200", // 此处应为当前项目启动的端口
  pathRewrite: {
    "^/app1": ""
  },
  secure: false,
  changeOrigin: true
}, {
  context: [
    "/apis",
    "/app1Apis"
  ],
  target: "http://localhost:17500",
  pathRewrite: {
    "^/apis": ""
  },
  secure: false,
  changeOrigin: true
}];

module.exports = PROXY_CONFIG;
