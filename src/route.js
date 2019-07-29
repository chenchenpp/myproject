export var angularConfig={
    config: config(['$urlRouterProvider', '$stateProvider',
        function ($urlRouterProvider, $stateProvider) {
            var userPath = './components/';
            var v = '?v=' + window.CACTUS.version;
            $urlRouterProvider.when("", "/homePage").otherwise('/homePage');
            $stateProvider
                .state("homePage",{
                    url: "/homePage",
                    templateUrl: userPath+"homePage/homePage.html"+v,
                    // controller: 'homePageCtrl',
                    // resolve: {
                    //     loadCommunity: ['$ocLazyLoad', function ($ocLazyLoad) {
                    //         return $ocLazyLoad.load([
                    //             userPath + 'homePage/homePage.ctrl.js']);
                    //     }]
                    // }

                })
                // .state("amountEstimate", {
                //     url: "/amountEstimate?uuid",
                //     templateUrl: userPath + "amountEstimate/amountEstimate.html" + v,
                //     controller: 'amountEstimateCtrl',
                //     resolve: {
                //         loadCommunity: ['$ocLazyLoad', function ($ocLazyLoad) {
                //             return $ocLazyLoad.load([
                //                 userPath + 'amountEstimate/amountEstimate.ctrl.js']);
                //         }]
                //     }
                // })
                // .state("normalProposal", {
                //     url: "/normalProposal?uuid",
                //     templateUrl: userPath + "normalProposal/normalProposal.html" + v,
                //     controller: 'normalProposalCtrl',
                //     resolve: {
                //         loadCommunity: ['$ocLazyLoad', function ($ocLazyLoad) {
                //             return $ocLazyLoad.load([
                //                 userPath + 'normalProposal/normalProposal.ctrl.js']);
                //         }]
                //     }
                // })
                // .state("car", {
                //     url: "/car?uuid",
                //     templateUrl: userPath + "car/car.html" + v,
                //     controller: 'carCtrl',
                //     resolve: {
                //         loadCommunity: ['$ocLazyLoad', function ($ocLazyLoad) {
                //             return $ocLazyLoad.load([
                //                 userPath + 'car/car.ctrl.js']);
                //         }]
                //     }
                // })
                // .state("calculate", {
                //     url: "/calculate?uuid",
                //     templateUrl: userPath + "calculate/calculate.html" + v,
                //     controller: 'calculateCtrl',
                //     resolve: {
                //         loadCommunity: ['$ocLazyLoad', function ($ocLazyLoad) {
                //             return $ocLazyLoad.load([
                //                 userPath + 'calculate/calculate.ctrl.js']);
                //         }]
                //     }
                // })
                // .state("loadInsuranceInfo", {
                //     url: "/loadInsuranceInfo?uuid",
                //     resolve: {
                //         loadCommunity: ['$ocLazyLoad', function ($ocLazyLoad) {
                //             return $ocLazyLoad.load('loadInsuranceInfo');
                //         }]
                //     },
                //     // views: {
                //     //     main: {
                //     templateUrl: userPath + "loadInsuranceInfo/loadInsuranceInfo.html" + v,
                //     controller: 'loadInsuranceInfoCtrl'
                //     // }
                //     // }amountEstimateCtrl
                // });
        }])
}