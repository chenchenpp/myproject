/**
 * 后台调用方法（post.get）
 * 旨在提供一个公共方法,便于参数统一转换
 */
export default function finderFactoryHandler($http,$q,apiPath){
 /**合并两个对象 产生一个新对象
         *
         * @param obj2
         * @returns {*}
         */
        var concat = function (a,b) {
            for(var key in b){
                if(b.hasOwnProperty(key)){
                    a[key] = b[key]
                }
            }
            return a
        };
        return {
            post:function (url,data,config){
                var deferred = $q.defer();
                var defaultConfig = {
                    method: 'POST',
                    url: apiPath.ip + apiPath[url],
                    data: $.param(data),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
                };
                if(config){
                    concat(defaultConfig,config);
                }
                var promise = $http(defaultConfig);
                promise.then(
                    function (answer, status, headers) {
                        answer.status = true;
                        deferred.resolve(answer, status, headers);
                    },
                    function (error, status, headers) {
                        error.status = false;
                        deferred.reject(error, status, headers);
                    });
                return deferred.promise;
            },
            get:function (url,data,config){
                var deferred = $q.defer();
                var defaultConfig = {
                    method: 'GET',
                    url:  apiPath[url],
                    param: data,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
                };
                if(config) {
                    concat(defaultConfig,config);
                }
                var promise = $http(defaultConfig);
                promise.then(
                    function (answer, headers) {
                        answer.status = true;
                        deferred.resolve(answer, status, headers);
                    },
                    function (error, headers) {
                        error.status = false;
                        deferred.reject(error, status, headers);
                    });
                return deferred.promise;
            }
        };
    };
    finderFactoryHandler.$inject = ['$http','$q','apiPath'];
