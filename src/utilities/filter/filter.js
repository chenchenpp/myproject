
/**
 * 自定义指令 20171220
 */
define(['angular'], function (angular, config, codes) {
      return angular.module('utilities.filter', [])
        /**
         * @ngdoc filter
         * @name filter:propsFilter
         * @description 放大镜效果
         * 四位进行格式化
         */
        .filter("enlargeFilter", function () {
            return function (text) {
                if (angular.isString(text)) {
                    return text.replace(/(\s)/, '').replace(/([^\s]{4})/g, "$1 ").toUpperCase();
                }
            }
        })
        /**
         * @ngdoc filter
         * @name filter:checkNullFilter
         * @description 空值或者字符串 默认为零
         */
        .filter("checkNullFilter", function () {
            return function (text) {
                if (angular.isUndefined(text) || "" == text) {
                    return 0;
                }else{
                    return text;
                }
            }
        })
        /**
         * @ngdoc filter
         * @name filter:absFilter
         * @description 取绝对值
         */
        .filter("absFilter", function () {
            return function (text) {
               var newtext = parseFloat(text);
                if (angular.isNumber(newtext) || "" == newtext) {
                 return  Math.abs(newtext);
                }else {
                    return text;
                }
            }
        })
        /**
         * @ngdoc filter
         * @name filter:isProposalFilter
         * @description 是否投保和 玻璃类型过滤
         */
        .filter("isProposalFilter", function () {
            return function (text) {
                var num = text-0
                if(num === 0 || num === -1){
                    return '--'
                }else if(num == 1){
                    return "投保"
                }else if(num == 10){
                    return "国产玻璃"
                }else if(num == 20){
                    return "进口玻璃"
                }else {
                    return text
                }
            };
        })
        /**
         * @ngdoc filter
         * @name filter:amoutFilter
         * @description 司机乘客进行过滤
         */
        .filter("amoutFilter", function () {
            return function (text, code, seatCount) {
                if(code == "050701"){
                    return text / 10000 +"万"
                }else if(code == "050702"){
                    return text / 10000 +"万/座," +(seatCount-1)+"座"
                } else {
                    return text
                }
            }
        })
        /**
         * @ngdoc filter
         * @name filter:dateLimitFilter
         * @description 日期截取前十位 并且替换分隔符”-“为“/”
         */
        .filter("dateLimitFilter", ['$filter',function ($filter) {
            return function (date) {
                if(date){
                    date = date.replace(/-/g, '/');
                    return date.slice(0,10)
                }
            }
        }])
        /**
         * @ngdoc filter
         * @name filter:hideFilter
         * @description 险种显示隐藏进行过滤
         */
        .filter("hideFilter", function () {
            return function (list) {
                if(list){
                    return list.filter(function (item) {
                        return !item.hideFlag
                    })
                } else {
                    return list
                }
            }
        });
})
;