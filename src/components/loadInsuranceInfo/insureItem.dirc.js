define([], function () {
    return ['finder', '$compile', '$location', '$anchorScroll', function (finder, $compile, $location, $anchorScroll) {
        return{
            restrict: 'E',
            template: '<div class="terms-box" id="insure">' +
            '                <p><i  ng-class="{true:\'onMark\',false:\'\'}[curMark==\'markFlag\']" ng-click="onItem()" ></i>本人已阅读并同意以下内容，确认所填写投保单信息真实、完整、准确。</p>' +
            '                <div class="terms">' +
            '                    <a ng-click="onItem(\'baoxianItems\')" href="javaScript:void(0)">《保险条款》</a>、' +
            '                    <a ng-click="onItem(\'relieShuomingshu\')" href="javaScript:void(0)">《免责事项说明书》</a>、' +
            '                    <a ng-click="onItem(\'specialShengming\')" href="javaScript:void(0)">《特别声明》</a>' +
            '                </div>' +
            '            </div>'+
            '<div ng-show="layer_insureItem" id="layer_insureItem"></div>',
            // replace: true,
            scope:{},

            link: function ($scope,attrs,element){
                //同意
                $scope.curMark="";
                $scope.verifyAgreement=0;
                // 进度条样式
                $scope.insureItemProgress = {};
                $scope.insureItemProgress.style = {"width":"0px","border-radius": "2px 0 0 2px"};
                $scope.insureItemProgress.cursor = "not-allowed";
                $scope.onItem=function (d) {
                    if($scope.curMark=="markFlag"){
                        $scope.curMark="";
                    }else {
                        requireItem(function () {
                            if(d=="baoxianItems" || d==undefined){
                                $scope.itemsNav=true;
                                $scope.littleNumItem=9;   //二级导航默认展示第一个
                                $scope.numItem='baoxianItems';   //默认选中第一个红色样式
                            }else{
                                $scope.itemsNav=false;  //保险条款下面二级导航
                                $scope.numItem=d;   //默认选中红色样式
                            }
                            $scope.layer_insureItem=true;
                            $location.hash(d);
                            $anchorScroll();
                        })
                    }
                };

                // var $scrollTop = $(".layer-content").height();

                $scope.closeItem=function () {
                    $scope.layer_insureItem=false;
                };
                $scope.agreeSure=function () {
                    if(!isNaN(parseFloat($scope.insureItemProgress.style.width))&&parseFloat($scope.insureItemProgress.style.width)>=93){
                        $scope.layer_insureItem=false;
                        $scope.curMark="markFlag";
                        $scope.$emit("agreeSure")
                    }

                };
                $scope.itemsNav=true;
                $scope.insureItemDetail=function (d) {
                    requireItem(function () {
                        if(isNaN(d)){
                            if(d=="baoxianItems"){
                                $scope.itemsNav=true;
                                $scope.littleNumItem=9;   //二级导航默认展示第一个
                                $scope.numItem='baoxianItems';   //默认选中第一个红色样式
                            }else{
                                $scope.itemsNav=false;  //保险条款下面二级导航
                                $scope.numItem=d;   //默认选中红色样式
                            }
                        }else{
                            $scope.littleNumItem=d;
                        }
                        $location.hash(d);
                        $anchorScroll();
                        $scope.layer_insureItem=true;
                    })
                };
                var requireItem = function (callback) {
                    if(!$("#layer_insureItem").children().length){
                        finder.get('insureItem').then(function (text) {
                            $("#layer_insureItem").append($compile(text.data)($scope));
                            callback();
                            $(".layer-content").on('scroll', function (event) {
                                var $this = $(this);
                                var scrollTop = $this.scrollTop()+340;
                                var curProgress = (scrollTop/this.scrollHeight)*93;
                                curProgress = curProgress.toFixed(1);
                                if(curProgress> parseFloat($scope.insureItemProgress.style.width)){
                                    // 边界处理
                                    curProgress = curProgress>=92?93:curProgress;
                                    $scope.$apply(function () {
                                        if(curProgress==93){
                                            $scope.insureItemProgress.style["border-radius"] = "2px";
                                            $scope.insureItemProgress.cursor = 'pointer';
                                        }
                                        $scope.insureItemProgress.style.width = curProgress +'px'
                                    })
                                }
                                event.stopPropagation();
                                event.preventDefault()

                            })
                        })
                    } else {
                        callback()
                    }
                }
            }
        }
    }]
});