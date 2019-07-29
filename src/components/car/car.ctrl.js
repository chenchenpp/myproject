/**
 * Created by crx on 2017/11/14.
 */
define(['business'], function (businessMod) {
    'use strict';
    businessMod.controller('carCtrl', ['$scope', '$http','$state', '$location','$timeout', '$anchorScroll', '$filter', '$sce','$interval','$q','finder','interimServ','$stateParams', function ($scope, $http, $state, $location,$timeout, $anchorScroll,$filter,$sce,$interval,$q,finder,interimServ,$stateParams) {

        var limit6 = /^[*|a-zA-Z0-9]{6,}$/;
        var limit17 = /[*|a-zA-Z0-9]{17}/;
        var copyDataCarInfo = {};
        var copyInsuredInfo = {};
        $scope.car = {};
        $scope.carfind = {};
        $scope.obj={};  //下拉框回调
        $scope.openflag=false;
        var d={}; //查车接口使用对象
        //商业险保单生效日期
        $scope.hello = function () {
            var tempDate = new Date($scope.mainReqDto.startDateBI);
            tempDate.setFullYear(tempDate.getFullYear() + 1);
            tempDate.setDate(tempDate.getDate() - 1);
            $scope.mainReqDto.endDateBI=$filter('date')(tempDate,'yyyy/MM/dd');
        };
        //================================初始化uuid状态====================================================
        interimServ.initUUidState($stateParams.uuid);
        //================================离开页面将uuid状态置为0====================================================
        window.onbeforeunload = function(){
            setUUidNullCar();
        }
        //================================================ 初始化的方法=============================================
        var Initialization=function(){
            var conditionDto = {};
            $scope.uniqueID = conditionDto.uniqueID = $stateParams.uuid;
            var a = finder.post("initNormalProposal", conditionDto).then(
                function(data){
                    copyDataCarInfo = angular.copy(data.data.preCalReqDto.carReqDto);
                    copyInsuredInfo = angular.copy(data.data.preCalReqDto.insuredReqDtos);
                    //车型详细信息
                    $scope.carModelDetail=copyDataCarInfo.carModelDetail;
                    //一些标志位信息
                    $scope.carCommInfo = data.data.carCommInfo;
                    //车辆基本信息
                    $scope.carInfoDto = data.data.preCalReqDto.carReqDto;
                    //城市等基础信息
                    $scope.mainReqDto = data.data.preCalReqDto.mainReqDto;
                    //被保险人信息
                    $scope.insuredReqDtos = data.data.preCalReqDto.insuredReqDtos;
                    //日期格式转换
                    $scope.carInfoDto.enrolldate = $filter('dateLimitFilter')( $scope.carInfoDto.enrolldate);
                    $scope.carInfoDto.ownerChangeDate = $filter('dateLimitFilter')($scope.carInfoDto.ownerChangeDate);
                    $scope.mainReqDto.startDateBI = $filter('dateLimitFilter')( $scope.mainReqDto.startDateBI);
                    $scope.mainReqDto.endDateBI = $filter('dateLimitFilter')( $scope.mainReqDto.endDateBI);
                    $scope.insuredReqDtos[0].birthday = $filter('dateLimitFilter')( $scope.insuredReqDtos[0].birthday);
                    $scope.carInfoDto.vehicle_modelsh = $scope.carInfoDto.vehicle_modelsh;
                    carDescss();
                }
            );
        };
        Initialization();
        //===问号===
        $scope.questionShow=function (name) {
            $scope[name]=true;
        };
        $scope.questionHide=function (name) {
            $scope[name]=false;
        };
        //================================= 车惠活动=================================
        var carDescss=function () {
            var conditionDto = {
                "cityCode":$scope.mainReqDto.cityCode,
                "flowtype":"0",
                "productname":"2",
                "producttype":"2",
                "requestType":"5",
                "showaddress":"3",
                "showpage":"3"
            };
            finder.post("getMarketing", conditionDto).then(
                function(data){
                    if(data.data!= "null"){
                        $scope.carDescList= data.data;
                    }
                }
            );
        };
        $scope.curSex='appsex';
        //================================= 离开焦点校验=================================
        $scope.rule = {
            engineNoRule:{
                validator: function (val, callback, ctrl) {
                    if(!limit6.test(val)){
                        return callback("发动机号至少为6位");
                    }
                    if(ctrl&&ctrl.$dirty===true){ //必填校验优先级最高，表单脏了才会调用接口
                        $scope.carInfoDto.engineNoFlag = 1;
                        var conditionDto = {};
                        conditionDto.engineNo = $scope.carInfoDto.engineno;
                        conditionDto.countryNature="";
                        conditionDto.engineNoFlag="1";
                        conditionDto.uniqueID=$scope.uniqueID;
                        return finder.post("checkEngineNo", conditionDto).then(
                            function(data){
                                if(data.data.resultFlag == false){
                                    return callback(data.data.resultMsg)
                                }else{
                                    return callback()
                                }
                            }
                        );
                        // 表单脏了将标志位置为0
                        $scope.carInfoDto.engineNoFlag = 0;
                    }
                }
            },
            frameNoRule:{
                validator: function (val, callback,ctrl) {
                    if(!limit17.test(val)){
                        return callback( "车辆识别码/车架号应该为17位" );
                    }else if(ctrl&&ctrl.$dirty===true){
                        $scope.carInfoDto.frameNoFlag = 1;
                        var conditionDto = {};
                        conditionDto.frameNoObj = $scope.carInfoDto.frameno;
                        conditionDto.areaCodeVal = $scope.mainReqDto.areaCode;
                        conditionDto.cityCodeVal = $scope.mainReqDto.cityCode;
                        conditionDto.EnrollDateVal = $scope.carInfoDto.enrolldate;
                        conditionDto.isRenewal = $scope.mainReqDto.isRenewal;
                        conditionDto.frameNoFlag = "1";
                        conditionDto.uniqueID = $scope.uniqueID;
                        return finder.post("checkFrameNo", conditionDto).then(
                            function(data){
                                if(data.data.resultFlag === false){
                                    return callback( data.data.resultMsg );
                                }else{
                                    return callback();
                                }
                            }
                        );
                        $scope.carInfoDto.frameNoFlag = 0;
                    }
                }
            },
            loadNameRule:{
                validator:function (val, callback) {
                    var conditionDto = $scope.car;
                    conditionDto.loanName = $scope.carInfoDto.loanName;
                    conditionDto.uniqueID = $scope.uniqueID;
                    return finder.post("checkloanName", conditionDto).then(
                        function(data){
                            return callback(data.data.resultMsg);
                        }
                    );
                }
            },
            insuredNameRule: {
                validator: function (val, callback) {
                    var conditionDto = {};
                    conditionDto.insuredName = $scope.insuredReqDtos[0].insuredname;
                    conditionDto.areaCode = $scope.mainReqDto.areaCode;
                    conditionDto.cityCode = $scope.mainReqDto.cityCode;
                    conditionDto.isRenewal = $scope.mainReqDto.isRenewal;
                    conditionDto.uniqueID = $scope.uniqueID;
                    return finder.post("checkInsurdeName", conditionDto).then(
                        function (data) {
                            if(data.data.resultFlag==false){
                                callback(data.data.resultMsg);
                            }else{
                                callback()
                            }
                        }
                    );
                }
            },
            insuredIDNumberRule:{
                validator: function (val, callback) {
                    // if(copyInsuredInfo[0].identifyno != $scope.insuredReqDtos[0].identifyno){
            
                        var conditionDto = {};
                        conditionDto.insuredIDNumber = $scope.insuredReqDtos[0].identifyno;
                        conditionDto.insuredIDType = $scope.insuredReqDtos[0].identifytype;
                        conditionDto.areaCode = $scope.mainReqDto.areaCode;
                        conditionDto.uniqueID = $scope.uniqueID;
                        return finder.post("checkInsuredIDNumber", conditionDto).then(
                            function(data){
                                if(data.data.resultFlag==false){
                                    callback(data.data.resultMsg);
                                }else{
                                    callback()
                                }
                            }
                        );
                    // }
                }
            }
        };
        //====================================聚焦事件====================================
        $scope.curCard='engineno';
        $scope.focusChangeImg=function (state) {
            $scope.curCard = state
        };
        //=================================关闭=================================
        $scope.close=function () {
            $scope.layer_carMode=false;
        };
        //====================================保存信息===========================================================
        var saveCarInfodata=function () {
            var conditionDto ={
                "mainReqDto.pagestep": "car",
                "insuredReqDtos[0].insuredFlag":"1000000",
                "insuredReqDtos[0].serialno":"1",
                "insuredReqDtos[1].insuredFlag":"0100000",
                "insuredReqDtos[1].serialno":"2",
                "insuredReqDtos[2].insuredFlag":"0010000",
                "insuredReqDtos[2].serialno":"3",
                "insuredReqDtos[3].insuredFlag":"0000000                 1",
                "insuredReqDtos[3].serialno":"4",
                "mainReqDto.isRenewal":$scope.mainReqDto.isRenewal,
                "mainReqDto.reuseFlag":$scope.mainReqDto.reuseFlag,
                "TZFlag":"",
                "mainReqDto.areaCode":$scope.mainReqDto.areaCode,
                "mainReqDto.cityCode":$scope.mainReqDto.cityCode,
                "uniqueID":$scope.uniqueID,
                "licenseNo":$scope.carCommInfo.licenseNo,
                "carReqDto.countryNature":"",
                "serverDateTime":$scope.carInfoDto.enrolldate,
                "carReqDto.frameNoFlag":$scope.carInfoDto.frameNoFlag,
                "carReqDto.vinNoFlag":$scope.carInfoDto.vinNoFlag,
                "carReqDto.engineNoFlag":$scope.carInfoDto.engineNoFlag,
                "carReqDto.engineno" : $scope.carInfoDto.engineno,
                "carReqDto.frameno" : $scope.carInfoDto.frameno,
                "carReqDto.vehicle_modelsh" : $scope.carInfoDto.vehicle_modelsh,
                "carReqDto.aliasName":"",
                "carReqDto.seatcount":$scope.carInfoDto.seatcount,
                "carReqDto.enrollDate" : $scope.carInfoDto.enrolldate,
                "mainReqDto.startDateBI" : $scope.mainReqDto.startDateBI,
                "mainReqDto.startHourBI":$scope.mainReqDto.startHourBI,
                "startHourBIReal":"0",
                "mainReqDto.endDateBI" : $scope.mainReqDto.endDateBI,
                "mainReqDto.endHourBI":$scope.mainReqDto.endHourBI,
                "carReqDto.haveOwnerChange":$scope.carInfoDto.haveOwnerChange,
                "carReqDto.isHaveLoan":$scope.carInfoDto.isHaveLoan,
                "carReqDto.ownerChangeDate" : $scope.carInfoDto.ownerChangeDate,
                "carReqDto.loanName" : $scope.carInfoDto.loanName.value,
                "insuredReqDtos[1].insuredname":$scope.insuredReqDtos[0].insuredname,
                "insuredReqDtos[1].identifytype":$scope.insuredReqDtos[0].identifytype,
                "insuredReqDtos[1].identifyno":$scope.insuredReqDtos[0].identifyno
            };
            finder.post("saveCarInfo", conditionDto).then(
                function(data){
                    if(data.data.resultCode=="1003"){
                        angular.alert({msg:"请先登录个人中心"});

                    }else if(data.data.resultCode=="1000"){
                        angular.alert({msg:data.data.resultMsg});
                    }
                    // angular.comfirm("提示","请先登录个人中心",{okCallback:function(ok){
                    //    alert(0)
                    // }});
                }
            );
        };
        $scope.saveCarInfo=function () {
            saveCarInfodata();
        };
        //====================================保费估算校验车价===============================
        var carAssessdata=function () {
            var conditionDto = {};
            conditionDto.price=$scope.car.price;  //弹层上车价输入域
            conditionDto.citycode=$scope.mainReqDto.cityCode;
            conditionDto.areaCode=$scope.mainReqDto.areaCode;
            conditionDto.uniqueID=$scope.uniqueID;
            finder.post("checkCarPrice", conditionDto).then(
                function(data){
                    if(data.data.resultFlag==false){
                        $scope.priceresultMsg=data.data.resultMsg;
                    }else{
                        $scope.carPriceTips=false;
                    }
                }
            );
        };
        $scope.blurCarPriceDiv=function () {
            if($scope.car.price=="" || isNaN($scope.car.price)){
                $scope.carPriceTips=true;
                $scope.priceresultMsg="请输入正确车价"
            }else{
                carAssessdata();
            }
        };
        //购车年份
        var getYear=function () {
            var yearObj = [];
            var d = new Date();
            var currYear = d.getFullYear();
            for (var i = 0; i < 15; i++) {
                var obj = {};
                obj.yearName = currYear-i;
                yearObj.push(obj);
            }
            return yearObj;
        }; //获取当前近15年年份
        $scope.obj.getyear=function () {  //下拉框回调
            // console.log($scope.car)
        };
        $scope.showcarAssess=function () {
            $scope.car.yearName = getYear()[0].yearName; //获取当前年
            $scope.yearList = getYear();   //获取下拉框年份
            $scope.layer_premiumAssess=true;  //保费上半部分弹层
            $scope.layer_insureType=false;  //保费下半部分弹层
        };
        //====================================保费估算计算保费===============================
        if($scope.car.yearName=="" || $scope.car.yearName==undefined){
            $scope.car.yearName="2017"
        }
        var countPremiumdata=function () {
            var conditionDto = {};
            conditionDto.CarPrice=$scope.car.price;
            conditionDto.CarYears=$scope.car.yearName;
            conditionDto.engineno=$scope.carInfoDto.engineno
            conditionDto.frameno=$scope.carInfoDto.frameno;
            conditionDto.uniqueID=$scope.uniqueID;
            conditionDto.isfromStep2="is";
            conditionDto.isBlackFlag="0";
            finder.post("quotedPrice", conditionDto).then(
                function(data){
                    $scope.thisPrice = data.data.commaket;
                }
            );
        };
        $scope.countPremium=function () {
            if($scope.car.price=="" || isNaN($scope.car.price)){
                $scope.carPriceTips=true;
                $scope.priceresultMsg="请输入正确车价"
            }else {
                $scope.carPriceTips=false;
                $scope.layer_insureType = true;
                countPremiumdata();
            }
        };
        //关闭保费估算
        $scope.closePreAssess=function () {
            $scope.layer_premiumAssess=false;
            $scope.car.price="";
            $scope.carPriceTips=false;
        };
        // -----------------------------------------下拉框初始化--------------------------------------------
        $scope.obj.card=function() { //下拉框回调
            console.log($scope.bigData.insuredIdType.value);
        };
        var SelectList = function () {
            var conditionDto = {};
            finder.post("findIdentityType", conditionDto).then(
                function(data){
                    $scope.selectList = data.data;
                    // $scope.selectList.unshift({
                    //     identifycode :"00",
                    //     identifyname:"你好"
                    // });
                }
            );
        };
        SelectList();
        // ****************************************20171207   所有查车接口**********************************************
        //模拟下拉
        $scope.car.familyCode="车系";
        $scope.car.engineDesc="排量";
        $scope.car.gearboxType="档位";
        var pageCarMethod = function () {
            if($scope.leftDatabrandCode ==undefined && d.brandCode==undefined ){
                d.brandCode=$scope.carBrandDatalist[0].brandCode;
            }else{
                d.brandCode=$scope.leftDatabrandCode.brandCode;
            }
            var conditionDto = {
                "carModelJYQuery.vehicleName": $scope.carInfoDto.vehicle_modelsh,
                "carModelJYQuery.uniqueId": $scope.uniqueID,
                "carModelJYQuery.requestType":"02",
                "carModelJYQuery.areaCode": $scope.mainReqDto.areaCode,
                "carModelJYQuery.brandCode":d.brandCode,
                "carModelJYQuery.priceConfigKind":"2",
                "carModelJYQuery.engineDesc":"排量",
                "carModelJYQuery.gearboxType":"档位",
                "carModelJYQuery.pageNum":$scope.paginationConf.currentPage
            };
            finder.post("findCarModelJYQuery", conditionDto).then(
                function(data){
                    $scope.carBrandDatalist=data.data.body.queryBrand;  //弹层左边品牌名字
                    $scope.cxList=data.data.body.queryFamily;  //车系下拉框
                    $scope.plList=data.data.body.queryEngineDesc;  //排量下拉框
                    $scope.dwList=data.data.body.queryGearboxType;  //档位下拉框
                    $scope.cxList.unshift({familyCode :"车系",familyName:"车系"});
                    $scope.plList.unshift({engineDesccode :"排量",engineDesc:"排量"});
                    $scope.dwList.unshift({gearboxcode :"档位",gearboxType:"档位"});
                    var queryVehicles = data.data.body.queryVehicle;
                    for(var i=0; i<queryVehicles.length;i++) {
                        queryVehicles[i].newModelName1= queryVehicles[i].newModelName.replace(/<[^>]+>/g,"");  //遍历展示title
                        queryVehicles[i].newModelName= $sce.trustAsHtml(queryVehicles[i].newModelName);
                    }
                    $scope.carDatalist = queryVehicles;       //遍历弹层展示的数据(正中间)
                    $scope.paginationConf.totalItems = data.data.body.totalNum;
                }
            );
        };
        //===========品牌车型校验================================================
        var cancelRequest;   //保存上次发出请求
        var BrandMethod = function () {
            if (cancelRequest){
                cancelRequest.resolve()
            };  //取消已发出请求

            cancelRequest = $q.defer();   //清空已发出请求；保存新的请求
            var conditionDto = {
                "carModelJYQuery.vehicleName": $scope.carInfoDto.vehicle_modelsh,
                "carModelJYQuery.uniqueId": $scope.uniqueID,
                "carModelJYQuery.requestType":"02",
                "carModelJYQuery.areaCode": $scope.mainReqDto.areaCode,
                "carModelJYQuery.priceConfigKind":"2",
                "carModelJYQuery.engineDesc":"排量",
                "carModelJYQuery.gearboxType":"档位",
                "carModelJYQuery.pageNum":$scope.paginationConf.currentPage
            };
            $scope.$apply(function () {
                finder.post("findCarModelJYQuery", conditionDto,{timeout:cancelRequest.promise}).then(
                    function(data){
                        cancelRequest = null;
                        if(data.data.body!=undefined){
                            $scope.carBrandDatalist=data.data.body.queryBrand;  //弹层左边品牌名字
                            $scope.cxList=data.data.body.queryFamily;  //车系下拉框
                            $scope.plList=data.data.body.queryEngineDesc;  //排量下拉框
                            $scope.dwList=data.data.body.queryGearboxType;  //档位下拉框
                            $scope.cxList.unshift({familyCode :"车系",familyName:"车系"});
                            $scope.plList.unshift({engineDesccode :"排量",engineDesc:"排量"});
                            $scope.dwList.unshift({gearboxcode :"档位",gearboxType:"档位"});
                            var queryVehicles = data.data.body.queryVehicle;
                            for(var i=0; i<queryVehicles.length;i++) {
                                queryVehicles[i].newModelName1= queryVehicles[i].newModelName.replace(/<[^>]+>/g,"");  //遍历展示title
                                queryVehicles[i].newModelName= $sce.trustAsHtml(queryVehicles[i].newModelName);
                            }
                            $scope.carDatalist = queryVehicles;       //遍历弹层展示的数据(正中间)
                            $scope.paginationConf.totalItems = data.data.body.totalNum;
                        }
                    }
                );
            })
        };
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 0,
            itemsPerPage: 8,
            pagesLength: 8,
            perPageOptions: [5, 10, 15, 20],
            onChange:pageCarMethod
        };
        $scope.condition = {
            pageNo: $scope.paginationConf.currentPage,
            pageSize: $scope.paginationConf.itemsPerPage
        };
        var timer;   //30ms内不调用
        $scope.keyupVehicleModel=function ($event) {
            $scope.layer_carMode=true;
            $scope.defaultModel=true;
            $scope.brandSearch=false;
            var offset = $($event.target).offset(),
                offTop = offset.top,
                offLeft = offset.left,
                h = $($event.target).outerHeight();
            $(".pop_brandmodel").css({
                top:offTop + h+12,
                left:offLeft - 250
            });
            $timeout.cancel(timer);  //30ms内不调用
            if($scope.carInfoDto.vehicle_modelsh != ""){
                timer=$timeout(BrandMethod, 300);  //30ms内不调用，延迟调用
            }
        };
        //================点击查车弹层左边的品牌==========
        var leftBrandMethod=function (d) {
            $scope.leftDatabrandCode=d;
            if($scope.leftDatabrandCode.brandCode==undefined && d.brandCode==undefined ){
                d.brandCode=$scope.carBrandDatalist[0].brandCode;
            }else {
                d.brandCode=$scope.leftDatabrandCode.brandCode;
            }
            // 切换品牌回到第一页
            $scope.paginationConf.currentPage = 1;
            var conditionDto = {
                "carModelJYQuery.vehicleName": $scope.carInfoDto.vehicle_modelsh,
                "carModelJYQuery.uniqueId":$scope.uniqueID,
                "carModelJYQuery.requestType":"02",
                "carModelJYQuery.areaCode":$scope.mainReqDto.areaCode,
                "carModelJYQuery.priceConfigKind":"2",
                "carModelJYQuery.brandCode":d.brandCode,    //左边品牌传参brandCode
                "carModelJYQuery.pageNum":$scope.paginationConf.currentPage
            };
            finder.post("findCarModelJYQuery", conditionDto).then(
                function(data){
                    if(data.data.body!=undefined) {
                        $scope.carBrandDatalist = data.data.body.queryBrand;  //弹层左边品牌名字
                        $scope.cxList = data.data.body.queryFamily;            //车系下拉框
                        $scope.plList = data.data.body.queryEngineDesc;       //排量下拉框
                        $scope.dwList = data.data.body.queryGearboxType;      //档位下拉框
                        $scope.cxList.unshift({familyCode: "车系", familyName: "车系"});
                        $scope.plList.unshift({engineDesccode: "排量", engineDesc: "排量"});
                        $scope.dwList.unshift({gearboxcode: "档位", gearboxType: "档位"});
                        var queryVehicles = data.data.body.queryVehicle;
                        for (var i = 0; i < queryVehicles.length; i++) {
                            queryVehicles[i].newModelName1= queryVehicles[i].newModelName.replace(/<[^>]+>/g,"");  //遍历展示title
                            queryVehicles[i].newModelName = $sce.trustAsHtml(queryVehicles[i].newModelName);
                        }
                        $scope.carDatalist = queryVehicles;       //遍历弹层展示的数据(正中间)
                        $scope.paginationConf.totalItems = data.data.body.totalNum;
                    }
                }
            );
        };
        $scope.isActive = 0;
        $scope.onleftBrand=function (d,index) {
            $scope.isActive = index;
            $scope.car.familyCode="车系";
            $scope.car.engineDesc="排量";
            $scope.car.gearboxType="档位";
            leftBrandMethod(d);
        }
        //================点击车系，排量，档位方法==========
        var ontopBrandMethod=function () {
            if($scope.leftDatabrandCode ==undefined && d.brandCode==undefined ){
                d.brandCode=$scope.carBrandDatalist[0].brandCode;
            }else if($scope.leftDatabrandCode!=undefined){
                d.brandCode=$scope.leftDatabrandCode.brandCode;
            }
            var conditionDto = {
                "carModelJYQuery.vehicleName": $scope.carInfoDto.vehicle_modelsh,
                "carModelJYQuery.uniqueId":$scope.uniqueID,
                "carModelJYQuery.requestType":"02",
                "carModelJYQuery.areaCode":$scope.mainReqDto.areaCode,
                "carModelJYQuery.priceConfigKind":"2",
                "carModelJYQuery.brandCode":d.brandCode,    //左边品牌传参brandCode
                "carModelJYQuery.familyName":$scope.car.familyName,    //车系传参familyCode
                "carModelJYQuery.familyCode":$scope.car.familyCode,    //车系传参familyCode
                "carModelJYQuery.engineDesc":$scope.car.engineDesc,   //排量传参engineDesc
                "carModelJYQuery.gearboxType":$scope.car.gearboxType,   //档位传参gearboxType
                "carModelJYQuery.pageNum":$scope.paginationConf.currentPage
            };
            finder.post("findCarModelJYQuery", conditionDto).then(
                function(data){
                    if(data.data.body!=undefined) {
                        $scope.carBrandDatalist = data.data.body.queryBrand;  //弹层左边品牌名字
                        var queryVehicles = data.data.body.queryVehicle;
                        if (data.data.body.queryVehicle == undefined) {
                            $scope.carDatalist = "";
                        } else {
                            for (var i = 0; i < queryVehicles.length; i++) {
                                queryVehicles[i].newModelName1 = queryVehicles[i].newModelName.replace(/<[^>]+>/g, "");  //遍历展示title
                                queryVehicles[i].newModelName = $sce.trustAsHtml(queryVehicles[i].newModelName);
                            }
                            $scope.carDatalist = queryVehicles;       //遍历弹层展示的数据(正中间)
                        }
                        $scope.paginationConf.totalItems = data.data.body.totalNum;
                    }
                }
            )
        };
        $scope.obj.CarUl=function () {
            ontopBrandMethod();
        }
        // =====================赋值================================================
        $scope.onAssignment=function (d) {
            $scope.seatCounts=true;
            $scope.car.seatcount = d.seat;
            $scope.car.vehicleName = d.vehicleName;
            $scope.car.parentId = d.parentId;
            $scope.car.vehicleFgwCode = d.vehicleFgwCode;
            //提示拼接
            $scope.familyName = d.familyName;
            $scope.engineDesc = d.engineDesc;
            $scope.gearboxType = d.gearboxType;
            $scope.newModelName1 = d.newModelName1;
            $scope.newPrice = d.newPrice;
            var conditionDto={
                "carModelQuery.carModel": $scope.car.vehicleName,
                "carModelQuery.requestType": "03",
                "carModelQuery.areaCode": $scope.mainReqDto.areaCode,
                "carModelQuery.cityCode": $scope.mainReqDto.cityCode,
                "carModelQuery.uniqueId": $scope.uniqueID,
                "carModelQuery.queryCode":$scope.car.vehicleFgwCode,
                "carModelQuery.frameNo": $scope.carInfoDto.frameno,
                "carModelQuery.vinNo": "",
                "carModelQuery.parentId": $scope.car.parentId,
                "carModelQuery.licenseType":"02",
                "carModelQuery.engineNo":"523346243264326",
                "carModelQuery.findCarListfrom": "",
                "carModelQuery.findCarByJYTime":"",
                "carModelQuery.findCarByInput":""
            };
            finder.post("findCarModel", conditionDto).then(
                function(data){
                    $scope.carInfoDto.vehicle_modelsh = data.data.body.standardName;
                    $scope.carInfoDto.seatcount = data.data.body.seat;
                    $scope.carCommInfo.seatCountFlag = 1;
                    $scope.layer_carMode=false;
                    $scope.carModelDetail= $scope.familyName+ $scope.engineDesc+$scope.gearboxType+$scope.newModelName1+$scope.newPrice;
                },function(error){
                }
            );
        };


        //根据子车型代码查车
        var findCarModel = function (data) {
            var conditionDto={
                "carModelQuery.carModel": data[0].vehicleName,
                "carModelQuery.requestType": "04",
                "carModelQuery.areaCode": $scope.mainReqDto.areaCode,
                "carModelQuery.cityCode": $scope.mainReqDto.cityCode,
                "carModelQuery.uniqueId": $scope.uniqueID,
                "carModelQuery.queryCode":data[0].vehicleID,
                "carModelQuery.frameNo": $scope.carInfoDto.frameno,
                "carModelQuery.parentId": data[0].vehicleID,
                "carModelQuery.licenseType":"02",
            };
            finder.post("findCarModel", conditionDto).then(
                function(data){
                    if(data.data.head.errorCode == "0000"){
                        $scope.carInfoDto.vehicle_modelsh = data.data.body.standardName;
                        $scope.carInfoDto.seatcount = data.data.body.seat;
                        $scope.carCommInfo.seatCountFlag = 1;
                        $scope.layer_carMode=false;
                    }
                },function(error){
                }
            );
        };
        //车型浮层
        $scope.brandtopTip=false;
        $scope.enterShow=function () {
            $scope.brandtopTip=true;
        };
        $scope.leaveHide=function () {
            $scope.brandtopTip=false;
        };
        //==========================点击"按品牌查车"================================
        $scope.brandSearch=false;
        $scope.jydbcarshow = false;
        $scope.searchMod=function () {
            $scope.defaultModel=false;
            $scope.brandSearch=true;
            $scope.jydbcarshow = false;
        };
        //===================全部品牌热门品牌切换=====================================
        $scope.curActive = "hotBrand";
        $scope.mainhotBrand = true;
        $scope.onhotBrand=function () {
            $scope.jydbcarshow = true;
            $scope.curActive = "hotBrand";
            $scope.mainhotBrand = true;
            $scope.mainAllBrand =false;
            $scope.showhot =true;
            $scope.showhotdetail =false;
            $scope.jydbgroupcarshow = false;
            queryCariconData();
        }
        $scope.onallBrand=function () {
            $scope.curActive = "allBrand";
            $scope.mainhotBrand = false;
            $scope.mainAllBrand =true;
            $scope.showall =true;
            $scope.showdetail =false;
            jyDbalpData();
        }
        //*************zhongyouli 查车*******************************************************************************
        $scope.jyIcon = "";
        $scope.jyBrandName = "";
        $scope.jyBrandId = "";
        $scope.jyFamilyId = "";
        $scope.jyGroupId = "";
        $scope.jyParentId = "";
        $scope.jyDisplacement = "";
        $scope.jyGearbox= "";
        $scope.jyFgwCode= "";
        $scope.jydbgroupcarshow = false;
        //精友库查车
        var findCarModelFromJYDB = function(jyflag,flag){
            var conditionDto = {
                "areaCode":$scope.mainReqDto.areaCode,
                "cityCode":$scope.mainReqDto.cityCode,
                "isRenewal":"2",
                "jyImportFlag":"",
                "head.requestType":"01",
                "head.requestCode":"",
                "head.uuid":$scope.uniqueID,
                "head.sessionId":"1c0d31e1-e4f7-4c99-84be-d7c7d086e765",
                "head.checkStr":"",
                "head.channelNo":"",
                "body.jyFlag":jyflag,
                "body.jyIcon":$scope.jyIcon,
                "body.jyBrandName":$scope.jyBrandName,
                "body.jyBrandId":$scope.jyBrandId,
                "body.jyFamilyId":$scope.jyFamilyId,
                "body.jyGroupId":$scope.jyGroupId,
                "body.jyDisplacement": $scope.jyDisplacement,
                //"body.jyGearbox": $scope.jyGearbox,
                "body.jyParentId":$scope.jyParentId,
                "body.jyFgwCode":$scope.jyFgwCode
            };
            if(flag=="1"&&$scope.openflag){
                finder.post("findCarModelFromJYDB1", conditionDto).then(
                    function (data) {
                        var datalist = data.data.body.Element.brandIcons.FcBrand;
                        for(var i=0; i<datalist.length;i++) {
                            datalist[i] .brandPic.Replace("/home/ecar/jy/pics","images")
                        }
                        $scope.jydbdetaillist = datalist;

                    }
                );
            }else if(flag=="2"&&$scope.openflag){
                finder.post("findCarModelFromJYDB2", conditionDto).then(
                    function (data) {

                        $scope.jydbdetailfindlist = data.data.body.Element.familys.FcFamily;

                    }
                );
            }else if(flag=="3"&&$scope.openflag){
                finder.post("findCarModelFromJYDB3", conditionDto).then(
                    function (data) {

                        $scope.cargrounplist = data.data.body.Element.groups.FcGroup;

                    }
                );
            }else if(flag=="4"&&$scope.openflag){
                finder.post("findCarModelFromJYDB4", conditionDto).then(
                    function (data) {

                        $scope.engineDesclist = data.data.body.Element.parents.FcParent;

                    }
                );
            }else if(flag=="5"&&$scope.openflag){
                finder.post("findCarModelFromJYDB5", conditionDto).then(
                    function (data) {

                        $scope.gearboxlist = data.data.body.Element.parents.FcParent;

                    }
                );
            }else if(flag=="6"&&$scope.openflag){
                finder.post("findCarModelFromJYDB6", conditionDto).then(
                    function (data) {

                        $scope.jyParentVehNamelist = data.data.body.Element.parents.FcParent;

                    }
                );
            }
            else if(flag=="7"&&$scope.openflag){
                finder.post("findCarModelFromJYDB7", conditionDto).then(
                    function (data) {

                        $scope.jyFgwCodelist = data.data.body.Element.parents.FcVehicle;

                    }
                );
            }
            else if(flag=="8"&&$scope.openflag){
                finder.post("findCarModelFromJYDB8", conditionDto).then(
                    function (data) {
                        $scope.brandSearch=false;
                        $scope.carInfoDto.vehicle_modelsh = data.data.body.modelName;

                    }
                );
            }
            else {
                finder.post("findCarModelFromJYDB", conditionDto).then(
                    function (data) {
                        if (jyflag == "11" && flag != "1") {
                            var datalist = data.data.body.Element.brandIcons.FcBrand;
                            for(var i=0; i<datalist.length;i++) {
                                datalist[i].brandPic=datalist[i].brandPic.replace("/home/ecar/jy/pics","images");
                            }
                            $scope.jydbdatalist = datalist;
                        } else if (jyflag == "10") {
                            $scope.jydbalplist = data.data.body.Element.brandIcons.FcBrand;
                        } else if (jyflag == "11" && flag == "1") {
                            var datalist = data.data.body.Element.brandIcons.FcBrand;
                            for(var i=0; i<datalist.length;i++) {
                                datalist[i].brandPic=datalist[i].brandPic.replace("/home/ecar/jy/pics","images");
                            }
                            $scope.jydbdetaillist = datalist;
                        }else if (jyflag == "20" ) {
                            $scope.jydbdetailfindlist = data.data.body.Element.familys.FcFamily;
                        }else if(jyflag == "21" && flag == "3"){
                            $scope.cargrounplist = data.data.body.Element.groups.FcGroup;
                        }else if(jyflag == "30" && flag == "4"){
                            $scope.engineDesclist = data.data.body.Element.parents.FcParent;
                        }else if(jyflag == "40" && flag == "5"){
                            $scope.gearboxlist = data.data.body.Element.parents.FcParent;
                        }else if(jyflag == "50" && flag == "6"){
                            $scope.jyParentVehNamelist = data.data.body.Element.parents.FcParent;
                        }else if(jyflag == "81" && flag == "7"){
                            $scope.jyFgwCodelist = data.data.body.Element.parents.FcVehicle;
                        }else if(jyflag == "70" && flag == "8"){
                            $scope.brandSearch=false;
                            $scope.jyIcon = "";
                            $scope.jyBrandName = "";
                            $scope.jyBrandId = "";
                            $scope.jyFamilyId = "";
                            $scope.jyGroupId = "";
                            $scope.jyParentId = "";
                            $scope.jyDisplacement = "";
                            $scope.jyGearbox= "";
                            $scope.jyFgwCode= "";
                            $scope.jydbdatalist = "";
                            $scope.jydbalplist ="";
                            $scope.jydbdetailfindlist="";
                            $scope.cargrounplist = "";
                            $scope.engineDesclist = "";
                            $scope.gearboxlist = "";
                            $scope.jyParentVehNamelist = "";
                            $scope.jyFgwCodelist = "";
                            $scope.layer_carMode = false;
                            $scope.carInfoDto.vehicle_modelsh = data.data.body.modelName;
                            $scope.seatCounts=true;
                            $scope.car.seatcount = data.data.body.seat;
                        }else if(jyflag == "60"){
                            $scope.jydbgroupcarshow = true;
                            $scope.grounppics = data.data.body.Element.parents.FcGroup;
                            $scope.grounppic = $scope.grounppics[0].thumbnailPath.replace("/home/ecar/jy/pics","images");;
                        }
                    }
                );
            }
        };

        //按图片查询
        var queryCariconData = function(){
            $scope.jyIcon = "";
            findCarModelFromJYDB("11","0");
        };
        //按字母查询
        var jyDbalpData = function(){

            findCarModelFromJYDB("10");
        };
        //按品牌型号
        var jyDbgetJYGroupInfo = function(){

            findCarModelFromJYDB("21");
        };
        //查询车组图片
        var jyDbgetJYGroupPicInfo= function(){
            findCarModelFromJYDB("60");
        }
        //查询排量
        var getJYDisplacementInfo= function(){
            findCarModelFromJYDB("30");
        }
        ////查询手自动（变速器）
        var getJYGearInfo= function(){
            findCarModelFromJYDB("40");
        }
        //查询父车型详情
        var getJYParentVehInfo= function(){
            findCarModelFromJYDB("50");
        }
        //查询车辆型号（发改委编码）


        var getJYFgwInfo= function(){
            findCarModelFromJYDB("70");
        }
        $scope.queryjydbbybrand = function($event){
            queryCariconData();
        }

        $scope.jyGroupfind = function(d){
            jyDbgetJYGroupPicInfo();
            getJYDisplacementInfo();
        }
        $scope.iconcarfind = function(d){
            queryCariconData();
        }
        //$scope.jyIcon = "";
        //$scope.jyBrandName = "";
        //$scope.jyBrandId = "";
        //$scope.jyFamilyId = "";
        //$scope.jyGroupId = "";
        //$scope.jyParentId = "";
        //$scope.jyIcon = "";
        $scope.alpcarfind = function(d){
            $scope.maindetailBrand =true;
            $scope.jyIcon = d.brandInitial;
            findCarModelFromJYDB("11","1");
        }
        $scope.detailiconcarfind = function(d){
            $scope.showall =false;
            $scope.showdetail =true;
            $scope.jyBrandName =d.brandName;
            $scope.jyBrandId =d.brandId;
            $scope.jydbalplist ="";
            $scope.jydbdetaillist ="";
            findCarModelFromJYDB("20","2");
        }
        $scope.caronefind = function(d){

            $scope.jyFamilyId =d.familyId;
            $scope.jydbcarbrand = d.brandName;
            findCarModelFromJYDB("21","3");
            $scope.jydbcarshow = false;
        }
        $scope.selectgroup = function(d){
            $scope.jyGroupId = $scope.carfind.groupId;
            jyDbgetJYGroupPicInfo();
            findCarModelFromJYDB("30","4");
        }
        $scope.selectengineDesc = function(d){
            $scope.jyDisplacement = $scope.carfind.engineDesc;
            findCarModelFromJYDB("40","5");
        }
        $scope.selectgearbox = function(d){
            $scope.jyGearbox = $scope.carfind.gearboxType;
            findCarModelFromJYDB("50","6");
        }
        $scope.selectjyParentVehName = function(d){
            $scope.jyParentId = $scope.carfind.parentVehId;
            findCarModelFromJYDB("81","7");
        }
        $scope.findjydbbtn = function(d){
            findCarModelFromJYDB("70","8");
        }
        $scope.hotdetailiconcarfind = function(d){
            $scope.showhot =false;
            $scope.showhotdetail =true;
            $scope.jyBrandName = d.brandName;
            $scope.jyBrandId = d.brandId;
            findCarModelFromJYDB("20","2");
        }
        $scope.selectjyFgwCode = function (d){
            $scope.jyFgwCode = $scope.carfind.vehicleFgwCode;
        }

        //*****************获取精确报价按钮************************
        var preForCalBIdata=function () {
            var conditionDto = {
                "insuredReqDtos[0].insuredFlag":"1000000",
                "insuredReqDtos[0].serialno":"1",
                "insuredReqDtos[1].insuredFlag":"0100000",
                "insuredReqDtos[1].serialno":"2",
                "insuredReqDtos[2].insuredFlag":"0010000",
                "insuredReqDtos[2].serialno":"3",
                "insuredReqDtos[3].insuredFlag":"0000000                 1",
                "insuredReqDtos[3].serialno":"4",
                "uniqueID":$scope.uniqueID,
                "carReqDto.engineno" : $scope.carInfoDto.engineno,
                "carReqDto.frameno" :$scope.carInfoDto.frameno,
                "carReqDto.vehicle_modelsh" : $scope.carInfoDto.vehicle_modelsh,
                "carReqDto.enrolldate" : $scope.carInfoDto.enrolldate,
                "carReqDto.ownerChangeDate" : $scope.carInfoDto.ownerChangeDate,
                "carReqDto.loanName" : $scope.carInfoDto.loanName,
                "carReqDto.seatcount":$scope.carInfoDto.seatcount,
                "insuredReqDtos[1].insuredname":$scope.insuredReqDtos[0].insuredname,
                "insuredReqDtos[1].identifytype":$scope.insuredReqDtos[0].identifytype,
                "insuredReqDtos[1].identifyno":$scope.insuredReqDtos[0].identifyno,
                "insuredReqDtos[1].birthday":$scope.insuredReqDtos[0].birthday,
                "mainReqDto.startDateBI":$scope.mainReqDto.startDateBI,
                "mainReqDto.startHourBI":$scope.mainReqDto.startHourBI,
                "mainReqDto.endDateBI":$scope.mainReqDto.endDateBI,
                "mainReqDto.endHourBI":$scope.mainReqDto.endHourBI,
                "carReqDto.haveOwnerChange": $scope.carInfoDto.haveOwnerChange,
                "carReqDto.isHaveLoan": $scope.carInfoDto.isHaveLoan
            };
            finder.post("preForCalBI", conditionDto).then(
                function(data){
                    if(data.data.resultCode == "1001"){
                        $scope.$broadcast(data.data.elementID,data.data.resultMsg);
                        $location.hash(data.data.elementID);
                        $anchorScroll();
                    }else if(data.data.resultCode == "1000"){
                        angular.alert({msg:data.data.resultMsg});
                    }else if(data.data.resultCode == "1002"){
                        angular.comfirm({"msg":data.data.resultMsg},function(){
                            window.open("http://10.10.40.21:7005/chexian/");
                        });
                    }else if(data.data.resultCode == "1003"){
                        angular.alert({msg:"需要先登录"})
                    }else if(data.data.resultCode == "1004"){
                        window.open("http://10.10.0.89:8212/newecar/views/proposal/refuse.jsp");
                    }else if(data.data.resultCode == "1000_CHECK" || data.data.resultCode == "1000_CHECKCI"){
                        $scope.layer_testCode=true;
                        $scope.checkCodeImg = data.data.checkCode;
                    }else if(data.data.resultCode == "1000_E"){
                        $scope.carInfoDto.vehicle_modelsh=data.data.platFormCarName; //重新赋值车型
                        angular.alert({msg:data.data.resultMsg})
                        showPlatFormCarModels(data.data);
                    }else if(data.data.resultFlag == true){
                        // window.open("http://10.10.40.21:7005/newecar/proposal/loadCalculateInfo");
                        // $state.go("calculate");
                        $state.go("calculate",{uuid:$scope.uniqueID});
                    }
                }
            );
        };



        $scope.obtainPrice=function () {
            console.log($scope.FormTest)
            // $state.go("calculate",{uuid: $scope.uniqueID});
            //校验通过后连接后台校验方法
            preForCalBIdata();
        };


        //车型不一致试重新查车
        var showPlatFormCarModels = function(data){
            var conditionDto ={
                "uniqueID":$scope.uniqueID,
                "platFormModelCode": data.platFormModelCode,
                "time" : new Date().getTime()
            };
            finder.post("getCarModelsByPlatFormModelCode", conditionDto).then(
                function(result){
                    if(result.data.length == 1){
                        angular.alert({msg:data.resultMsg})

                        findCarModel(result.data);
                    }
                });

        };
        //验证码弹层
        $scope.cancel=function () {
            $scope.layer_testCode=false;
        };

        //证件类型变化
        $scope.changeIdentifyTyp = function($select){
            // 表单脏了
            if($select.ctrl.$dirty == true){
                $scope.insuredReqDtos[0].changeIdentifyFlag = 1;
                if($scope.insuredReqDtos[0].identifytype == '01'){
                    $scope.carCommInfo.isIDCardFlag = 1;
                }else{
                    $scope.carCommInfo.isIDCardFlag = 0;
                }
                //  通知证件号码表单验证自己
                $scope.$broadcast('insuredIDNumber')
            }
        };
        //换一张
        $scope.layer_testCode=false;
        $scope.changeOne=function (d) {
            if(d==1){
                var  checkcode="change";
            }else if(d==2){
                if($scope.car.checkcodebi=="" || $scope.car.checkcodebi==undefined){
                    $scope.car.codeFlag="请输入验证码"
                }
                var  checkcode=$scope.car.checkcodebi;
            }
            var conditionDto ={
                "uniqueID":$scope.uniqueID,
                "checkcodebi": checkcode
            };
            finder.post("verificationForInsureQuery", conditionDto).then(
                function(data){
                    if(d==1){
                        $scope.checkCodeImg = data.data.checkCode;
                    }else if(d==2){
                        if(data.data.resultFlag==false){
                            $scope.car.codeFlag=data.data.resultFlag;
                        }else if(data.data.resultFlag==true){
                            $state.go("calculate",{uuid:$scope.uniqueID});
                        }
                    }
                }
            );
        }

        //================================离开页面将uuid状态置为0====================================================
        var setUUidNullCar = function(){
            var conditionDto ={
                "mainReqDto.pagestep": "car",
                "insuredReqDtos[0].insuredFlag":"1000000",
                "insuredReqDtos[0].serialno":"1",
                "insuredReqDtos[1].insuredFlag":"0100000",
                "insuredReqDtos[1].serialno":"2",
                "insuredReqDtos[2].insuredFlag":"0010000",
                "insuredReqDtos[2].serialno":"3",
                "insuredReqDtos[3].insuredFlag":"0000000                 1",
                "insuredReqDtos[3].serialno":"4",
                "mainReqDto.isRenewal":$scope.mainReqDto.isRenewal,
                "mainReqDto.reuseFlag":$scope.mainReqDto.reuseFlag,
                "TZFlag":"",
                "mainReqDto.areaCode":$scope.mainReqDto.areaCode,
                "mainReqDto.cityCode":$scope.mainReqDto.cityCode,
                "uniqueID":$scope.uniqueID,
                "licenseNo":$scope.bigData.licenseNo,
                "carReqDto.countryNature":"",
                "serverDateTime":$scope.carInfoDto.enrolldate,
                "carReqDto.frameNoFlag":$scope.carInfoDto.frameNoFlag,
                "carReqDto.vinNoFlag":$scope.carInfoDto.vinNoFlag,
                "carReqDto.engineNoFlag":$scope.carInfoDto.engineNoFlag,
                "carReqDto.engineno" : $scope.carInfoDto.engineno,
                "carReqDto.frameno" : $scope.carInfoDto.frameno,
                "carReqDto.vehicle_modelsh" : $scope.carInfoDto.vehicle_modelsh,
                "carReqDto.aliasName":"",
                "carReqDto.seatcount":$scope.carInfoDto.seatcount,
                "carReqDto.enrollDate" : $scope.carInfoDto.enrolldate,
                "mainReqDto.startDateBI" : $scope.mainReqDto.startDateBI,
                "mainReqDto.startHourBI":$scope.mainReqDto.startHourBI,
                "startHourBIReal":"0",
                "mainReqDto.endDateBI" : $scope.mainReqDto.endDateBI,
                "mainReqDto.endHourBI":$scope.mainReqDto.endHourBI,
                "carReqDto.haveOwnerChange":$scope.carInfoDto.haveOwnerChange,
                "carReqDto.isHaveLoan":$scope.carInfoDto.isHaveLoan,
                "carReqDto.ownerChangeDate" : $scope.carInfoDto.ownerChangeDate,
                "carReqDto.loanName" : $scope.carInfoDto.loanName.value,
                "insuredReqDtos[1].insuredname":$scope.insuredReqDtos[0].insuredname,
                "insuredReqDtos[1].identifytype":$scope.insuredReqDtos[0].identifytype,
                "insuredReqDtos[1].identifyno":$scope.insuredReqDtos[0].identifyno
            };
            finder.post("setUuidNullCar", conditionDto,{async:false});
        }
    }]);

});