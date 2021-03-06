import "./css/reset.css"
import "./css/common.css"
require('./fonts/font/css/open-iconic-bootstrap.css')
import angular from 'angular'
import ngCookies from 'angular-cookies'
import 'oclazyload'
import uiRouter from 'angular-ui-router'
// angular的路由与入口配置
import coreRouter from './route.js'
import { coreConfig,runConfig } from './index.config.js'
import business from './components/business.mod'
import 'jquery'
require('./mock/mock.mod')
import utilities from './utilities/utilities.mod'
angular.element(document).ready(function () {
    console.log(business,'1111')
    //手工启动Angular APP
    var app = angular.module('myModule', [
        ngCookies,
        'oc.lazyLoad',
        uiRouter,
        business.name,
        utilities.name
    ]);
    app.config(['$controllerProvider','$compileProvider','$filterProvider','$provide',
        function ($controllerProvider,$compileProvider,$filterProvider,$provide){
            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };
    }])
    // 祖籍控制器
    app.controller('IndexCtrl', ['$scope','$location','$http',
        function ($scope,$location,$http) {
            console.log('我是主程序')
            $http({
                method: 'POST',
                url: '/loadingData'
            }).then((success,fail)=>{
                console.log(success,'22222222222')
            })
        }]
    );
    // 路由配置
    app.config(coreRouter);
    // 全局配置
    app.config(coreConfig);
    // 启动配置
    app.run(runConfig)
    angular.bootstrap(document, ['myModule']);
});



