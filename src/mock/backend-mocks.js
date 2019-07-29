/**
 * Created  on 2017/12/01.
 */
define([
    'angular-mocks',
    'mock/mock.config',
    'angular'
], function (ngMock, apiInfo) {
    'use strict';
    angular.module('backend-mocks', ['ngMockE2E'])
        .run(function ($httpBackend) {
            console.log('模拟后台启动....');
            var respondFunc = function(method, url, data, apiInfo){
                console.info("[%s]-发起[%s]接口调用,URL:%s",apiInfo.name,apiInfo.desc,url);
                // console.trace("[%s]-请求参数:%s",apiInfo.name,JSON.stringify(data));
                if(angular.isDefined(apiInfo.callback) && angular.isFunction(apiInfo.callback)){
                    console.info("[%s]-已定义回调方法，不使用默认处理",apiInfo.name);
                    return apiInfo.callback(method, url, data, apiInfo.data);
                }
                return [200, apiInfo.data];
            };
            /* *
             * 定义具体mock处理
             * */
            angular.forEach(apiInfo,function(apiInfo){
                if(apiInfo.url){
                    if(apiInfo.method.toUpperCase() == "POST"){
                        $httpBackend.whenPOST(apiInfo.url).respond(function(method, url, data) {
                            return respondFunc(method, url, data, apiInfo);
                        });
                    }else if(apiInfo.method.toUpperCase() == "GET"){
                        $httpBackend.whenGET(apiInfo.url).respond(function(method, url, data) {
                            return respondFunc(method, url, data, apiInfo);
                        });
                    }else{
                        console.error("unsupported http method:{}",apiInfo.method);
                    }
                }
            })
            // apiInfo.forEach();

            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();

        })

});