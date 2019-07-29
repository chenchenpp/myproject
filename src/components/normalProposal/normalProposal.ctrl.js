/**
 * Created by crx on 2018/03/26.
 */
define(['business'], function (businessMod) {
    'use strict';
    businessMod.controller('normalProposalCtrl',
        ['$scope', '$state','$location','$stateParams','$anchorScroll','finder',
        function ($scope, $state, $location,$stateParams,$anchorScroll,finder) {
        //判断屏幕分辨率
        //     var $winH = $(window).outerHeight();
        //     if(1080 >= Math.abs($winH) > 100){
        //         alert(1)
        //         // $(".offer-main").style.minHeight=840;
        //     }

        //从首页跳转到转保的标识 0  续保 1
          $scope.flag=0;
        //已过户
         $scope.state=function () {
             $state.go("car",{uuid:$scope.uniqueID});
         };
        //换一张
        $scope.imgsrcurl="/newecar/CreateImageNew?next=0.4435600991413946&amp;randName=registerRandPhone&amp;uuid=";
        $scope.ChangeCode=function () {
            $scope.imgsrcurl="/newecar/CreateImageNew?randName=registerRandPhone&next="+Math.random() + '&uuid=';
        };
        //立即报价
        $scope.card={};
        $scope.fastBtn=function () {
            $scope.uniqueID = $stateParams.uuid;
            var conditionDto = {
                "tokenNo": $scope.card.tokenNo,
                "random": $scope.card.random,
                "uniqueID":$scope.uniqueID
            };
            finder.post("checkRenewal", conditionDto).then(
                function(data){
                    if(data.data.resultCode == "1001"){
                        $scope.$broadcast(data.data.elementID,data.data.resultMsg);
                        $location.hash(data.data.elementID);
                        $anchorScroll();
                    }
                }
            );
        };
    }])
});