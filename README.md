# webpack+es6 product based on Angular1.x
说明：
  由于angular1.x是很早就出来的框架了，当时还没有很多的项目架构生态环境，随着时间的变更，webpack1就越来越在潮流中隐退，不过对于一些传统行业来说还可以大有所为，由于angular1.x对ie8是可支持的。
  所以在这个背景下，所以实现一个自己的基于webpack+es6+angular1.x的前端项目架构。
## 目录结构说明
* /index.html   应用程序主页
* /main.js  requireJS入口文件,用于配置第三方依赖库
* /app.js   Angular应用入口模块
* /route.js 应用框架级路由定义
* /config.js    配置文件
* /frame    公共基础模块,非业务模块
* /components   业务模块目录 
* /components/business.mod.js   业务模块入口文件,应用对所有业务模块的定义统一定义在这里
* /components/...               各个业务模块以独立文件夹形式存在,每个模块必须有统一的入口模块文件
* /lib      存放第三方库
* /css      存放所有样式文件
* /images   存放所有的图片文件
* /fonts    存放所有的字体文件
* /data     用于存放测试用数据

## Features
* IE>=8 support
* etc
-------------
From Jason
