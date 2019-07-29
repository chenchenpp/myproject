/**
 * Created by crx on 2018/01/10.
 */
define(['business',
    'utilities/constant/tips.constant',
    'utilities/constant/resultCode.constant'
], function (businessMod,tips,resultCode) {
    'use strict';
    businessMod.controller('calculateCtrl',
        ['$scope', '$state', '$location', '$anchorScroll', '$sce','$stateParams','$filter','finder','interimServ', 'codesConstant','$q',
            function ($scope, $state, $location, $anchorScroll,$sce,$stateParams,$filter,finder,interimServ,codesConstant,$q) {
                var limitNum = /^([0-9.]+)$/;
                $scope.riskDataBI={};
                var riskData;
                //=================================滚轮滚动高度============================
                $(window).scroll(function (){
                    var $winH = $(window).height();
                    var $scrollTop = $(window).scrollTop();
                    var $docHeight =  $(document).height();
                    var $offsetTop =  $(".product-nav").offset().top;
                    if(($docHeight-$scrollTop-$winH)>116){
                        $(".product-nav").addClass("fixedTotalPrice")
                    }else if(($docHeight-$scrollTop-$winH)<116){
                        $(".product-nav").removeClass("fixedTotalPrice")
                    }
                });
                $scope.car={};
                $scope.bigData={};
                //修改车辆信息
                $scope.btnMOD=function () {
                    $state.go("car", {uuid:$scope.uniqueID});
                };
                $scope.brandtopTip=false;
                $scope.enterShow=function () {
                    $scope.brandtopTip=true;
                };
                $scope.leaveHide=function () {
                    $scope.brandtopTip=false;
                };
                //================================初始化uuid状态====================================================
                interimServ.initUUidState($stateParams.uuid);
                //================================离开页面将uuid状态置为0====================================================
                window.onbeforeunload = function(){
                    setUUidNullCalcu();
                }
                //************************************************车惠活动************************************************
                var carDescss=function () {
                    var conditionDto = {
                        "cityCode":$scope.calReqDto.cityCode,
                        "flowtype":"0",
                        "productname":"2",
                        "producttype":"2",
                        "requestType":"5",
                        "showaddress":"3",
                        "showpage":"4"
                    };
                    finder.post("getMarketing", conditionDto).then(
                        function(data){
                            if(data.data!= "null"){
                                $scope.carDescList= data.data;
                            }
                        }
                    );
                };
                //************************************************ 初始化的方法************************************************
                var Initialization=function(){
                    $scope.loading = true;
                    var conditionDto = {};
                    conditionDto.uniqueID = $stateParams.uuid;
                    $scope.uniqueID =  $stateParams.uuid;
                    finder.post("initCalculateInfo", conditionDto).then(
                        function(data){
                            //初始化所有数据
                            $scope.calReqDto = data.data.calculatePageReqDto;
                            $scope.calCommData = data.data.calculateInItCommonDto;
                            //意外险的被保险人姓名
                            $scope.insuredEADNames=data.data.calculateInItCommonDto.insuredEADName
                            carDescss();
                            //意外险行李险显示隐藏标志
                            if($scope.calCommData.isOpenEAD==1 && $scope.calCommData.isOpenYEL==0){
                                $scope.vipSum=$scope.calReqDto.eadSum;
                            }else if($scope.calCommData.isOpenEAD==0 && $scope.calCommData.isOpenYEL==1){
                                $scope.vipSum=$scope.calReqDto.sumYELpermium;
                            }else if($scope.calCommData.isOpenEAD==1 && $scope.calCommData.isOpenYEL==1){
                                $scope.vipSum=$scope.calReqDto.eadSum + $scope.calReqDto.sumYELpermium;
                            }
                            //显示套餐头
                            $scope.packageName = $scope.calReqDto.packageName;
                            if($scope.packageName == "EconomyPackage"){
                                $scope.riskState = "case1";
                            }else if($scope.packageName == "ComprehensivePackage"){
                                $scope.riskState = "case2";
                            }else{
                                $scope.riskState = "case3";
                            }
                            //判断是新保还是续保 1续保页面   2正常投保页面
                            if($scope.calReqDto.isRenewal==1){
                                $scope.riskState = "case3";
                            }
                            //商业险投保不投保标识
                            if($scope.calReqDto.biselect == 0 && $scope.calReqDto.biselect != ''){
                                $scope.car.statusSy="不投保";
                            }else{
                                $scope.car.statusSy="投保";
                            }
                            if($scope.car.Twosum==""||$scope.car.Twosum==undefined){
                                $scope.car.Twosum=0.00;
                            }
                            if($scope.car.syxSum==""||$scope.car.syxSum==undefined){
                                $scope.car.syxSum=0.00;
                            }

                            //交强险投保不投保标识
                            if($scope.calReqDto.ciselect == 1){
                                $scope.car.status="投保";
                            }else{
                                $scope.car.status="不投保";
                            }
                            //意外险标识
                            if($scope.calCommData.isOpenEAD==1  && $scope.calReqDto.eADFlag == 1){
                                $scope.vipstatus = "投保";
                                if($scope.calReqDto.eadbuystyle == 1){
                                    $scope.eadNum = $scope.calReqDto.insuredcopies;
                                }else if($scope.calReqDto.eadbuystyle == 2){
                                    $scope.eadNum = parseInt($scope.calReqDto.othercopies) * parseInt($scope.calReqDto.othernumber);
                                }
                            }else {
                                $scope.vipstatus = "不投保";
                                $scope.eadNumS=0;
                                $scope.calReqDto.eadSum=0;
                            }
                            //行李险标识
                            if($scope.calCommData.isOpenYEL == 1 && $scope.calReqDto.yelFlag == 1){
                                $scope.vipLugg="投保";
                                $scope.yelNum = $scope.calReqDto.insuredYELcopies;
                            }else{
                                $scope.vipLugg="不投保";
                            }
                            //初始化完后调用保额保费接口
                            calculate();
                        }
                    );
                };
                Initialization();
                $scope.busStatus=function () {
                    if($scope.car.statusSy=="不投保"){
                        $scope.car.statusSy ="投保";
                        $scope.calReqDto.biselect = 1;
                    }else{
                        $scope.car.statusSy ="不投保";
                        $scope.calReqDto.biselect = 0;
                    }
                };
                //************************************************商业险模块接口********************************************************
                //  将数组转换为对象以 kideCode 作为key
                var listToObject = function (list) {
                    var obj ={};
                    for (var i=0;i<list.length;i++){
                        obj[list[i].kindCode] = list[i]
                    }
                    return obj
                };
                //交强险算费赋值方法
                var bindDateCI = function(data){
                    if(data != undefined){
                        $scope.loading = false;
                        $scope.calculateCiData = data;
                        var ciPremium = data.ciPremiumMessage.premium;  //交强险
                        var carShipTaxMessage = data.carShipTaxMessage;  //车船税
                        if(ciPremium <= "0.00"){
                            $scope.curActive3='';
                            $scope.car.status="不投保";
                            $scope.car.CIPremium=0;
                            $scope.car.tax_premium=0;
                        }else{
                            $scope.curActive3='tax';
                            $scope.car.status="投保";
                            $scope.car.CIPremium = ciPremium; //交强险
                            var taxPremium = parseFloat(carShipTaxMessage.thisPayTax) +  parseFloat(carShipTaxMessage.prePayTax) +  parseFloat(carShipTaxMessage.delayPayTax);  //车船税
                            $scope.car.tax_premium = taxPremium;
                        }
                        $scope.car.Twosum = parseFloat(taxPremium) + parseFloat(ciPremium);   //最下面交强险与车船税总额
                    }else{
                        $scope.curActive3='';
                        $scope.car.status="不投保";
                    }
                };
                //算费页初始化下拉框
                var initKindInfoMethod=function(){
                    var deferred = $q.defer();
                    var conditionDto = {};
                    conditionDto.uniqueID = $scope.uniqueID;
                    var promise= finder.post("initKindInfo", conditionDto).then(
                        function(data){
                            deferred.resolve(data);
                            $scope.initData=data.data;
                            $scope.initItemsData=data.data.items;   //所有下拉框数据
                            var initList = data.data.items;
                            for(var i=0;i<initList.length;i++){
                                if( initList[i].kindCode ==="050701" || initList[i].kindCode === "050702"){
                                    angular.forEach(initList[i].amountlists,function (item, index) {
                                        if(index!==0){
                                            item.amountvalue = initList[i].kindCode === '050701'?item.amountvalue/10000 +"万":item.amountvalue+"万/座,"+($scope.initData.seatCount-1)+"座"
                                        }
                                    })
                                }
                            }
                        },function (err) {
                            deferred.reject(err);
                        }
                    );
                    return deferred.promise
                };
                var initKindInfoP = initKindInfoMethod();
                //算费页初始化保额保费
                var calculate = function () {
                    var conditionDto = $scope.calReqDto;
                    if($scope.calReqDto.isRenewal==1){
                        var calculateAddress = "calculateForRenewalNew"
                    }else if($scope.calReqDto.isRenewal==2){
                        var calculateAddress = "calculateForBatch"
                    }
                    finder.post(calculateAddress, conditionDto).then(
                        function(data){
                            $scope.loading=false; // 加载弹层
                            // $scope.isRenewalOpt=angular.copy(data.data.bi.opt);
                            $scope.riskDataBI = data.data.bi; // 信息保存
                            riskData = data.data.bi;
                            //  交强险是否投保标识
                            $scope.calReqDto.ciselect = data.data.ciSelect;
                            //  商业险是否投保标识
                            $scope.calReqDto.biselect = data.data.biSelect;
                            // 处理城市显示隐藏
                            if($scope.calCommData.comCardamageFlag==0){
                                listToObject(codesConstant.opt)["051027"].hideFlag=true;
                            }
                            // 处理opt数据
                            if(riskData.opt.length>0){
                                // 处理后台返回的数据 没有不投保的部分以及要隐藏的和要禁用的
                                var optList =  riskData.opt; // 后台返回的方案调整的数据
                                var riskOptList = angular.copy(codesConstant.opt);
                                riskOptList.forEach(function (oldItem, index) {
                                    optList.forEach(function (newItem) {
                                        if(oldItem.kindCode == newItem.kindCode){
                                            for(var key in newItem){
                                                if(newItem.hasOwnProperty(key)){
                                                    oldItem[key] = newItem[key]
                                                }
                                            }
                                        }
                                    });
                                });
                                riskData.opt = riskOptList;
                            }else {
                                riskData.opt = angular.copy(codesConstant.opt);
                            }
                            // 全面机动隐藏禁用方法
                            stateMange(riskData.opt);
                            //精神抚慰金 节假日翻倍禁用方法
                            method050643(riskData.opt);
                            // 险种排序
                            var riskLists = riskData.ecoAndCom;
                            riskData.ecoAndCom = [];
                            angular.forEach(codesConstant.riskList,function(riskItem,index){
                                angular.forEach(riskLists,function(item){
                                    if(riskItem.kindCode == item.kindCode){
                                        riskData.ecoAndCom[ riskData.ecoAndCom.length] = item
                                    }
                                });
                            });
                            // 给页面赋值初始化数据
                            if($scope.riskState === 'case3'){
                                $scope.riskList = riskData.opt
                            }else {
                                $scope.riskList = riskData.ecoAndCom;
                            }
                            //处理下拉数据 将下拉数据塞入进risklist （包含新保第三方案数据和续保数据排序）
                            if($scope.initItemsData.length){
                                initSelectData(riskData.opt)
                            }else {
                                initKindInfoP.then(function (data) {
                                    initSelectData(riskData.opt)
                                })
                            }
                            refashSelectData(riskData.opt);

                            //险种排序
                            // 只对新保一二方案进行排序
                            // var listObj = listToObject(riskData.ecoAndCom);
                            // $scope.riskList = [];
                            // angular.forEach(codesConstant.riskList, function (riskItem) {
                            //     if (listObj[riskItem.kindCode]) {
                            //         $scope.riskList[$scope.riskList.length] = listObj[riskItem.kindCode];
                            //     }
                            // });
                            if($scope.calReqDto.isRenewal==1){
                                // 续保排序
                                var arr1=[];
                                var arr2=[];
                                for (var i = 0; i < $scope.riskList.length; i++) {
                                    var item = $scope.riskList[i];
                                    if(item.amount != '-1'){
                                        arr1.push(item);
                                    }else {
                                        arr2.push(item)
                                    }
                                }
                                $scope.riskList = arr1.concat(arr2);
                                $scope.initOptList=angular.copy( arr1.concat(arr2))
                            }
                            //  赋值保费信息
                            premiumBI($scope.riskState,riskData);
                            bindDateCI(data.data.ci);
                        });
                };

                // 塞入下拉选的数据
                var initSelectData = function (opt) {
                    angular.forEach(opt,function (optItem) {
                        angular.forEach($scope.initItemsData,function (item) {
                            if(optItem.kindCode === item.kindCode){
                                optItem.amountlists = item.amountlists
                            }
                        })
                    });
                };
                //更新下拉框数据
                var refashSelectData =function (riskList) {
                    var obj = listToObject(riskList);
                    var amount050200 = obj["050200"].amount;
                    if( amount050200 !="-1"){
                        obj["050500"].amountlists[1].amountvalue = amount050200;
                        obj["050500"].amountlists[1].amounttype = amount050200;
                        obj["050310"].amountlists[1].amountvalue = amount050200;
                        obj["050310"].amountlists[1].amounttype = amount050200;
                    }
                };
                //商业险保费赋值
                var premiumBI = function(state,data) {
                    if(state == "case1"){
                        $scope.car.syxSum = data.eco_sum;
                        $scope.calReqDto.packageName = "EconomyPackage";
                    }else if(state == "case2"){
                        $scope.car.syxSum = data.com_sum;
                        $scope.calReqDto.packageName = "ComprehensivePackage";
                    }else if(state == "case3"){
                        $scope.car.syxSum = data.opt_sum;
                        $scope.calReqDto.packageName = "OptionalPackage";
                    }
                };
                // 切换方案
                $scope.changeCase =function (state) {
                    $scope.riskState = state;
                    if(state == "case3"){
                        $scope.riskList=riskData.opt;
                    }else{
                        $scope.riskList = riskData.ecoAndCom;
                    }
                    premiumBI(state,$scope.riskDataBI);
                };
                //方案调整按钮
                $scope.caseAdjust=function (name) {
                    $scope.riskState = "case3";
                    var conditionDto ={
                        "uniqueId":$scope.uniqueID,
                        "packageName":name
                    };
                    if(name == 'EconomyPackage' || name == 'ComprehensivePackage'){
                        riskData.opt = angular.copy(codesConstant.opt);
                        angular.forEach(riskData.ecoAndCom,function (ecoAndComItem) {
                            angular.forEach(riskData.opt,function (optItem, optIndex) {
                                if(ecoAndComItem.kindCode === optItem.kindCode){
                                    if( name == 'EconomyPackage'){
                                        ecoAndComItem.eco.amount===0?ecoAndComItem.eco.amount=-1:ecoAndComItem.eco.amount;
                                        riskData.opt[optIndex] = angular.copy(ecoAndComItem.eco);
                                        $scope.riskDataBI.opt_sum = $scope.riskDataBI.eco_sum
                                    }else if( name == 'ComprehensivePackage'){
                                        ecoAndComItem.com.amount===0?ecoAndComItem.com.amount=-1:ecoAndComItem.com.amount;
                                        riskData.opt[optIndex] = angular.copy(ecoAndComItem.com);
                                        $scope.riskDataBI.opt_sum = $scope.riskDataBI.com_sum
                                    }
                                    riskData.opt[optIndex].kindCode  = ecoAndComItem.kindCode;
                                    riskData.opt[optIndex].kindName  = ecoAndComItem.kindName;
                                }
                            });
                        });
                    }
                    initSelectData(riskData.opt);
                    $scope.riskList = riskData.opt;   //获取的数据赋值到页面
                    stateMange(riskData.opt);
                    method050643(riskData.opt);
                    console.log($scope.riskList);
                    finder.post("changeToOptPackage", conditionDto).then(
                        function(data){}
                    );
                };
                //自由方案下拉框
                $scope.obj={};
                $scope.obj.card=function (risk) {
                    $scope.loading = true;
                    // 更改对应不计免赔的投保标志
                    if(risk.amount==-1){
                        risk.iopStatus=-1;
                    }
                    // 操作对应的险种禁用以及显示隐藏
                    stateMange($scope.riskList);
                    method050643($scope.riskList);
                    // 拼接一份后台需要的数据
                    var longOpt="";
                    $scope.riskList.forEach(function (item) {
                        if(item.amount!=-1&&item.hideFlag!=true&&item.disabledFlag!=true){
                            var iopStatus = item.iopStatus||"";
                            longOpt+=(item.kindCode+":"+item.amount+"/"+iopStatus+",")
                        }
                    });
                    var conditionDto ={
                        "uniqueID":$scope.uniqueID,
                        "packageName":$scope.packageName,
                        "changeItemKind":longOpt,
                        "ciselect":$scope.bigData.ciselect
                    };
                    finder.post("calculateBIForChangeItemKind", conditionDto).then(
                        function(data){
                            if (data.data.resultCode == "0000") {
                                // debugger
                                $scope.loading = false;
                                var opt = data.data.bi.opt;
                                riskData.opt = angular.copy($scope.riskList);
                                riskData.opt.forEach(function (oldoptItem, index) {
                                    angular.forEach(opt, function (newoptItem) {
                                        if (newoptItem.kindCode === oldoptItem.kindCode) {
                                            oldoptItem.amount = newoptItem.amount;
                                            oldoptItem.iopStatus = newoptItem.iopStatus;
                                            oldoptItem.iopPremium = newoptItem.iopPremium;
                                            oldoptItem.premium = newoptItem.premium;
                                        }
                                    });
                                });
                                stateMange(riskData.opt);
                                method050643(riskData.opt);
                                initSelectData(riskData.opt);
                                refashSelectData(riskData.opt);
                                $scope.riskList = riskData.opt;   //获取的数据赋值到页面
                            }else {
                                angular.alert({msg: data.data.resultMsg})
                            }
                        }
                    )
                };
                $scope.obj.switchRisk = function (risk) {
                    if(risk.amount==-1){
                        risk.iopStatus=-1;
                        risk.iopPremium = "0.00";
                        risk.premium = "0.00";
                    }
                    if(risk.kindCode == "050200"&&risk.amount!=-1){
                        if($scope.calCommData.comCardamageFlag!=0 ){ // 有全面型车损险
                            angular.forEach($scope.riskList,function (item) {
                                if(item.kindCode == "051027"&&item.amount!=-1){
                                    item.iopStatus=-1;
                                    item.iopPremium = "0.00";
                                    item.premium = "0.00";
                                    item.amount = "-1";
                                }
                            })
                        }
                    }
                    if(risk.kindCode == "051027"&&risk.amount!=-1){
                        angular.forEach($scope.riskList,function (item) {
                            if(item.kindCode == "050200"&&item.amount!=-1){
                                item.iopStatus=-1;
                                item.iopPremium = "0.00";
                                item.premium = "0.00";
                                item.amount = "-1";
                            }
                        })
                    }
                    $scope.obj.card(risk)
                };
                //商业险部分小问号的错误提示
                $scope.detailExplan=function ($event, risk) {
                    var curI = $event.currentTarget;  //获取当前的i
                    var tagName  =  risk.kindCode;
                    $(curI).after(tips["tagName_" + tagName]);
                };
                $scope.detailHide=function ($event) {
                    var curI = $event.currentTarget;  //获取当前的i
                    $(curI).siblings(".inshreDetail").remove();
                };
                // 全面机动隐藏禁用方法
                var stateMange =function (riskList) {
                    var obj = listToObject(riskList);
                    // 全面没有
                    if($scope.calCommData.comCardamageFlag==0){
                        // 一直隐藏车轮
                        b2(obj, "hideFlag", true);
                        //  一直展示五个附加险
                        a6(obj, "hideFlag", false);
                        if(obj["050200"].amount==-1){
                            // 机动不投           禁用五个附加险
                            a6(obj, "disabledFlag", true);
                        }else {
                            // 机动投             不禁用五个附加险
                            a6(obj, "disabledFlag", false);
                        }
                    }else {
                    // 全面有
                        if(obj["051027"].amount==-1&&obj["050200"].amount!=-1){
                            // 全面不投 机动投    隐藏车轮    展示并且不禁用五个附加险
                            b2(obj, "hideFlag", true);
                            a6(obj, "disabledFlag", false);
                            a6(obj, "hideFlag", false);
                        }else if(obj["051027"].amount!=-1&&obj["050200"].amount==-1) {
                            // 全面投   机动不投  展示车轮    隐藏五个附加险
                            b2(obj, "hideFlag", false);
                            b2(obj, "disabledFlag", false);
                            a6(obj, "hideFlag", true);
                        }else {
                            // 全面不投 机动不投  全展示    全禁用
                            b2(obj, "hideFlag", false);
                            a6(obj, "hideFlag", false);
                            b2(obj, "disabledFlag", true);
                            a6(obj, "disabledFlag", true);
                        }
                    }
                };
                //精神抚慰金 节假日翻倍禁用方法
                var method050643 = function (riskList) {
                    var obj = listToObject(riskList);
                    //   三者 司机 乘客 控制 精神抚慰金险种是否禁用
                    if(obj["050600"].amount == "-1" && obj["050701"].amount == "-1" &&obj["050702"].amount == "-1"){
                        obj["050643"].disabledFlag = true
                    }else {
                        obj["050643"].disabledFlag = false
                    }
                    //三者控制 节假日翻倍险种是否禁用
                    if(obj["050600"].amount == "-1"){
                        obj["051047"].disabledFlag = true
                    }else {
                        obj["051047"].disabledFlag = false
                    }
                };
                /**
                 * 切换六个附加险显示隐藏或者禁用
                 * @param obj 险种对象
                 * @param type 决定是否 禁用或者显示隐藏
                 * @param flag 决定是否显示隐藏或者
                 */
                var a6 = function (obj,type, flag) {
                    var rule = codesConstant.rule["051027"];
                    for (var i = 0; i < rule.length; i++) {
                        obj[rule[i]][type] = flag
                    }
                };
                /**
                 * 切换两个附加险显示隐藏或者禁用
                 * @param obj 险种对象
                 * @param type 决定是否 禁用或者显示隐藏
                 * @param flag 决定是否显示隐藏或者
                 */
                var b2 = function (obj,type, flag) {
                    var rule = codesConstant.rule["050200"];
                    for (var i = 0; i < rule.length; i++) {
                        obj[rule[i]][type] = flag
                    }
                };
                //********************************续保***************************************************************
                //方案对比
                $scope.lastYearCom=function () {
                    $scope.layer_case=true;
                    var conditionDto ={
                        "uniqueID":$scope.uniqueID,
                        "cityCode":$scope.calReqDto.cityCode,
                        "isRenewal": $scope.calReqDto.isRenewal
                    };
                    finder.post("contrastCombosNew", conditionDto).then(
                        function(data){
                            $scope.reBiamount=data.data;
                            $scope.renewalList=data.data.list;
                        }
                    )
                };
                $scope.closelayerCase=function () {
                    $scope.layer_case=false;
                };
                //取消调整
                $scope.cancleChange=function () {
                    // $scope.loading=true;
                    // var conditionDto = $scope.calReqDto;
                    // finder.post("restorePackageNew", conditionDto).then(
                    //     function(data){
                    //         $scope.riskList=data.data.bi.opt;
                    //         $scope.loading=false;
                    //     }
                    // );
                    $scope.riskList=$scope.initOptList;
                };
                //************************************************交强险模块接口********************************************************
                //交强险
                var commonMrthid=function (obj) {
                    // $scope.calReqDto.uniqueID = '3918dd17-7db8-468f-84b0-e43d9220d520';
                    var conditionDto = $scope.calReqDto;
                    if(typeof  obj == 'object'){
                        for(var o in obj){
                            conditionDto[o]=obj[o]
                        }
                    }
                    finder.post("calculateCI", conditionDto).then(
                        function(data){
                            bindDateCI(data.data.ci);  //重新赋值(交强险等部分)
                            if(data.data.needRefreshBI==1){
                                // newDataBI(data);  //重新赋值bi
                                $scope.riskList = data.data.bi.ecoAndCom; //重新赋值bi
                            }
                            if(data.data.resultCode=="1000_CHECKCI"){   //弹出验证码
                                // if(data.data.resultCode=="0000"){
                                $scope.loading=false;
                                $scope.layer_testCode=true;
                                $scope.checkCodeImg = data.data.checkcodeci;
                            }else if(data.data.resultCode=="1000_C"){
                                angular.alert({msg:data.data.resultMsg})
                            }
                        }
                    );
                };
                $scope.tabTax=function () {
                    $scope.loading = true;
                    if( $scope.car.status=="不投保"){
                        $scope.car.status="投保";
                        $scope.calReqDto.ciselect = 1;
                        commonMrthid();
                    }else{
                        $scope.car.status="不投保";
                        $scope.calReqDto.ciselect = 0;
                        var conditionDto ={
                            "uniqueID":$scope.uniqueID,
                            "areaCode":$scope.calReqDto.areaCode
                        };
                        finder.post("cancelCalculateCI", conditionDto).then(
                            function(data){
                                bindDateCI(data.data);  //重新赋值(交强险等部分)
                                if(data.data.needRefreshBI==1){
                                    // newDataBI(data);  //重新赋值bi
                                    $scope.riskList = data.data.bi.ecoAndCom; //重新赋值bi
                                }
                            }
                        );
                    }
                };
                //交强险日期联动
                $scope.changeDate = function () {
                    $scope.loading=true;
                    var tempDate = new Date($scope.bigData.startDateCI);
                    tempDate.setFullYear(tempDate.getFullYear() + 1);
                    tempDate.setDate(tempDate.getDate() - 1);
                    $scope.bigData.endDateCI=$filter('date')(tempDate,'yyyy/MM/dd');
                    commonMrthid()
                };
                //车船税明细
                $scope.showTaxDeta=function () {
                    $scope.taxDeta=true;
                    $scope.car.taxPremium=parseFloat($scope.calculateCiData.thisPayTax)+parseFloat($scope.calculateCiData.prePayTax)+parseFloat($scope.calculateCiData.delayPayTax);
                };
                $scope.hideTaxDeta=function () {
                    $scope.taxDeta=false;
                };

                //交强险弹层验证码
                $scope.changeOne=function (d) {
                    commonMrthid({change:"1"})
                };
                //************************************************专享套餐模块接口********************************************************
                //切换
                $scope.accidentInsure=function () {
                    if( $scope.vipstatus=="投保"){
                        $scope.vipstatus="不投保";
                        $scope.eadNumS = 0;
                        $scope.calReqDto.eadSum = 0;
                        $scope.calReqDto.eADFlag = 0;
                    }else {
                        $scope.vipstatus="投保";
                        $scope.eadNumS = 1;
                        $scope.calReqDto.eadSum =90.00;
                        $scope.calReqDto.eADFlag = 1;
                        if($scope.calReqDto.eadbuystyle !=2) {
                            $scope.calReqDto.eadbuystyle = 1;
                            $scope.calReqDto.insuredcopies = $scope.calReqDto.insuredcopies == '0' ? 1 : $scope.calReqDto.insuredcopies;
                            $scope.eadNum = parseInt($scope.calReqDto.insuredcopies);
                        }else if( $scope.calReqDto.eadbuystyle ==2){
                            $scope.calReqDto.eadbuystyle = 2;
                            $scope.calReqDto.othercopies = $scope.calReqDto.othercopies == ''? 1 : $scope.calReqDto.othercopies;
                            $scope.calReqDto.othernumber = $scope.calReqDto.othernumber == ''? 2 : $scope.calReqDto.othernumber;
                            $scope.eadNum = parseInt($scope.calReqDto.othercopies) * parseInt($scope.calReqDto.othernumber);
                        }
                        $scope.calReqDto.eadsum = $scope.eadNum * 90;
                    }
                };
                //专享套餐-意外险,行李险
                $scope.accLuggShow=function (name) {
                    $scope[name]=true;
                };
                $scope.accLuggHide=function (name) {
                    $scope[name]=false;
                };
                $scope.accidentMod=function () {
                    $scope.accidentLayer=true;
                };
                $scope.curAct = "div1";
                $scope.div1=true;
                $scope.div2=false;
                //意外险tab切换
                $scope.choosediv=function (d) {
                    if(d==1) {
                        $scope.calReqDto.eadbuystyle = 1;
                        $scope.calReqDto.insuredcopies = $scope.calReqDto.insuredcopies == '0' ? 1 : $scope.calReqDto.insuredcopies;
                        $scope.eadNum = $scope.calReqDto.insuredcopies;
                    }else if(d==2){
                        $scope.calReqDto.eadbuystyle = 2;
                        $scope.calReqDto.othercopies = $scope.calReqDto.othercopies == ''? 1 : $scope.calReqDto.othercopies;
                        $scope.calReqDto.othernumber = $scope.calReqDto.othernumber == ''? 2 : $scope.calReqDto.othernumber;
                        $scope.eadNum = parseInt($scope.calReqDto.othercopies) * parseInt($scope.calReqDto.othernumber);
                    }
                    $scope.calReqDto.eadsum = $scope.eadNum * 90;
                };
                //意外险数量加减-为测试及其他人购买计算投保人人数，0未减一，1为加一
                $scope.calInsuredCount=function (type) {
                    var count = parseInt($scope.calReqDto.othernumber);
                    if(type == 1 && count < 9){
                        count += 1;
                    }else if(type == 0 && count > 2){
                        count -= 1;
                    }
                    $scope.calReqDto.othernumber = count;
                    $scope.eadNum = $scope.calReqDto.othercopies * count;
                    $scope.calReqDto.eadsum = $scope.eadNum * 90;

                };
                //意外险数量加减-为测试及其他人购买计算投保人份数，0未减一，1为加一
                $scope.calOtherCopies=function (type) {
                    var eadNumber = parseInt($scope.calReqDto.othercopies);
                    if(type == 1 && eadNumber < 30){
                        eadNumber += 1;
                    }else if(type == 0 && eadNumber > 1){
                        eadNumber -= 1;
                    }
                    $scope.calReqDto.othercopies = eadNumber;
                    $scope.eadNum = $scope.calReqDto.othercopies * eadNumber;
                    $scope.calReqDto.eadsum = $scope.eadNum * 90;
                    $scope.calReqDto.eadbuystyle = 2;
                };
                //意外险数量加减-为投保人购买计算投保人份数，0为减一，1为加一
                $scope.calInsuredCopies = function (type) {
                    var eadNumber = parseInt($scope.calReqDto.insuredcopies);
                    if(type == 1 && eadNumber < 30){
                        eadNumber += 1;
                    }else if(type == 0 && eadNumber > 1){
                        eadNumber -= 1;
                    }
                    $scope.calReqDto.insuredcopies = eadNumber;
                    $scope.calReqDto.eadsum = eadNumber * 90;
                    $scope.eadNum = eadNumber;
                    $scope.calReqDto.eadbuystyle = 1;
                };

                //意外险确定按钮
                $scope.closeAdd=function () {
                    if($scope.vipstatus=="不投保"){
                        $scope.vipstatus="投保";
                        $scope.calReqDto.eADFlag = 1;
                    }
                    $scope.accidentLayer=false;
                    if($scope.calReqDto.eadbuystyle== 2){
                        $scope.insuredEADNames=$scope.calCommData.insuredEADName+"及其他人"
                        $scope.eadNumS = $scope.calReqDto.othercopies;
                    }else {
                        $scope.insuredEADNames=$scope.calCommData.insuredEADName
                        $scope.eadNumS = $scope.calReqDto.insuredcopies;
                    }
                    $scope.calReqDto.eadSum = $scope.calReqDto.eadsum;
                    if($scope.calCommData.isOpenEAD==1 && $scope.calCommData.isOpenYEL==0){
                        $scope.vipSum=$scope.calReqDto.eadSum;
                    }else if($scope.calCommData.isOpenEAD==0 && $scope.calCommData.isOpenYEL==1){
                        $scope.vipSum=$scope.calReqDto.sumYELpermium;
                    }else if($scope.calCommData.isOpenEAD==1 && $scope.calCommData.isOpenYEL==1){
                        $scope.vipSum=$scope.calReqDto.eadSum + $scope.calReqDto.sumYELpermium;
                    }
                };

                //专享套餐-行李险
                $scope.bagInsure=function () {
                    if( $scope.vipLugg=="投保"){
                        $scope.vipLugg="不投保";
                        $scope.calReqDto.yelFlag = 0;
                        $scope.yelNum = 0;
                    }else {
                        $scope.vipLugg="投保";
                        $scope.yelNum = $scope.calReqDto.insuredYELcopies;
                        $scope.calReqDto.yelFlag = 1;
                    }
                    $scope.calReqDto.sumYELpermium = $scope.yelNum * 100;
                };
                $scope.showLugg=function () {
                    $scope.luggLayer=true;
                };
                $scope.closePreAssess=function () {
                    $scope.luggLayer=false;
                    $scope.accidentLayer=false;
                };
                $scope.calLuggNUM = function(type){
                    var luggNumber = parseInt($scope.calReqDto.insuredYELcopies);
                    if(type == 0 && luggNumber > 1){
                        luggNumber -= 1;
                    }else if(type == 1 && luggNumber <= 29){
                        luggNumber += 1;
                    }
                    $scope.calReqDto.insuredYELcopies = luggNumber;
                    $scope.yelNum = luggNumber;
                    $scope.calReqDto.sumYELpermium = luggNumber * 100;
                };

                //行李险确定按钮
                $scope.closeYELadd=function () {
                    if($scope.vipLugg="不投保"){
                        $scope.vipLugg="投保";
                    }
                    $scope.luggLayer=false;
                };

                $scope.luggBlur=function (name) {
                    if($scope.calReqDto[name] > 30){
                        $scope.calReqDto[name] = 30;
                    }else if($scope.calReqDto[name] < 1 || !limitNum.test($scope.calReqDto[name])){
                        $scope.calReqDto[name] = 1;
                    };
                };


                $scope.calCount = function (name,num) {
                    if($scope.calReqDto[name] > num){
                        $scope.calReqDto[name] = num;
                    }else if($scope.calReqDto[name] < 1 || !limitNum.test($scope.calReqDto[name])){
                        $scope.calReqDto[name] = 1;
                    };
                };
                $scope.carPeopleBlur=function (name) {
                    if($scope.bigData[name] > 9){
                        $scope.bigData[name] = 9;
                    }else if($scope.bigData[name] < 2 || !limitNum.test($scope.bigData[name])){
                        $scope.bigData[name] = 2;
                    };
                };
                //*****************************************上一步 发送报价 保存信息 下一步***********************************************

                //返回上一步
                $scope.backone=function () {
                    var conditionDto = $scope.calReqDto;
                    finder.post("calBackToCarPage", conditionDto).then(
                        function(data){
                            // if(data.resultCode = "0000"){
                            $state.go("car", {uuid:$scope.uniqueID});
                            // }
                        }
                    );
                };
                //下一步
                $scope.nextStep=function () {
                    var conditionDto = $scope.calReqDto;
                    finder.post("toInsurance",conditionDto).then(
                        function(result){
                            var resCode = result.data.resultCode;
                            if(resCode == resultCode.SUCCESSCODE){
                                $state.go("loadInsuranceInfo", {uuid:$scope.uniqueID});
                            }else if(resCode == resultCode.LOGINCODE){
                                angular.alert({msg: "需要先登录"})
                            }else if(resCode == resultCode.REFUSECODE){
                                window.open("http://10.10.0.89:8212/newecar/views/proposal/refuse.jsp");
                            }else if(resCode == resultCode.EJECTMSGCODE){
                                angular.alert({msg: result.data.resultMsg});
                            }else{
                                angular.alert({msg: result.data.resultMsg});
                            }
                        }
                    );
                };
                //发送报价
                $scope.SendPrice=function () {
                    $scope.SendPriceLayer=true;
                    var conditionDto = {
                        "uniqueID":$scope.uniqueID,
                        "sendOrCallBack":"0"
                    };
                    finder.post("getMAndE", conditionDto).then(
                        function(data){
                            $scope.car.email=data.data.email;
                            $scope.car.mobile=data.data.mobile;
                        }
                    );
                };
                $scope.closeSendPrice=function () {
                    $scope.SendPriceLayer=false;
                };
                //发送报价弹层-发送方式
                $scope.curBoxAct1="boxFlag1";
                $scope.clickbox1=function () {
                    if($scope.curBoxAct1=="boxFlag1"){
                        $scope.curBoxAct1="";
                    }else {
                        $scope.curBoxAct1="boxFlag1";
                    }
                };
                $scope.curBoxAct2="boxFlag2";
                $scope.clickbox2=function () {
                    if($scope.curBoxAct2=="boxFlag2"){
                        $scope.curBoxAct2="";
                    }else {
                        $scope.curBoxAct2="boxFlag2";
                    }
                };
                //手机号码方式
                var InsuredMobile=function () {
                    var conditionDto = {
                        "mobile":$scope.car.mobile,
                        "uniqueID":$scope.uniqueID,
                        "insurType":"2"
                    };
                    finder.post("checkInsuredMobile", conditionDto).then(
                        function(data){
                            if(data.data.resultFlag==false){
                                $scope.car.priceFlag=data.data.resultMsg;
                            }
                        }
                    );
                };
                //电子邮箱方式
                var InsuredEmail=function () {
                    var conditionDto = {
                        "email":$scope.car.email,
                        "uniqueID":$scope.uniqueID
                    };
                    finder.post("checkInsuredEmail", conditionDto).then(
                        function(data){
                            if(data.data.resultFlag==false){
                                $scope.car.priceFlag=data.data.resultMsg;
                            }
                        }
                    );
                };
                //发送报价弹层上确定按钮
                var sendPriceMeth=function () {
                    var conditionDto = {
                        "eadbuystyle":"1",
                        "insuredcopies":"1",
                        "insuredYELcopies":"1",
                        "checkIsOffRenewal":"1",
                        "userPriceConf":"1",
                        "biselect":"1",
                        "ciselect":"1",
                        "EADFlag":"1",
                        "yelFlag":$scope.bigData.yelselect,
                        "isNeedCompare":"1",
                        "isRenewal":"2",
                        "reuseFlag":"0",
                        "useYears":"0",
                        "BM_flag":"0",
                        "isNeedCal":"0",
                        "licenseFlag":"0",
                        "rapidRenewalFlag":"0",
                        "sendMobileFlag":"0",
                        "isRevoke":"00",
                        "yelAmount":$scope.bigData.yelAmount,
                        "yelPerminum": $scope.bigData.realprice,
                        "yelengage":$scope.bigData.engage,
                        "uniqueID":$scope.uniqueID,
                        "areaCode":$scope.bigData.areaCode,
                        "cityCode":$scope.bigData.cityCode,
                        "amount050200Min":"504000",
                        "amount050200Max":"504000",
                        "seatCount":$scope.initData.seatCount,
                        "eadsum":$scope.car.accMoney,
                        "sumYELpermium":$scope.car.luggMoney,
                        "sendEmail":$scope.car.mobile,
                        "sumPremium":$scope.car.allSum,  //合计
                        "premiumCI":$scope.car.comSum,     //交强险
                        "packageName":$scope.packageName,
                        "startDateCI":$scope.bigData.startDateCI,
                        "startHourCI":$scope.bigData.startHourCI,
                        "endDateCI":$scope.bigData.endDateCI,
                        "endHourCI":$scope.bigData.endHourCI,
                        "verifyCode": $scope.car.verifyCode,
                    };
                    finder.post("sendPrice", conditionDto).then(
                        function(data){
                            if(data.data.resultFlag==false){
                                $scope.car.priceFlag="验证码错误";
                            }
                        }
                    );
                };
                $scope.sendLayer=function () {
                    if($scope.curBoxAct1=="boxFlag1" && $scope.curBoxAct2!="boxFlag2"){
                        InsuredMobile();
                    }else if($scope.curBoxAct2=="boxFlag2" && $scope.curBoxAct1!="boxFlag1"){
                        InsuredEmail();
                    }else if($scope.curBoxAct1=="boxFlag1" && $scope.curBoxAct2=="boxFlag2"){
                        InsuredMobile();
                        InsuredEmail();
                    }else{
                        $scope.car.priceFlag="请选择您要发送的方式";
                    }

                };
                //换一张
                $scope.srcurl="/newecar/CreateImageNew?next=0.4435600991413946&amp;randName=registerRandPhone&amp;uuid=";
                $scope.ChangeONE=function () {
                    $scope.srcurl="http://10.10.40.21:7005/newecar/CreateImageNew?randName=registerRandPhone&next="+Math.random() + '&uuid=';
                };
                //保存信息
                $scope.saveCalculateMsg=function () {
                    var conditionDto = $scope.calReqDto;
                    finder.post("saveCalculateInfo", conditionDto).then(
                        function(data){
                            if(data.data.resultCode=="1000"){
                                angular.alert({msg:data.data.resultMsg})
                            }else if(data.data.resultCode=="1003"){
                                angular.alert({msg:"需要先登录"})
                            }
                        }
                    );
                };
                //================================离开页面将uuid状态置为0====================================================
                var setUUidNullCalcu = function(){
                    var conditionDto = $scope.calReqDto;
                    finder.post("setUuidNullCalcu", conditionDto,{async:false});
                }

                // $scope.risks=true;
                //****************************************** 20180326 续保模块接口 ***************************************************************

            }]);
});