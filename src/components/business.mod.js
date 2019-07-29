/**
 * Created by crx on 20171106.
 * 业务模块总入口
 * 增加新业务模块请在此文件中增加依赖
 */

/*引入依赖模块的定义文件*/
import angular from 'angular'
var business = angular.module('business', []);
business.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        business.controller = $controllerProvider.register;
        business.directive = $compileProvider.directive;
        business.filter = $filterProvider.register;
        business.factory = $provide.factory;
        business.service = $provide.service;
        business.constant = $provide.constant;
    }]);
    export default business;