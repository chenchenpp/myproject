export default function coreRouter($urlRouterProvider,$stateProvider){
    $urlRouterProvider.when("", "/homePage").otherwise('/homePage');
    $stateProvider
        .state("homePage",{
            url: "/homePage",
            template: require('./components/homePage/homePage.html'),
            controller: 'homePageCtrl',
            resolve: {
                load: ['$q','$ocLazyLoad',function ($q,$ocLazyLoad) {
                    return $q((resolve) => {
                        //下面这一行写法是webpack在需要的时候才下载依赖的模块，[具体看这里][2]
                        require.ensure([], () => {
                            //这里只是依赖了一个控制器文件，但是这个文件里面你可以import很多其他的依赖
                            let module = require('./components/homePage/homePage.ctrl'); 
                            //加载模块名为xxx.bg.login的模块，具体是什么作用没弄明白，请高手解答
                            $ocLazyLoad.load({name: 'business'}); 
                            //promise 的成功回调，不返回出去参数也没关系，因为在login.contorller.js里面已经注册了LoginCtrl
                            resolve(module.controller); 
                        });
                    });
                }]
            }
        })
        .state("detail",{
            url: "/detail",
            template: require('./components/detail/detail.html'),
            controller: 'detailCtrl',
            resolve: {
                load: ['$q','$ocLazyLoad',function ($q,$ocLazyLoad) {
                    return $q((resolve) => {
                        //下面这一行写法是webpack在需要的时候才下载依赖的模块，[具体看这里][2]
                        require.ensure([], () => {
                            //这里只是依赖了一个控制器文件，但是这个文件里面你可以import很多其他的依赖
                            let module = require('./components/detail/detail.ctrl'); 
                            //加载模块名为xxx.bg.login的模块，具体是什么作用没弄明白，请高手解答
                            $ocLazyLoad.load({name: 'business'}); 
                            //promise 的成功回调，不返回出去参数也没关系，因为在login.contorller.js里面已经注册了LoginCtrl
                            resolve(module.controller); 
                        });
                    });
                }]
            }
        })
}
coreRouter.$inject=['$urlRouterProvider','$stateProvider'];
