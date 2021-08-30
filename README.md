# hell-home

> Hell Vision 的个人网站前端工程
> > 基本框架 V0.0.0

## 目的

***作为一个项目框架，今后需要开发新项目时可以直接使用该分支***

## 框架结构

#### 1. 依赖包
```bash
"dependencies": {
    "ant-design-vue": "^1.7.8",
    "axios": "^0.21.1",
    "less": "^4.1.1",
    "less-loader": "^4.1.0",
    "markdown-it-vue": "^1.1.6",
    "vue": "^2.5.2",
    "vue-i18n": "^8.25.0",
    "vue-router": "^3.0.1",
    "vuex": "^3.6.2",
    "waifus": "^1.2.2"
}
```

#### 2. 目录结构

```bash
│
├──src
│   ├──assets               ...公共资源
│   ├──connon               ...公共方法
│   ├──components           ...公共组件
│   ├──config               ...项目配置项
│   ├──lang                 ...国家化语言包js文件
│   ├──page                 ...项目页面views
│   ├──router               ...项目路由
│   ├──tool                 ...各大插件包
│   ├──App.vue              ...项目入口文件
│   └──main.js              ...项目入口文件
│
├──static
│   ├──config               ...json配置
│   ├──img                  ...图片资源
│   ├──lang                 ...国际化语言包json文件
│   ├──log                  ...开发日志
│   ├──READ                 ...项目文档
│   └──toolRes              ...项目工具资源参考
│
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

