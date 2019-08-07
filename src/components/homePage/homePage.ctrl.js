
// import angular from 'angular'
import business from '../business.mod'
import './homePage.less'
import Swiper from 'swiper';
require('swiper/dist/css/swiper.css')//引入node-modules里面的样式
// import 'swiper/dist/css/swiper.css';
export default business.controller('homePageCtrl',['$scope','$state',function($scope,$state){
    $scope.swiperItemData=[{
        imageUrl: require( '../image/vue.jpg'),
    },{
        imageUrl: require('../image/webpack.jpg')
    },{
        imageUrl: require('../image/weChat.jpg')
    },{
        imageUrl: require('../image/typeScript.jpg')
    },{
        imageUrl: require('../image/node.jpg')
    }];
    setTimeout(function(){
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            autoplay: true,//可选选项，自动滑动
            grabCursor: true,
            observer: true,
            observeParents: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })  
    })   
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