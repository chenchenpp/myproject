import "./css/tm.pagination.css"
import "./css/jedate.css"
import "./css/base.css"
import "./css/index.css"
import angular from 'angular'
import ngCookies from 'angular-cookies'
import 'oclazyload'
import uiRouter from 'angular-ui-router'
import coreRouter from './route.js'
import { coreConfig,runConfig } from './index.config.js'

// import business from './components/business.mod'
// import { config } from './route'
// import utilities from './utilities/utilities.mod'
angular.element(document).ready(function () {
    console.log(1111111111111111)
    //手工启动Angular APP
    var app = angular.module('myModule', [
        ngCookies,
        'oc.lazyLoad',
        uiRouter,
        // business
    ]);
    console.log(app)
    app.controller('IndexCtrl', ['$scope','$location',
        function ($scope,$location) {
            console.log('我是主程序')
            // if(AuthHandler.isLogined()){
            //     console.log("已登录");
            //
            // }else{
            //     console.log("未登录");
            //     $location.path("/login");
            // }
        }]
    );
    app.config(['$controllerProvider','$compileProvider','$filterProvider','$provide',
        function coreConfig($controllerProvider,$compileProvider,$filterProvider,$provide){
            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };
        }])
    app.config(coreRouter);
    app.config(coreConfig);
    app.run(runConfig)
    angular.bootstrap(document, ['myModule']);
});



