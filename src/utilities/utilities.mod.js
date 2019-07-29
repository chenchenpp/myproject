/**
 * Created by zqq on 2017/12/01.
 * 基础库模块总入口
 */

/*引入依赖模块的定义文件*/
define([
    'angular',
    'utilities/provider/provider',
    'utilities/factory/finderFactory',
    'utilities/template/template',
    'utilities/constant/module',
    'utilities/filter/filter',
    'utilities/dirctive/basic.components',
    'utilities/service/service'
],function (angular,
            eventBusHandler,
            finderFactoryHandler)
{
    return angular.module('utilities',
        [
            'utilities.provider',
            'utilities.filter',
            'utilities.constant',
            'utilities.dirctive',
            'utilities.service'
        ])
    // .provider('eventBus',eventBusHandler)
        .factory('finder',finderFactoryHandler)
    'use strict';
    /*增加模块依赖*/

});