import angular from 'angular';
import "./templateCss/menu.css"
import { val } from '@uirouter/core';
var utilitiesDirctive=angular.module('utilitiesDirctive',[])
utilitiesDirctive.directive('menu',[function() {
    return {
        restrict: 'EA',
        template: require('./templatePage/menu.html'),
        replace: true,
        scope: {
            conf: '='
        },
        controller: ['$scope','$state',function($scope,$state){
            $scope.drawDownFlag=false;
            $scope.navList = [
                {
                    title:"首页",
                    routerUrl: "homePage",
                },{
                    title: "Canvas小狗",
                    routerUrl: 'canvasDog'
                },{
                    title: '骨架屏',
                    routerUrl: 'skeletonScreen'
                },{
                    title:'VUE',
                    list:[
                        {title:'VUE文档'},
                        {title:'VUE项目'},
                        {title:'VUE视频'},
                    ],
                    isChooseMenu: true
                },
                {
                    title:'webpack',
                    list:[
                        {title:'webpack文档'},
                        {title:'webpack项目'},
                        {title:'webpack视频'},
                    ],
                    isChooseMenu: true
                },
                {
                    title:'nodeJS',
                    list:[
                        {title:'nodeJS文档'},
                        {title:'nodeJS项目'},
                        {title:'nodeJs视频'},
                    ],
                    isChooseMenu: true
                },
                {
                    title:'微信小程序',
                    list:[
                        {title:'微信小程序文档'},
                        {title:'微信小程序项目'},
                        {title:'微信小程序视频'},
                    ],
                    isChooseMenu: true
                },
                {
                    title:'typescript',
                    list:[
                        {title:'typescript文档'},
                        {title:'typescript项目'},
                        {title:'typescript视频'},
                    ],
                    isChooseMenu: true
                }
            ]
            $scope.showOrGo=function(item,$index){
                if (item.list) {
                    if($scope.navList.some((val,index)=>{return val.checked&&index!=$index})){
                        $scope.navList.forEach(val => {
                            val.checked=false;
                        });
                    }
                    item.isChooseMenu=!item.isChooseMenu;
                    item.checked=!item.checked;
                } else {
                    $state.go(item.routerUrl)
                }
            }
        }],
        link: function (scope, element, attrs) {
            console.log('我是菜单')
           
        }
           
    }
}])
export default utilitiesDirctive;