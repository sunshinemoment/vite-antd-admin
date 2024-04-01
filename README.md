# vite-antd-admin

## 目录

- view 应用入口
- user 登录注册页面
- pages 应用相关页面
- details 详情相关页面

## 页面缓存

- 静态命名占位路由 开启 keepAlive 且使用 customRouterViewKeepIncludeWidthName 方法
- 静态路由 需要命名路由 统一使用 wrap 方法
- 动态路由 使用 paramKeepHolder 占位路由
