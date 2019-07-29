/**
 * 公共弹窗
 */
define(['angular'
], function (angular) {
    'use strict';
    angular.module("utilities.service", ['utilities.provider', 'utilities.template'])
        .service('promptServ', ['$http', '$q', '$modal', '$rootScope',
            function ($http, $q, $modal, $rootScope) {
                var tpl = "<div class=\"layer_mask\"></div>\n" +
                    "<div class=\"layer_preAssess newPreAssess\">\n" +
                    "    <div class=\"preAssessTop\" >\n" +
                    "        <h2>{{title}}</h2>\n" +
                    "        <i ng-if='closeBtn' ng-click=\"cancel()\" class=\"preClose\"></i>\n" +
                    "    </div>" +
                    "    <div class=\"layerMain\">\n" +
                    "        <span class=\"pimessage\">{{tipMessage}}</span>\n" +
                    "        <div class=\"layer_tipBtn\">\n" +
                    "            <span  ng-class=\"(t.btnClass?t.btnClass:layerN)+' layer' + $index\" ng-repeat='t in btn' ng-click=\"callback($index)\" ng-bind='t.btnName'></span>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</div>";

                var callbackHandel = function (options, argumen) {
                    var callbackArr = [];
                    if (argumen.length > 1) {
                        for (var i = 1; i < argumen.length; i++) {
                            callbackArr.push(argumen[i]);
                        }
                    }
                    options.callbackArr = callbackArr;
                    options.closeBtn = options.closeBtn === undefined ? true : options.closeBtn;
                    options.title = options.title === undefined ? "温馨提示" : options.title
                };
                //提示弹框
                var showTipDialog = function (options) {
                    var ModalInstanceCtrl = function ($scope, $modalInstance) {
                        $scope.cancel = function () {
                            $modalInstance.close();
                            if(typeof options.closeCallback =="function"){
                                options.closeCallback()
                            }
                        };
                        $scope.callback = function (index) {
                            $modalInstance.close();
                            if (typeof options.callbackArr[index] === 'function') {
                                options.callbackArr[index]()
                            }
                        };
                        var init = function () {
                            $scope.tipMessage = options.msg;
                            $scope.title = options.title;
                            $scope.closeBtn = options.closeBtn;
                            $scope.btn = options.btn;
                        };
                        init();
                    };
                    ModalInstanceCtrl.$inject = ['$scope', '$modalInstance'];
                    var tipModalInstance = $modal.open({
                        backdrop: false,
                        animation: true,
                        template: tpl,
                        controller: ModalInstanceCtrl,
                        size: 'sm'
                    });
                };
                /**
                 *
                 * @param options object
                 * title:"标题"
                 * msg:"内容"
                 * closeBtn: Boolean 默认true 显示关闭按钮 false不显示
                 * closeCallback: 关闭按钮关闭时的回调
                 * title:"标题"
                 * title:"标题"
                 */

                angular.alert = function (options) {
                    callbackHandel(options, arguments);
                    if (options.btn) {
                        options.btn = typeof options.btn === 'string' ? [options.btn] : options.btn;
                    } else {
                        options.btn = ["确 认"];
                    }
                    options.btn[0] = {btnName: options.btn[0], btnClass: "layerY"};
                    showTipDialog(options)
                };
                angular.confirm = function (options) {
                    var arg = angular.copy(arguments);
                    if(arguments.length === 2){
                        arg[2] = arg[1];
                        arg[1] = '';
                    }
                    arg.length = 3;
                    callbackHandel(options, arg);
                    options.btn = options.btn ? options.btn : ["取 消", "确 认"];

                    options.btn[0] = {btnName: options.btn[0], btnClass: "layerN"};
                    options.btn[1] = {btnName: options.btn[1], btnClass: "layerY"};
                    showTipDialog(options)
                };
                angular.open = function (options) {
                    callbackHandel(options, arguments);
                    if (options.btn) {
                        options.btn = typeof options.btn === 'string' ? [options.btn] : options.btn;
                    } else {
                        options.btn = ["确 认"];
                    }
                    if (options.btnClass) {
                        for (var i = 0; i < options.btnClass; i++) {
                            options.btn[i] = {btnName: options.btn[0], btnClass: options.btnClass[i]}
                        }
                    }
                    showTipDialog(options)
                };
            }])
        // .service('apiServ',function () {
        //     //  将数组转换为对象以 kideCode 作为key
        //     var listToObject = function (list) {
        //         var obj ={};
        //         for (var i=0;i<list.length;i++){
        //             obj[list[i].kindCode] = list[i]
        //         }
        //         return obj
        //     };
        //     return{
        //         listToObject: listToObject
        //     }
        // })
    .service('interimServ',['finder',function (finder) {
        var initUUidState = function(uuid){
            var conditionDto = {};
            conditionDto.uniqueID = uuid;
            finder.post("initUUidState", conditionDto);
        };
        return {
            initUUidState:initUUidState
        }
    }])
    ;
});
