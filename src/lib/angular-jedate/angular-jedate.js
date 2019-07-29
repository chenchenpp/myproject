// define([
//     'jedate',
//     'angular'
// ],function(jeDate,angular){
//     angular.module("angular-jedate", [])
//         .directive('jedate', ['$timeout', function ($timeout) {
//             return {
//                 restrict: "A",
//                 require:"ngModel",
//                 scope:{
//                     'ngModel':'='
//                 },
//                 link: function (scope, element, attrs) {
//                     var id = element[0].id;
//                     var options = {
//                         dateCell:"#" + id
//                     };
//                     options.minDate = attrs.minDate;//最小日期
//                     options.maxDate = attrs.maxDate;//最大日期
//                     // options.isClear = false;//默认不展示清空按钮
//                     options.isTime = false;//默认关闭时间选择
//                     options.festival = true;//默认显示节日
//                     options.skinCell = attrs.skincell;//风格调用，CSS中增加了3种风格（红、绿、蓝）
//                     options.format = attrs.format;//日期格式设置( YYYY-MM-DD hh:mm:ss 设置 年-月-日 时:分:秒; YYYY-MM-DD 设置 年-月-日)
//                     options.clearRestore = false; //清空输入框，返回预设日期，输入框非空的情况下有效
//                     options.choosefun=function(elem, val){ //选中回调
//                         scope.$apply(function(){
//                             scope.ngModel=val;
//                         })
//                     };
//                     options.clearfun = function () { //清空回调
//                         scope.$apply(function(){
//                             scope.ngModel="";
//
//                             //错误校验
//                             errorCheck();
//                         })
//                     };
//
//                     options.okfun =function(elem, val){ //确定回调
//                         scope.$apply(function(){
//                             scope.ngModel=val;
//                         })
//                     };
//
//                     //错误校验
//                     var errorCheck = function () {
//
//                         //获取字符串长度 start
//                         var jmz = {};
//                         jmz.GetLength = function(str) {
//                             ///获得字符串实际长度，中文2，英文1
//                             ///要获得长度的字符串
//                             if(angular.isUndefined(str)) {
//                                 return 0;
//                             } else {
//                                 var realLength = 0, len = str.length, charCode = -1;
//                                 for (var i = 0; i < len; i++) {
//                                     charCode = str.charCodeAt(i);
//                                     if (charCode >= 0 && charCode <= 128){
//                                         realLength += 1;
//                                     }else{
//                                         realLength += 2;
//                                     }
//                                 }
//                                 return realLength;
//                             }
//                         };
//                         //获取字符串长度 end
//                         var errorText=$(element).parent().find('span.validation-errorText');
//
//                         $.each(errorText,function(index,error){
//                             if(jmz.GetLength(scope.ngModel) == 0){                          //必填项验证
//                                 errorText[index].innerHTML= element[0].attributes['warn-text'].nodeValue + '为必填项';
//                                 error.style.display='flex';
//                                 error.style.position='relative';
//                                 error.style.left='-30px';
//                                 error.style.top='-10px';
//                             } else{
//                                 error.style.display="none";
//                             }
//                         });
//                     };
//                     $timeout(function(){
//                         jeDate(options);
//                     },1);
//                 }
//             }
//         }]);


