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
                    routerUrl: "homePage"
                },
                {
                    title:'文档',
                    list:[
                        {title:'VUE文档'},
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'}
                    ]
                },
                {
                    title:'一级标题3',
                    list:[
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'}
                    ]
                },
                {
                    title:'一级标题4',
                    list:[
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'}
                    ]
                },
                {
                    title:'一级标题5',
                    list:[
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'}
                    ]
                },
                {
                    title:'一级标题6',
                    list:[
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'}
                    ]
                }
            ]
            $scope.showOrGo=function(item,$index){
                if (item.list) {
                    if($scope.navList.some((val,index)=>{return val.checked&&index!=$index})){
                        $scope.navList.forEach(val => {
                            val.checked=false;
                        });
                    }
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