
/**
 * Created by zqq on 2017/12/01.
 * 基础库模块总入口
 */

/*引入依赖模块的定义文件*/
define([
    'angular',
    'utilities/constant/apiPath.constant',
    'utilities/constant/codesConstant'
],function (angular, ApiPathConstant, codesConstant) {
    'use strict';
    /*定义常量模块*/
    return angular.module('utilities.constant', [])
        .constant('apiPath',ApiPathConstant)
        .constant('codesConstant',codesConstant);
});