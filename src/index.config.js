function coreConfig($httpProvider){
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
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}
coreConfig.$inject=['$httpProvider']
// app.config(['$httpProvider', function($httpProvider){
//     $httpProvider.interceptors.push(['$q', '$location',function($q, $location, $localStorage){
//         return {
//             'request': function (config) {
//                 config.headers = config.headers || {};
//                 return config;
//             },
//             'responseError': function(response) {
//                 if(response.status === 401 || response.status === 403) {
//                     $location.path('/login');
//                 }
//                 return $q.reject(response);
//             }
//         };
//     }]);
// }]);
// // 禁用ie的 ajax request caching
// app.config(['$httpProvider',function($httpProvider){
//     if (!$httpProvider.defaults.headers.get) {
//         $httpProvider.defaults.headers.get = {};
//     }
//     $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
//     $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
//     $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
//     $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
// }]);
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

 function runConfig($state,$stateParams,$rootScope){
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
runConfig.$inject=['$state','$stateParams','$rootScope']
export { coreConfig,runConfig }