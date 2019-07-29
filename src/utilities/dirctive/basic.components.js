/**
 * 自定义指令 20171220
 */
define(['angular','jedate'], function (angular, config, codes) {
    return angular.module('utilities.dirctive', [
        'utilities.constant'
    ])

        .directive('tmPagination',[function() {
            return {
                restrict: 'EA',
                template: '<div class="page-list">' +
                '<ul class="pagination" ng-show="conf.totalItems > 0">' +
                '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span>&laquo;</span></li>' +
                '<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
                'ng-click="changeCurrentPage(item)">' +
                '<span>{{ item }}</span>' +
                '</li>' +
                '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span>&raquo;</span></li>' +
                '</ul>' +
                '<div class="page-total" ng-show="conf.totalItems > 0">' +
                // '每页&nbsp;&nbsp;<select ng-model="conf.itemsPerPage" ng-options="option for option in conf.perPageOptions " ng-change="changeItemsPerPage()"></select>' +
                // '&nbsp;&nbsp;条/共<strong>{{ conf.totalItems }}</strong>条 ' +
                // '跳转至&nbsp;<input type="text" ng-model="jumpPageNum" ng-keyup="jumpPageKeyUp($event)"/>' + '<span>&nbsp;页</span>' +
                // '</div>' +
                '<div class="no-items" ng-show="conf.totalItems <= 0">暂无数据</div>' +
                '</div>',
                replace: true,
                scope: {
                    conf: '='
                },
                link: function (scope, element, attrs) {

                    var conf = scope.conf;

                    // 默认分页长度
                    var defaultPagesLength = 9;

                    // 默认分页选项可调整每页显示的条数
                    var defaultPerPageOptions = [10, 15, 20, 30, 50];

                    // 默认每页的个数
                    var defaultPerPage = 15;

                    // 获取分页长度
                    if (conf.pagesLength) {
                        // 判断一下分页长度
                        conf.pagesLength = parseInt(conf.pagesLength, 10);

                        if (!conf.pagesLength) {
                            conf.pagesLength = defaultPagesLength;
                        }

                        // 分页长度必须为奇数，如果传偶数时，自动处理
                        if (conf.pagesLength % 2 === 0) {
                            conf.pagesLength += 1;
                        }

                    } else {
                        conf.pagesLength = defaultPagesLength
                    }

                    // 分页选项可调整每页显示的条数
                    if (!conf.perPageOptions) {
                        conf.perPageOptions = defaultPagesLength;
                    }

                    // pageList数组
                    function getPagination(newValue, oldValue) {

                        // conf.currentPage
                        if (conf.currentPage) {
                            conf.currentPage = parseInt(scope.conf.currentPage, 10);
                        }

                        if (!conf.currentPage) {
                            conf.currentPage = 1;
                        }

                        // conf.totalItems
                        if (conf.totalItems) {
                            conf.totalItems = parseInt(conf.totalItems, 10);
                        }

                        // conf.totalItems
                        if (!conf.totalItems) {
                            conf.totalItems = 0;
                            return;
                        }

                        // conf.itemsPerPage
                        if (conf.itemsPerPage) {
                            conf.itemsPerPage = parseInt(conf.itemsPerPage, 10);
                        }
                        if (!conf.itemsPerPage) {
                            conf.itemsPerPage = defaultPerPage;
                        }

                        // numberOfPages
                        conf.numberOfPages = Math.ceil(conf.totalItems / conf.itemsPerPage);

                        // 如果分页总数>0，并且当前页大于分页总数
                        if (scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages) {
                            scope.conf.currentPage = scope.conf.numberOfPages;
                        }

                        // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                        var perPageOptionsLength = scope.conf.perPageOptions.length;

                        // 定义状态
                        var perPageOptionsStatus;
                        for (var i = 0; i < perPageOptionsLength; i++) {
                            if (conf.perPageOptions[i] == conf.itemsPerPage) {
                                perPageOptionsStatus = true;
                            }
                        }
                        // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                        if (!perPageOptionsStatus) {
                            conf.perPageOptions.push(conf.itemsPerPage);
                        }

                        // 对选项进行sort
                        conf.perPageOptions.sort(function (a, b) {
                            return a - b
                        });


                        // 页码相关
                        scope.pageList = [];
                        if (conf.numberOfPages <= conf.pagesLength) {
                            // 判断总页数如果小于等于分页的长度，若小于则直接显示
                            for (i = 1; i <= conf.numberOfPages; i++) {
                                scope.pageList.push(i);
                            }
                        } else {
                            // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                            // 计算中心偏移量
                            var offset = (conf.pagesLength - 1) / 2;
                            if (conf.currentPage <= offset) {
                                // 左边没有...
                                for (i = 1; i <= offset + 1; i++) {
                                    scope.pageList.push(i);
                                }
                                scope.pageList.push('...');
                                scope.pageList.push(conf.numberOfPages);
                            } else if (conf.currentPage > conf.numberOfPages - offset) {
                                scope.pageList.push(1);
                                scope.pageList.push('...');
                                for (i = offset + 1; i >= 1; i--) {
                                    scope.pageList.push(conf.numberOfPages - i);
                                }
                                scope.pageList.push(conf.numberOfPages);
                            } else {
                                // 最后一种情况，两边都有...
                                scope.pageList.push(1);
                                scope.pageList.push('...');

                                for (i = Math.ceil(offset / 2); i >= 1; i--) {
                                    scope.pageList.push(conf.currentPage - i);
                                }
                                scope.pageList.push(conf.currentPage);
                                for (i = 1; i <= offset / 2; i++) {
                                    scope.pageList.push(conf.currentPage + i);
                                }

                                scope.pageList.push('...');
                                scope.pageList.push(conf.numberOfPages);
                            }
                        }

                        scope.$parent.conf = conf;
                    }

                    // prevPage
                    scope.prevPage = function () {
                        if (conf.currentPage > 1) {
                            conf.currentPage -= 1;

                            getPagination();
                            if (typeof  conf.onChange == 'function') {
                                conf.onChange();
                            }
                        }
                    };

                    // nextPage
                    scope.nextPage = function () {
                        if (conf.currentPage < conf.numberOfPages) {
                            conf.currentPage += 1;
                            getPagination();
                            if (typeof  conf.onChange == 'function') {
                                conf.onChange();
                            }
                        }
                    };

                    // 变更当前页
                    scope.changeCurrentPage = function (item) {

                        if (item == '...') {
                            return;
                        } else {
                            conf.currentPage = item;
                            getPagination();
                            // conf.onChange()函数
                            if (conf.onChange) {
                                conf.onChange();
                            }
                        }
                    };

                    // 修改每页展示的条数
                    scope.changeItemsPerPage = function () {

                        // 一发展示条数变更，当前页将重置为1
                        conf.currentPage = 1;

                        getPagination();
                        // conf.onChange()函数
                        if (conf.onChange) {
                            conf.onChange();
                        }
                    };

                    // 跳转页
                    scope.jumpToPage = function () {
                        num = scope.jumpPageNum;
                        if (num.match(/\d+/)) {
                            num = parseInt(num, 10);

                            if (num && num != conf.currentPage) {
                                if (num > conf.numberOfPages) {
                                    num = conf.numberOfPages;
                                }

                                // 跳转
                                conf.currentPage = num;
                                getPagination();
                                // conf.onChange()函数
                                if (conf.onChange) {
                                    conf.onChange();
                                }
                                scope.jumpPageNum = '';
                            }
                        }

                    };

                    scope.jumpPageKeyUp = function (e) {
                        var keycode = window.event ? e.keyCode : e.which;

                        if (keycode == 13) {
                            scope.jumpToPage();
                        }
                    }

                    scope.$watch('conf.totalItems', function (value, oldValue) {

                        // 在无值或值相等的时候，去执行onChange事件
                        // if (!value || value == oldValue) {
                        //
                        //     if (conf.onChange) {
                        //
                        //         conf.onChange();
                        //     }
                        // }
                        getPagination();
                    })

                }
            }
        }])
        .directive("enlarge", [
            '$timeout', '$compile',
            function ($timeout, $compile) {
                return {
                    require: 'ngModel',
                    restrict: 'A',
                    scope: {
                        "ngModel": '='
                    },
                    compile: function () {
                        return function ($scope, element, attrs, ctrl) {
                            ctrl.$formatters.push(function (val) {
                                $scope.enlargeText = ctrl.$viewValue;
                                return val;
                            });
                            ctrl.$parsers.push(function (val) {
                                $scope.enlargeText = ctrl.$viewValue;
                                return val;
                            });
                            var str = '';
                            str += '<div class="enlarge" ng-show="enlargeText" ng-bind="enlargeText';
                            str += attrs.enlarge ? ' | ' + attrs.enlarge : '';
                            str += '" style="display: none;"></div>';
                            var compileFn = $compile(str);
                            var enlargeEl = $(compileFn($scope));
                            var ele = $(element);
                            ele.parent().append(enlargeEl);
                            ele.focus(function () {
                                enlargeEl.show();
                            });
                            ele.blur(function () {
                                enlargeEl.hide();
                            });

                        }
                    }
                }
            }
        ])
        .directive("emailTipDirc", [
            '$timeout', '$compile', 'codesConstant',
            function ($timeout, $compile, codesConstant) {
                return {
                    require: 'ngModel',
                    restrict: 'A',
                    scope: {
                        "ngModel": '='
                    },
                    link: function ($scope, element, attrs, ctrl) {
                        var tpl = $compile("<ul  id='eamilSelecte' class=\"mailSelect hiddenlist\" ng-hide='filterEmail.length==0||blurHide'>\n" +
                            "<li ng-class=\"{active:active == item}\" ng-repeat=\"item in filterEmail track by $index\" ng-bind=\"item\" ng-click=\"emailClick(item)\"></li></ul>")($scope);
                        $(element).after(tpl);
                        $scope.active = "";
                        $scope.filterEmail = [];
                        $scope.blurHide = false;
                        var emailHost = codesConstant.emailHost;
                        $(element).keyup(function (event) {
                            var inputValue = $(this).val();
                            $scope.$apply(function () {
                                if (event.keyCode === 13) {
                                    $scope.ngModel = $scope.active;
                                    $scope.filterEmail.length = 0;
                                    return
                                }
                                if (event.keyCode === 38 || event.keyCode === 40) {
                                    for (var i = 0; i < $scope.filterEmail.length; i++) {
                                        if($scope.filterEmail[i] === $scope.active){
                                           var len =   $scope.filterEmail.length;
                                            var  num = event.keyCode === 40?i+1:i-1;
                                            num = num> len-1?num=0:num;
                                            num = num<0?num =len-1:num;
                                            $scope.active = $scope.filterEmail[num];
                                            $("#eamilSelecte")[0].scrollTop = (num-4)*24
                                            break
                                        }
                                    }
                                } else {
                                    if (inputValue.indexOf("@") > -1) {
                                        $scope.filterEmail = [];
                                        for (var i = 0; i < emailHost.length; i++) {
                                            $scope.filterEmail.push(inputValue.split("@")[0] + "@" + emailHost[i])
                                        }
                                    }
                                    if (inputValue.split("@")[1]) {
                                        $scope.filterEmail = $scope.filterEmail.filter(function (val) {
                                            return val.indexOf(inputValue) == -1 ? false : true
                                        })
                                    }
                                    $scope.active = $scope.filterEmail[0]
                                }

                            })
                        })
                        //     .blur(function (event) {
                        //     $scope.$apply(function () {
                        //         $scope.blurHide = true;
                        //     })
                        // })
                            .focus(function (event) {
                            $scope.$apply(function () {
                                $scope.blurHide = false;
                            })
                        });
                        $scope.emailClick=function (item) {
                          var  $event={};
                            $scope.ngModel = item;
                            $scope.filterEmail.length = 0;
                            if (attrs.customValidator) {
                                $timeout(function () {
                                    $scope.$emit('validCurrent')
                                })
                            };
                            if (attrs.ngBlur) {
                                scope.$parent.$evalAsync(attrs.ngBlur)
                            }
                        };
                        $scope.$on('$destroy', function () {
                            $(element).off();
                        });
                    }
                }

            }
        ])

        /**
         * @ngdoc directive
         * @name $$cherry.directive:radio
         * @description
         * 提供代码的单选
         * @restrict E
         * @scope
         * @param {string} data 单选数据
         * @example
         <example module="cherry.directive">
         <file name="index.html">
         <radio ng-model="queryDto.radioText" data="{{radioList}}"></radio>
         <radio ng-model="queryDto.radioText" base-code="radioList"></radio>
         </file>
         </example>
         */
        .directive('radio', ['$timeout', 'codesConstant', function ($timeout, codesConstant) {
            return {
                required: '^ngModel',
                restrict: 'E', // 指令是一个元素 (并非属性)
                scope: { // 设置指令对于的scope
                    data: '@data',
                    ngModel: '=',
                    ngDisabled: '='
                },
                template:
                '<div class="radio-box">' +
                '<label class="radio-label" ng-repeat="radio in listData" ng-class="{\'radio-checked\':radio.code == ngModel,\'is-disabled\':ngDisabled || radio.disabled}" ng-click="toggleRadio(radio.code,$event,$index)">' +
                '<span class="radio-main" ng-hide="listData.length === 1 ">' +
                '<span></span>' +
                '</span>' +
                '<em ng-bind="radio.name"></em>' +
                '</label>' +
                '</div>' +
                '<input ng-model="ngModel" class="hide">',
                compile: function () {
                    return function (scope, element, attrs, ngCtrl) {
                        scope.toggleRadio = function (code, $event, index) {
                            $event.preventDefault();
                            if (scope.ngDisabled || scope.listData[index].disabled == true) {
                                return false;
                            }
                            console.log(code);
                            scope.ngModel = code
                            if (attrs.ngChange) {
                                scope.$parent.$evalAsync(attrs.ngChange)
                            }
                            return false;

                        };
                        var init = function () {
                            if (attrs.data) {
                                scope.listData = JSON.parse(scope.data);
                                // scope.data = new Function("return this.$parent."+attrs.data).call(scope);
                            } else {
                                if (attrs.baseCode) {
                                    scope.listData = angular.copy(codesConstant[attrs.baseCode]);
                                }
                            }
                        };
                        var timer = $timeout(function () {
                            init();
                            if (!scope.listData || scope.listData.length == 0 || attrs.watchData !== undefined) {
                                scope.$watch("data", function (n, o) {
                                    console.log(n, o);
                                    if (n && n.length > 0) {
                                        scope.listData = JSON.parse(scope.data);
                                        if (attrs.watchData !== undefined) { // 根据code去重
                                            var obj = {};
                                            for (var i = 0; i < scope.listData.length; i++) {
                                                if (obj[scope.listData[i].code]) {
                                                    scope.listData.splice(i, 1);
                                                    i--
                                                } else {
                                                    obj[scope.listData[i].code] = scope.listData[i]
                                                }
                                            }
                                            obj = null
                                        }
                                    }
                                })
                            }
                            clearTimeout(timer);
                        }, 200);


                    };
                }
            }
        }])
        /**
         * @ngdoc directive
         * @name $$cherry.directive:switch
         * @description
         * 单选开关
         * @restrict E
         * @scope
         * @param {string} data 开关初始化数据
         * @example
         <example module="directive">
         <file name="index.html">
         <switch ng-model="queryDto.radioText" data="{{radioList}}"></switch>
         <switch ng-model="queryDto.radioText" ng-disabled="variable" ng-change="" base-code="radioList"></switch>
         </file>
         </example>
         */
        .directive('switch', ['$timeout', 'codesConstant', function ($timeout, codesConstant) {
            return {
                required: '^ngModel',
                restrict: 'E', // 指令是一个元素 (并非属性)
                scope: { // 设置指令对于的scope
                    data: '@data',
                    ngModel: '=',
                    ngDisabled: '='
                },
                template:
                "<div class=\"yesno No\" " +
                "ng-class=\"{true:'Yes',false:'No'}[ngModel == listData[0].code]\"" +
                "ng-click=\"toggleRadio($event)\">" +
                    "<span class='yuan'></span>"+
                "   <p ng-bind=\"ngModel == listData[0].code?listData[0].name:listData[1].name\"></p>" +
                "</div>"+
                "<input type='hidden' ng-model='ngModel'/>",
                compile: function () {
                    return function (scope, element, attrs, ngCtrl) {
                        scope.toggleRadio = function ($event) {
                            $event.preventDefault();
                            if (scope.ngDisabled) {
                                return false;
                            }
                            scope.ngModel = scope.ngModel == scope.listData[0].code?scope.listData[1].code:scope.listData[0].code;
                            if (attrs.ngChange) {
                                scope.$parent.$evalAsync(attrs.ngChange)
                            }
                            return false;

                        };
                        var init = function () {
                            if (attrs.baseCode) {
                                scope.listData = angular.copy(codesConstant[attrs.baseCode]);
                            } else if(scope.data) {
                                scope.listData = JSON.parse(scope.data);
                            }
                        };
                        var timer = $timeout(function () {
                            init();
                            if (!scope.listData || scope.listData.length == 0) {
                                scope.$watch("data", function (n, o) {
                                    console.log(n, o);
                                    if (n && n.length > 0) {
                                        scope.listData = JSON.parse(scope.data);
                                    }
                                })
                            }
                            clearTimeout(timer);
                        }, 200);

                    };
                }
            }
        }])

        //20171220 qq 下拉框测试
        .directive('dropDown', ['$timeout', function ($timeout) {
            return {
                restrict: 'E',
                require: "^ngModel",
                // replace: true,
                scope: {
                    ngModel: '=', //// 默认选中值
                    data: '=',  //// 数据集如['张三','李四','王五']
                    code: '@',
                    name: '@',
                    onSelect: '&onSelect',   //// 选项变化时事件
                    ngDisabled: '='       //// 是否显示，支持表达式
                },
                template: '<div class="ddl" ng-mouseleave="toggle()">'
                + '<div class="ddlTitle"  ng-click="switchFun()">' +
                '<input id="check-input" ng-class="{\'disabled\':ngDisabled}" readonly  ng-model="cur.name"><i class="ddliImg"></i>'
                + '</div>'
                + '<ul class="mockLi" >'
                + ' <li ng-repeat="item in list" ng-click="check(item)" ng-class="{\'active\': ngModel==item.code}" ng-bind="item.name"></li>'
                + '</ul>'
                + '</div>'
                + '<input ng-model="ngModel" class="hide">',


                link: function ($scope, $element, attrs, ctrl) {
                    $scope.list = [];
                    var mockLi = $($element).find('.mockLi').hide();
                    $scope.cur = {
                        name: '',
                        code: ''
                    };
                    var method = function (newVal) {
                        angular.forEach($scope.list, function (item) {
                            if (newVal == item.code) {
                                $scope.cur.name = item.name;
                                $scope.cur.code = item.code
                            }
                        })
                    };
                    $scope.switchFun = function () {
                        if (!$scope.ngDisabled) {
                            if(mockLi.css("display")==='none'){
                                mockLi.show('fast')
                            }else {
                                mockLi.hide('fast')
                            }
                        }
                    };
                    $scope.$watch("data", function (newVal, oldVal) {
                        if (angular.isArray(newVal)) {
                            $scope.list = [];
                            angular.forEach(newVal, function (item, index) {
                                var obj = {};
                                obj.code = $scope.code ? item[$scope.code] : index;
                                obj.name = item[$scope.name];
                                $scope.list.push(obj)
                            });
                            method($scope.ngModel)
                        }

                    });
                    if ($scope.code) {
                        $scope.$watch("ngModel", function (newVal, oldVal) {
                            if (!angular.equals(newVal)) {
                                method(newVal)
                            } else {
                                $scope.cur.name = ''
                                $scope.cur.code = ''
                            }

                        });
                    }

                    $scope.toggle = function () {
                        mockLi.hide('fast')
                    };
                    $scope.check = function (item) {
                        //点击不是当前项时才会回调
                        if(item.code != $scope.cur.code|| item.code != $scope.ngModel){
                            $scope.cur.name = item.name;
                            $scope.cur.code = item.code;
                            ctrl.$setViewValue(item.code);
                            if (attrs.ngValue) {
                                var ary = attrs.ngValue.split(".");
                                var val = ary.pop();
                                if (ary.length > 0) {
                                    var str = ary.join(".");
                                    $scope.$parent.$eval(str)[val] = item.name
                                } else {
                                    $scope.$parent[val] = item.name
                                }
                            }
                            // 回调
                            $timeout(function () {
                                if (attrs.onSelect) {
                                    var $select = angular.copy(item);
                                    $select.ctrl = ctrl;
                                    $scope.onSelect({$select:$select});
                                }
                            }, 0);
                        }
                        mockLi.hide('fast')
                    };
                }
            }
        }])
        .directive('uppercase', [function () {
            return {
                require: 'ngModel',
                restrict: 'A',
                priority: 1,
                link: function ($scope, element, attrs, ctrl) {

                    var capitalize = function (val) {
                        val = val || "";
                        var capitalized = val.toUpperCase();

                        if (capitalized !== val) {
                            ctrl.$setViewValue(capitalized);
                            ctrl.$render();
                        }
                        return capitalized;
                    };
                    ctrl.$parsers.push(capitalize);
                }
            };
        }])

        .directive('placeholder', function () {
            return {
                restrict: 'A',
                require: '?^ngModel',
                link: function (scope, element, attr) {
                    var scope = scope && scope.$new();
                    var validateClass = attr['validateClass'];
                    if ('placeholder' in document.createElement('input')) {
                        return;
                    }
                    var _class = element.attr('class');
                    var _id = element.attr('id');
                    var _style = element.attr('style');
                    var elName = element[0].tagName;
                    var tip;
                    var copyElement, classFlag;
                    element.attr('placeholder', '');
                    function load() {
                        if (elName === 'INPUT') {
                            classFlag = 'copy' + Math.floor(Math.random() * 1000000);
                            element.after("<input class='copy " + classFlag + " " + validateClass + " " + _class + "' id='" + _id + "' style='color:#999;" + _style + "' value='" + tip + "' />");
                            copyElement = $("." + classFlag);
                            scope.init();
                        } else if (elName === 'TEXTAREA') {
                            classFlag = 'copy' + Math.floor(Math.random() * 1000000);
                            element.after("<textarea rows=" + attr.rows + " class='copy " + classFlag + " " + _class + "' id='" + _id + "' style='color:#999;" + _style + "' /></textarea>");
                            copyElement = $("." + classFlag);
                            copyElement.val(tip);
                            //指令兼容活动页面,此处select无法监听
                            if (CommonFun.getUrlPara() === 'create') {
                                if (scope.ngModel && (scope.ngModel.type === '单行文本' || scope.ngModel.type === '多行文本')) {
                                    element.hide();
                                    copyElement.hide();
                                }
                                $('select').change(function () {
                                    if ($(this).val() === 0 || $(this).val() === 1) {
                                        // element.hide();
                                        copyElement.hide();
                                    } else {
                                        copyElement.show();
                                        element.hide();
                                        copyElement.focus(function () {
                                            copyElement.hide();
                                            element.show();
                                            element.trigger('focus');
                                        });
                                        element.blur(function () {
                                            if (element.val() === "") {
                                                copyElement.show();
                                                element.hide();
                                            }
                                        });
                                    }
                                });
                            } else {
                                scope.init();
                            }
                        }
                    }

                    //指令兼容活动页面
                    if (scope.ngModel && scope.ngModel.tip !== undefined && scope.ngModel.tip !== null && scope.ngModel.tip !== '' && CommonFun.getUrlPara() !== 'create') {
                        tip = scope.ngModel.tip;
                    } else if (scope.ngModel && scope.ngModel.tip === '') {
                        tip = '';
                    } else {
                        attr.$observe('placeholder', function (newV) {
                            tip = newV;
                            load();
                        });
                    }

                    scope.init = function () {
                        copyElement.show();
                        element.hide();
                        //监听input值状态
                        scope.$watch(function () { return element.val(); }, function (newV) {
                            if (newV !== null && newV !== undefined && newV.trim() !== "") {
                                copyElement.hide();
                                element.show();
                            } else {
                                copyElement.show();
                                element.hide();
                            }
                        });
                        copyElement && copyElement.focus(function () {
                            copyElement.hide();
                            element.show();
                            element.trigger('focus');
                        });
                        element.blur(function () {
                            if (element.val() === "") {
                                copyElement.show();
                                element.hide();
                            }
                        });

                    };
                }
            };
        })

        //侧边浮动条
        .directive('slideBox',function () {
            return{
                scope:{},
                restrict:'E',
                template:'<div class="sides-box Js_sidesBox scale0">' +
                '<img src="images/floatcar.png" alt="" class="floatcar">' +
                '<ul class="sides-list">' +
                '        <li class="advice-line">' +
                '            <a href="tel:4001234567-2">24小时在线咨询</a>' +
                '            <span><i class="Hotline"></i>咨询热线</span>' +
                '        </li>' +
                '        <li class="online-service pr">' +
                '            <a href="javascript:;"><i class="Hotline callBack"></i>预约回电</a>' +
                '            <ul class="callBackMes">' +
                '                <li>' +
                '                    <label>手机号码</label>' +
                '                    <input type="text">' +
                '                </li>' +
                '                <li>' +
                '                    <label>如何称呼您</label>' +
                '                    <input type="text">' +
                '                </li>' +
                '                <li>' +
                '                    <label></label>' +
                '                    <div class="price surebtn" ng-click="obtainPrice()">确 定</div>' +
                '                </li>' +
                '            </ul>' +
                '        </li>' +
                '        <li class="online-service">' +
                '            <a href="javascript:;"><i class="Hotline toBad"></i>我要吐槽</a>' +
                '        </li>' +
                '        <li class="backtop Js_backtop"  ng-click="backTop()"><a href="javascript:;"><i class="caret"></i>TOP</a></li>' +
                '    </ul>' +
                '</div>',
                link: function ($scope, element, attrs, ctrl) {
                    $(window).scroll(function (){
                        var $winH = $(window).height();
                        var $scrollTop = $(window).scrollTop();
                        if($scrollTop >= $winH/2){
                            $(".Js_sidesBox").show();
                        }else{
                            $(".Js_sidesBox").hide();

                        }
                    });
                    $(window).scroll();
                    $scope.backTop=function () {
                        $("html,body").animate({
                            scrollTop:0
                        },300)
                    };
                }
            }
        })
        //车型详细信息（小浮层）
        .directive('carDetail',function () {
            return{
                restrict:'E',
                template:'<div class="brandtopTip" ng-show="brandtopTip">\n' +
                '                    <i class="carArrow"></i>\n' +
                '                    <span ng-bind="carModelDetail"></span>\n' +
                '                    <h3>温馨提示：</h3>\n' +
                '                    <p>请仔细核对您的车辆、行驶证信息，避免后续理赔不便</p>\n' +
                '                </div>'
            }
        })
        //超时弹层
        .directive('overtimePage',['finder', function (finder) {
            return{
                scope:{},
                restrict:'E',
                template:'<div  ng-show="overtimedd"><div class="layer_mask" ></div>' +
                '<div class="layer_preAssess newTestCode" >' +
                '    <div class="preAssessTop" ng-click="obtainPrice()">' +
                '        <h2>温馨提示</h2>' +
                '        <i class="preClose"></i>' +
                '    </div>' +
                '    <div class="layerMain">' +
                '        <div class="clearfix timeBox">' +
                '            <img src="images/doubtAnswer.png" alt="" class="doubtAnswer">' +
                '            <div class="fl">' +
                '                <p class="p1"><b> 需要我们帮助吗？</b>咨询 <a>在线客户</a> </p>' +
                '                <p class="p2">24小时在线客服电话：400-1234567转2</p>' +
                '                <div class="fl price surebtn" ng-click="obtainPrice()">确 定</div>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div></div>',
                link:function ($scope, element, attrs, ctrl) {
                    $scope.overtimedd = false;
                    var sessionFocusForlogout;
                    var sessionFocusForalert;
                    //设置超时时间
                    setAlertTime();
                    //一秒钟刷新一次
                    setInterval(function(){
                        iframefresh();
                        // console.log(sessionFocusForalert)
                    },1000);

                    $scope.obtainPrice=function () {
                        //重新计时
                        setAlertTime();
                        $scope.overtimedd = false;
                        document.title="人保车险网上投保,上汽车保险-中国人保财险电子商务平台";
                    };
                    //倒计时
                    function iframefresh() {
                        //如果还未弹出,倒计时继续
                        if (sessionFocusForalert > 0) {
                            sessionFocusForalert--;
                            document.title="人保车险网上投保,上汽车保险-中国人保财险电子商务平台";
                        }else if(sessionFocusForalert < 0){
                            document.title=(document.title=="[信息提示]")?"____________":"[信息提示]";
                            sessionFocusForlogout -- ;
                            if(sessionFocusForlogout <= 0){
                                window.location.href = "http://www.baidu.com";
                            }
                        }else if(""!==sessionFocusForalert&&sessionFocusForalert == 0){

                            $scope.$apply(function () {
                                $scope.overtimedd = true;
                            });
                            sessionFocusForalert--;
                        }
                    }



                    //设置超时时间
                    function setAlertTime(){
                       sessionFocusForalert = 25*60;//设置提醒倒计时秒数
                       sessionFocusForlogout = 5*60;//设置退出倒记秒数

                    }




                }
            };
        }])


    // 自定义校验函数
        .directive('customValidator', ["$timeout", '$compile', function ($timeout, $compile) {
            return {
                require: 'ngModel',
                restrict: 'A',
                scope: true,
                link: function (scope, element, attrs, ctrl) {
                    var ele = element = $(element);
                    // var textEleStr = "<div class=\"errorTips validation-errorText\"  ng-show=\"errorTextShow\" >" +
                    //     "<i class=\"tips1\"></i>" +
                    //     "<div class=\"tips2\" ng-bind=\"errorText\"></div>" +
                    //     "</div>";
                    var textEleStr = "<div class=\"errorTips validation-errorText\"  ng-show=\"errorTextShow\" >" +
                        "<i class=\"imgtips\"></i>" +
                        "<div class=\"tips2\" ng-bind=\"errorText\"></div>" +
                        "</div>";
                   if(attrs.effectTip){
                       textEleStr += "<div class=\"effectTips\"  ng-show=\"effectShow\" >" +
                           "<i class=\"tips1\"></i>" +
                            "<div class=\"tips2\">"+attrs.effectTip+"</div>" +
                           "</div>"
                   }
                    ele.after($compile(textEleStr)(scope));
                    var valitor; // 传入的校验规则
                    var blurAry = []; // blur 时触发的校验池
                    var changeAry = []; // 输入 时触发的校验池
                    scope.errorText = ""; // 错误提示
                    scope.errorTextShow = false; // 错误提示 显示隐藏
                    scope.effectShow = false; // 作用提示 显示隐藏
                    var tip = function (text) {
                        $timeout(function () {
                            scope.errorText = text;
                            scope.errorTextShow = true;
                        });
                    };

                    var callback = function (text) {
                        if (text) {
                            ctrl.$setValidity("customValidator", false);
                            tip(text);
                            return false
                        } else {
                            ctrl.$setValidity("customValidator", true);
                            scope.errorTextShow = false;
                            scope.errorText = "";
                            return true
                        }
                    };
                    var validBlurFn = function (event) {
                        scope.effectShow = false;
                        if (ctrl.$error.required) {
                            callback(scope.$eval(attrs.ngRequired));
                            return
                        }
                        for (var j = 0; j < blurAry.length; j++) {
                            if (!blurAry[j](ctrl.$viewValue, callback, ctrl, event)) {
                                break
                            }
                        }
                    };
                    $timeout(function () {
                        try {
                            valitor = scope.$eval(attrs.customValidator)
                        } catch (e) {
                            throw new Error(element[0] + "directive [customValidator] Afferent error")
                        }
                        var bindFn = function (valitorObj) {
                            if (valitorObj.trigger === "change") {
                                changeAry.push(valitorObj.validator);
                            } else {
                                blurAry.push(valitorObj.validator);
                            }
                        };
                        if (angular.isArray(valitor)) {
                            for (var i = 0; i < valitor.length; i++) {
                                bindFn(valitor[i])
                            }
                        } else if (angular.isObject(valitor)) {
                            bindFn(valitor)
                        }
                        if (blurAry.length > 0 || attrs.ngRequired) {
                            element.on("blur", validBlurFn)
                        }
                        if (changeAry.length > 0) {
                            ctrl.$parsers.push(function (val) {
                                for (var k = 0; k < changeAry.length; k++) {
                                    if (!changeAry[k](ctrl.$viewValue, callback)) {
                                        break
                                    }
                                }
                                return val;
                            });
                        }
                        element.on('focus', function () {
                            scope.$apply(function () {
                                scope.errorTextShow = false; // 错误提示 显示隐藏
                                scope.effectShow = true; // 显示作用提示信息
                            });
                        });
                        scope.$on('$destroy', function () {
                            element.off();
                        });
                        if (ctrl.$name) {

                            scope.$on(ctrl.$name, function (event, text) {
                                if (text) {
                                    $timeout(function () {
                                        scope.errorText = text;
                                        scope.errorTextShow = true;
                                    })
                                }else {
                                    validBlurFn()
                                }
                            })
                        }
                    }, 200);
                    scope.$on("validCurrent",function (event) {
                        validBlurFn()
                    })
                }
            }
        }])

        //保费单选框
        .directive('radioCheck', ['$timeout',function ($timeout) {
            return {
                restrict: 'E',
                require: "^ngModel",
                // replace: true,
                scope: {
                    ngModel: '=', //// 默认选中值(双向绑定)
                    ngDisabled: '='       //// 是否显示，支持表达式
                },
                template: '<label ng-click="clickBOX()" class="commenClass"\n' +
                'ng-class="{\'noclick\': ngDisabled,\'onMarkRed\':ngModel==1,\'Exemption\':\'ngModel==-1\'}">\n' +
                '</label>'+
                '<input type="hidden"  ng-model="ngModel"/>',

                link: function ($scope, $element, attrs, ctrl) {
                    $scope.clickBOX=function () {
                        if($scope.ngDisabled){
                            return;
                        }
                        $scope.ngModel = $scope.ngModel==1?"-1":"1"
                        if (attrs.ngChange) {
                            $timeout(function () {
                                $scope.$parent.$evalAsync(attrs.ngChange)
                            })
                        }

                    }
                }
            }
        }])

        //保费单选按钮
        .directive('speSwith', ['$timeout',function ($timeout) {
            return {
                restrict: 'E',  //E 元素 A 属性
                require: "^ngModel",
                // replace: true,
                scope: {
                    ngModel: '=', //// 默认选中值
                    ngDisabled: '=',       //// 是否显示，支持表达式
                    amount050200:"@",     //本地作用域属性(固定参数)
                    amount050200Min:"@",
                    amount050200Max:"@"
                },
                template:
                "<div class=\"yesno\" " +
                "ng-class=\"{true:'Yes',false:'No'}[ngModel != -1]\"" +
                "ng-click=\"toggleRadio($event)\">" +
                   "<span class='yaun'></span>"+
                "   <p ng-bind=\"ngModel != -1 ? '投保' : '不投保'\"></p>" +
                "</div>"+
                " <input type=\"text\" ng-show=\"ngModel != -1\"  ng-model=\"inputModel\" ng-focus=\"jdFocus()\"  ng-blur=\"JDblur()\" >"
                +"<p class=\"rangeTips\" ng-show='rangeTips'>请输入{{amount050200Min}}-{{amount050200Max}}以内的金额。</p>",

                link: function ($scope, $element, attrs, ctrl) {
                    $scope.inputModel = $scope.amount050200;
                    var old = $scope.ngModel;
                    $scope.toggleRadio=function () {
                        $scope.ngModel = $scope.ngModel != -1 ? '-1' : old==-1?$scope.amount050200:old;
                        if (attrs.ngChange) {
                            $timeout(function () {
                                $scope.$parent.$evalAsync(attrs.ngChange)
                            })
                        }
                    };
                    // $scope.$watch('ngModel', function (n, o) {
                    //     if(n!=o){
                    //         $scope.inputModel = $scope.ngModel
                    //     }
                    // });
                    $scope.jdFocus=function () {
                        $scope.inputModel="";
                        $scope.rangeTips=true;
                    };
                    $scope.JDblur=function () {
                        $scope.rangeTips=false;
                        if($scope.inputModel=="" || $scope.amount050200Min-0 > $scope.inputModel-0 || $scope.amount050200Max-0 < $scope.inputModel-0 ){
                            $scope.inputModel = $scope.amount050200;
                        }else if($scope.inputModel!="" && $scope.amount050200Min-0<$scope.inputModel-0<$scope.amount050200Max-0){
                            $scope.ngModel=$scope.inputModel = $scope.inputModel;
                            if (attrs.ngBlur) {
                                $timeout(function () {
                                    $scope.$parent.$evalAsync(attrs.ngBlur)
                                })
                            }
                        }
                    };
                }
            }
        }])

        // 日期组件
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