define([
    'jedate',
    'angular'
],function(jeDate){

    angular.module("angular-jedate", [])
        .directive('jedate', ['$timeout', '$parse', function ($timeout, $parse) {

            /**
             * 对外放出一个接口,触发指令函数
             * @param waitEvent
             * @param scope
             */
            var validation = function (waitEvent, scope) {
                if (waitEvent) {
                    $timeout(function () {
                        waitEvent(scope.$parent);
                    }, 100)
                }
            };

            return {
                restrict: "A",
                require:"ngModel",
                scope:{
                    'ngModel':'=',
                    'minDate':'@',
                    'maxDate':'@'
                },
                link: function (scope, element, attrs, ctrl) {
                    var id = attrs.id;
                    var oldModel = scope.ngModel;
                    var DATE_VALID1 = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30))|(02-(0[1-9]|1[0-9]|2[0-8])))$/;
                    var DATE_VALID2 = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30))|(02-(0[1-9]|1[0-9]|2[0-9])))$/;
                    var options = {
                        dateCell:"#" + id
                    };
                    if(attrs.myBlur){
                        var blurCallBack=$parse(attrs.myBlur);
                    }

                    var changeCallBack = $parse(attrs.ngChange);

                    /**
                     * 日期格式校验
                     * @param regex 正则
                     * @param data  当前日期
                     * @param attrs attrs
                     * @param oldModel 之前日期
                     * @returns {*}
                     */
                    var validationData=function(regex,data,attrs,oldModel){
                        //if(regex.test(data)){
                        //    //if(data<attrs.minDate){
                        //    //    alert('日期小于最小日期');
                        //    //    data = oldModel;
                        //    //}else if(data>attrs.maxDate){
                        //    //    //alert('日期大于最大日期');
                        //    //    data = oldModel;
                        //    //}
                        //}else{
                        //    //alert('日期格式不正确');
                        //    data = oldModel;
                        //}
                        //console.log(data,oldModel)
                        return data;
                    };

                    //检测手动录入模式
                    // ctrl.$parsers.unshift(function(){
                    //     scope.$parent.inputStatus.manual=true;
                    // });
                    options.minDate = attrs.minDate;//最小日期
                    options.maxDate = attrs.maxDate;//最大日期
                    options.isClear = false;//默认不展示清空按钮
                    options.isToday = attrs.isToday === "false"?false:true;//不显示今天按钮

                    options.isTime = false;//默认关闭时间选择
                    options.festival = false;//默认显示节日
                    options.skinCell = attrs.skincell;//风格调用，CSS中增加了3种风格（红、绿、蓝）
                    options.format = attrs.format;//日期格式设置( YYYY-MM-DD hh:mm:ss 设置 年-月-日 时:分:秒; YYYY-MM-DD 设置 年-月-日)
                    options.clearRestore = false; //清空输入框，返回预设日期，输入框非空的情况下有效
                    options.choosefun=function(elem, val){ //选中回调

                        scope.$apply(function(){
                            scope.ngModel=val;

                            validation(changeCallBack, scope);

                        });
                        if(blurCallBack)
                            blurCallBack(scope.$parent.$parent);
                    };

                    options.clearfun = function () { //清空回调
                        scope.$apply(function(){
                            scope.ngModel="";
                            validation(changeCallBack, scope);
                        })
                    };

                    options.okfun =function(elem, val){ //确定回调
                        scope.$apply(function(){
                            scope.ngModel=val;
                            validation(changeCallBack, scope);
                        })
                    };

                    element.on('blur',function(){
                        var viewValue = ctrl.$viewValue;
                        if(!viewValue)
                            return;
                        var date =viewValue.replace(/-|\s|:|\//g,'');
                        date= date.substring(0, 4) + '/' + date.substring(4, 6) + '/' + date.substring(6, 8);
                        if(date.substring(0,4)%4==0){
                            date = validationData(DATE_VALID2,date,attrs,oldModel);
                        }else{
                            date = validationData(DATE_VALID1,date,attrs,oldModel);
                        }
                        scope.$apply(function(){
                            scope.ngModel=date;
                        })
                    });

                    scope.$watch('maxDate +  minDate',function (n,o) {
                        if(n&&!o){
                            if (scope.minDate) {
                                options.minDate = scope.minDate;//最小日期
                            }
                            if(scope.maxDate){
                                options.maxDate = scope.maxDate;//最大日期
                            }
                            $(options.dateCell).jeDate(options);
                        }
                    });

                    $timeout(function(){
                        $(options.dateCell).jeDate(options);
                    },1);
                }
            }
        }]);

});
