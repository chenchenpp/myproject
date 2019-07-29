import angular from 'angular'
import ngCookies from 'angular-cookies'
import oclazyload from 'oclazyload'
import uiRouter from 'angular-ui-router'
import business from './components/business.mod'
import { angularConfig } from './route'
// import utilities from './utilities/utilities.mod'
console.log(angularConfig)
angular.element(document).ready(function () {
    console.log(1111111111111111)
    //手工启动Angular APP
    angular.bootstrap(document, ['prpins']);
    var app = angular.module('prpins', [
        'ngCookies',
        'oclazyload',
        'uiRouter',
        'ui.router.state',
        'backend-mocks',  // mock模块仅供本地测试 提交生产时需要注释
        'business',
        'utilities'
    ]);
    app.controller('IndexCtrl', ['$scope','$location',
        function ($scope,$location) {
            // if(AuthHandler.isLogined()){
            //     console.log("已登录");
            //
            // }else{
            //     console.log("未登录");
            //     $location.path("/login");
            // }
        }]
    );
    app.config=angularConfig.config;
    app.config([
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };
        }]);
    app.config(['$httpProvider', function($httpProvider){
        $httpProvider.interceptors.push(['$q', '$location',function($q, $location, $localStorage){
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }]);
    
    /* app.constant('Modules_Config', [
        {
            name: 'carMod',
            serie: true,
            files: [
                "components/car/car.ctrl.js"
            ]
        }]);
    app.config(["$ocLazyLoadProvider","Modules_Config",function ($ocLazyLoadProvider,Modules_Config){
        $ocLazyLoadProvider.config({
            debug:false,
            events:false,
            modules:Modules_Config
        })}]);*/
    
    // 禁用ie的 ajax request caching
    app.config(['$httpProvider',function($httpProvider){
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }]);
    app.run(['$state', '$stateParams', '$rootScope','promptServ',
        function ($state, $stateParams, $rootScope, promptServ) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams, options) {
                    if("calculate" ===fromState.name){
                        $(window).unbind("scroll")
                    }
                }
            );
            $rootScope.$on('$locationChangeSuccess',
                function(event, toState, toParams, fromState, fromParams){
                    // 页面回顶部
                    $("html,body").animate({
                        scrollTop:0
                    },300);
            });
        }
    ]);
    return app
});



