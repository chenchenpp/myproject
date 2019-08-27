
// import angular from 'angular'
import business from '../business.mod'
import './homePage.less'
import Swiper from 'swiper';
require('swiper/dist/css/swiper.css')//引入node-modules里面的样式
// import 'swiper/dist/css/swiper.css';
export default business.controller('homePageCtrl',['$scope','$state',function($scope,$state){
    $scope.swiperItemData=[{
        imageUrl: require( '@/components/image/vue.jpg'),
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
            autoplay: 3000,//可选选项，自动滑动
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
    // // /index/tag-system/tag-manage/query-task
    // function spliteStr(pathStr){
    //     let pathArr=[];
    //     pathStr.split('/').reduce((total, currentValue)=>{
    //         total=`${total}/${currentValue}`;
    //         pathArr.push(total);
    //         return total;
    //     })
    //     console.log(pathArr);
    //     return pathArr;
    // }
    // spliteStr('/index/tag-system/tag-manage/query-task')
    // let arr=[]
    // function splitStrClosure(pathStr){
    //     let index=0;
    //     let pathArr1=pathStr.split('/')
    //     console.log(index)
    //     return function closure(){
    //         index++;
    //         console.log(index)
    //         let pathArr3=`/${pathArr2}/${pathArr1[index]}`;
    //         return arr.push(pathArr3)

    //     }
    // }
    // let splitStrClosure1=splitStrClosure('/index/tag-system/tag-manage/query-task');
    // splitStrClosure1();
    // splitStrClosure1();
    // splitStrClosure1();
    // splitStrClosure1();
    // console.log(arr)

}]);