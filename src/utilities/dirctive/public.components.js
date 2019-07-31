import angular from 'angular';
import './templateCss/menu.less'
var utilitiesDirctive=angular.module('utilitiesDirctive',[])
utilitiesDirctive.directive('menu',[function() {
    return {
        restrict: 'EA',
        template: require('./templatePage/menu.html'),
        replace: true,
        scope: {
            conf: '='
        },
        controller: ['$scope',function($scope){
            $scope.navList = [
                {
                    title:"一级标题1",
                    list:[
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'},
                        {title:'二级标题'}
                    ]
                },
                {
                    title:'一级标题2',
                    list:[
                        {title:'二级标题'},
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
        }],
        link: function (scope, element, attrs) {
            console.log('我是菜单')
           
        }
           
    }
}])
export default utilitiesDirctive;