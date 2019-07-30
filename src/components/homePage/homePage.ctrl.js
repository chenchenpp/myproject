
// import angular from 'angular'
import business from '../business.mod'

export default business.controller('homePageCtrl',['$scope','$state',function($scope,$state){
    console.log('我是首页')
    $scope.homedata='我是homestart'
    console.log($scope)
    $scope.goDetail=function(){
        console.log($state)
        $state.go('detail')
    }
}])
// business.controller('homePageCtrl',['$scope',function ($scope) {
//     $scope.homedata='我是homestart'
//     }
// ])
// export default function homePageCtrl(){
//     return business.controller('homePageCtrl',['$scope',function ($scope) {
//             $scope.homedata='我是homestart'
//         }
//     ])
// }