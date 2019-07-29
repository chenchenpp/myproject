/**
 * Created by crx on 2018/01/16.
 */
define(['components/loadInsuranceInfo/insureItem.dirc'], function () {
    'use strict';
    return ['$scope', '$state', '$location', '$anchorScroll', '$sce','$stateParams','$compile', 'finder','interimServ','$templateCache', function ($scope, $state, $location, $anchorScroll, $sce,$stateParams,$compile,finder,interimServ) {
        $("html,body").animate({
            scrollTop:0
        },300);
        $scope.car={};

        //错误提示框
        var errorHtml="<div class=\"errorTips newerrorTips\" >\n" +
            "<i class=\"tip\"></i>\n" + "<div class=\"tips2\">\n" +
            "</div>\n" + "</div>";
        //================================初始化uuid状态====================================================
        interimServ.initUUidState($stateParams.uuid);
        //================================离开页面将uuid状态置为0====================================================
        window.onbeforeunload = function(){
            setUuidNullInsured();
        }
        //================================= 车惠活动=================================
        var carDescss=function () {
            var conditionDto = {
                "cityCode":$scope.loadpageCom.cityCode,
                "flowtype":"0",
                "productname":"2",
                "producttype":"2",
                "requestType":"5",
                "showaddress":"3",
                "showpage":"5"
            };
            finder.post("getMarketing", conditionDto).then(
                function(data){
                    if( data.data == "null" ){
                        $scope.carDescList=""
                    }else {
                        $scope.carDescList= data.data;
                    }
                }
            );
        };
        //***************************************页面数据初始化*******************************************
        var submittion=function(){
            var conditionDto = {};
            conditionDto.uniqueID = $stateParams.uuid;
            $scope.uniqueID = $stateParams.uuid;
            finder.post("initInsuranceInfo", conditionDto).then(
                function(data){
                    $scope.loadpageCom=data.data.insuranceCommonInfo;
                    $scope.loadpageDetDto=data.data.insuranceDetailReqDto;
                    carDescss();
                    if(!angular.isUndefined($scope.loadpageCom.sYDate)){
                        $scope.loadpageCom.sYDate = $scope.loadpageCom.sYDate.split("至")[0]+"生效";
                    }
                    if(!angular.isUndefined($scope.loadpageCom.jQCCDate)){
                        $scope.loadpageCom.jQCCDate = $scope.loadpageCom.jQCCDate.split("-")[0]+"生效";
                    }
                    if(!angular.isUndefined($scope.loadpageCom.eADDate)){
                        $scope.loadpageCom.eADDate = $scope.loadpageCom.eADDate.split("-")[0]+"生效";
                    }
                    if(!angular.isUndefined($scope.loadpageCom.yELDate)){
                        $scope.loadpageCom.yELDate = $scope.loadpageCom.yELDate.split("-")[0]+"生效";
                    }

                    //被保险人对象
                    $scope.insureds = {};
                    $scope.insureds.name = $scope.loadpageDetDto.insuredName;
                    $scope.insureds.IdTypeName = $scope.loadpageCom.appliIdTypeName; //证件名称
                    $scope.insureds.IdType = $scope.loadpageDetDto.insuredIdentifyType; //证件名称对应编号
                    $scope.insureds.IdNumber = $scope.loadpageDetDto.insuredIdentifyNumber; //证件号码
                    $scope.insureds.mobile = $scope.loadpageDetDto.insuredPhoneNumber; //手机号
                    $scope.insureds.mail = $scope.loadpageDetDto.insuredMail; //邮箱

                    //车主对象
                    if($scope.loadpageDetDto.isCarOwnerSameAsInsured==1){
                        $scope.carOwner = $scope.insureds;
                    }else{
                        $scope.carOwner = {};
                        $scope.carOwner.name = $scope.loadpageDetDto.carOwnerName;
                        $scope.carOwner.IdTypeName = $scope.loadpageDetDto.carOwnerChangeIdentifyFlag;
                        $scope.carOwner.IdType = $scope.loadpageDetDto.carOwnerIdentifyType;
                        $scope.carOwner.IdNumber = $scope.loadpageDetDto.carOwnerIdentifyNumber;
                        $scope.carOwner.mobile = $scope.loadpageDetDto.carOwnerPhoneNumber;
                        $scope.carOwner.mail = $scope.loadpageDetDto.carOwnerMail;
                    }
                    //投保人对象
                    if($scope.loadpageDetDto.isAppliSameAsInsured==1){
                        $scope.applis = $scope.insureds;
                    }else if($scope.loadpageDetDto.isAppliSameAsCarOwner==1){
                        $scope.applis = $scope.carOwner;
                    }else{
                        $scope.applis = {};
                        $scope.applis.name = $scope.loadpageDetDto.appliName;
                        $scope.applis.IdTypeName = $scope.loadpageCom.appliIdTypeName; //证件名称
                        $scope.applis.IdType = $scope.loadpageDetDto.appliIdentifyType;
                        $scope.applis.IdNumber = $scope.loadpageDetDto.appliIdentifyNum;
                        $scope.applis.mobile = $scope.loadpageDetDto.appliPhoneNumber;
                        $scope.applis.mail = $scope.loadpageDetDto.appliMail;
                    }

                    //配送信息对象
                    $scope.addRess = {};
                    $scope.addRess.name = $scope.loadpageDetDto.addressName;
                    $scope.addRess.mobile = $scope.loadpageDetDto.addressPhoneNumber;
                    $scope.addRess.mail = $scope.loadpageDetDto.policyOfEmail;
                    //配送信息-否同被保险人标识
                    if($scope.loadpageDetDto.isAddressSameAsInsured==1){
                        $scope.addRess=$scope.insureds;
                    }
                    //配送信息-同车主标识
                    if($scope.loadpageDetDto.isAddressSameAsCarOwner==1){
                        $scope.addRess=$scope.carOwner
                    }
                    // 保单及发票默认值
                    $scope.loadpageDetDto.jQepolicyflag = $scope.loadpageDetDto.jQepolicyflag || 'Y';
                    $scope.loadpageDetDto.epolicyflag = $scope.loadpageDetDto.epolicyflag || 'Y';
                    $scope.loadpageDetDto.invoiceflag = $scope.loadpageDetDto.invoiceflag || 'E';
                    $scope.loadpageDetDto.invoiceTitle = $scope.loadpageDetDto.invoiceTitle || $scope.applis.name
                }
            );
        };
        submittion();

        var SelectList = function () {
            var conditionDto = {};
            finder.post("findIdentityType", conditionDto).then(
                function(data){
                    $scope.selectList2 = data.data;
                    $scope.selectList3 = data.data;
                }
            );
        };
        SelectList();
        //***************************************弹层详情初始化*******************************************
        var layerDet=function(){
            var conditionDto = {};
            conditionDto.uniqueID = $stateParams.uuid;
            // conditionDto.uniqueID = "3748546e-4578-4d59-b853-274fb534396f";
            // $scope.uniqueID = "6bf6e68b-e386-4c24-a859-fdd91097abb2";
            // $scope.uniqueID =  $stateParams.uuid;
            finder.post("loadInsuranceOrderDetail", conditionDto).then(
                function(data){
                    $scope.loadDetail=data.data;
                    $scope.BiTabList=data.data.mianItemKinds;   //商业险
                    $scope.loadDetail.eadAmount=data.data.eadAmount.substring(0,1)+"万"; //意外险保额
                    $scope.loadDetail.eadAmounts="0."+data.data.eadAmount.substring(0,1)+"万";  //意外险保额
                }
            );
        };
        layerDet();
        //*************************************人员信息*******************************************
        //人员信息切换
        $scope.showInsured=function (d) {
            $scope.insured=d;
            setTimeout(function () {
                var newHeight=$('#' + d)[0].clientHeight + 12;
                $(".com-style-left").css("height",newHeight)
            },0)
        };
        $scope.showInsured(3);

        //车主信息--同被保险人
        $scope.clickMark1=function () {
            if($scope.loadpageDetDto.isCarOwnerSameAsInsured=="1"){ // 勾掉时
                $scope.loadpageDetDto.isCarOwnerSameAsInsured=0;
                $scope.carOwner = angular.copy($scope.insureds);
            }else {
                $scope.loadpageDetDto.isCarOwnerSameAsInsured=1;
                $scope.carOwner = $scope.insureds;
            }
            if($scope.loadpageDetDto.isAppliSameAsCarOwner==1){ // 无论勾掉或者勾中时 投保人同车主情况下都要重新更新 投保人 引用
                $scope.applis = $scope.carOwner;
            }
            if($scope.loadpageDetDto.isAddressSameAsCarOwner==1){ // 无论勾掉或者勾中时 配送信息同车主情况下都要重新更新 配送信息人 引用
                $scope.addRess = $scope.carOwner;
            }
        };
        //投保人信息--同被保险人、同车主
        $scope.withInsuredInfo=function (d) {
            // 同被保险人
            if($scope.loadpageDetDto.isAppliSameAsInsured == 0){ // 为勾中
                $scope.loadpageDetDto.isAppliSameAsInsured=1;
                $scope.loadpageDetDto.isAppliSameAsCarOwner=0;
                $scope.applis = $scope.insureds; // 建立联系
            } else { // 勾掉
                $scope.loadpageDetDto.isAppliSameAsInsured=0;
                $scope.applis = angular.copy($scope.insureds); // 断开联系
            }
        };
        $scope.withCarOwnerInfo=function (d){
            // 同车主
            if($scope.loadpageDetDto.isAppliSameAsCarOwner == 0){ // 为勾中
                $scope.loadpageDetDto.isAppliSameAsCarOwner=1;
                $scope.loadpageDetDto.isAppliSameAsInsured=0;
                $scope.applis = $scope.carOwner; // 建立联系
            } else { // 勾掉
                $scope.loadpageDetDto.isAppliSameAsCarOwner=0;
                $scope.applis = angular.copy($scope.carOwner); // 断开联系
            }
        };
        //***********************************离焦时的校验********************************************
        var IDCheck = function (conditionDto,callback) {
            conditionDto.areaCode = "45000000";
            conditionDto.uniqueID = $scope.uniqueID;
            return finder.post("checkInsuredIDNumber", conditionDto).then(
                function(data){
                    if(data.data.resultFlag == false){
                        return callback(data.data.resultMsg)
                    }else{
                        return callback()
                    }
                }
            );
        };
        $scope.rule = {
            emailRule:{
                validator:function (val, callback) {
                    var conditionDto = {
                        "email":val,
                        "uniqueID":$scope.uniqueID
                    };
                    finder.post("checkInsuredEmail", conditionDto).then(
                        function(data){
                            if(data.data.resultFlag == false){
                                return callback(data.data.resultMsg)
                            }else{
                                return callback()
                            }
                        }
                    );
                }
            },
            mobileRule:{
                validator:function (val, callback) {
                    var conditionDto = {
                        "mobile":val,
                        "uniqueID":$scope.uniqueID,
                        "insurType":"1"
                    };
                    finder.post("checkInsuredMobile", conditionDto).then(
                        function(data){
                            if(data.data.resultFlag == false){
                                return callback(data.data.resultMsg)
                            }else{
                                return callback()
                            }
                        }
                    );
                }
            },
            addressNameRule:{
                validator:function (val, callback) {
                    var conditionDto = {
                        "addressName": val,
                        "areaCode": "45000000",
                        "cityCode": "45110000",
                        "uniqueID": $scope.uniqueID
                    };
                    finder.post("checkAddressName", conditionDto).then(
                        function(data){
                            if(data.data.resultFlag == false){
                                return callback(data.data.resultMsg)
                            }else{
                                return callback()
                            }
                        }
                    );
                }
            },
            carOwnerNameRule:{
                validator:function (val, callback) {
                    var conditionDto = {
                        "carOwnerName": val,
                        "areaCode": "45000000",
                        "cityCode": "45110000",
                        "uniqueID": $scope.uniqueID
                    };
                    finder.post("checkCarOwnerName", conditionDto).then(
                        function(data){
                            if(data.data.resultFlag == false){
                                return callback(data.data.resultMsg)
                            }else{
                                return callback()
                            }
                        }
                    );
                }
            },
            appliNameRule:{
                validator:function (val, callback) {
                    var conditionDto = {
                        "appliName": val,
                        "areaCode": "45000000",
                        "cityCode": "45110000",
                        "uniqueID": $scope.uniqueID
                    };
                    finder.post("checkAppliName", conditionDto).then(
                        function(data){
                            if(data.data.resultFlag == false){
                                return callback(data.data.resultMsg)
                            }else{
                                return callback()
                            }
                        }
                    );
                }
            },
            insuredIDNumberRule:{
                validator:function (val, callback) {
                    var conditionDto = {};
                    conditionDto.insuredIDNumber = $scope.applis.IdNumber;
                    conditionDto.insuredIDType =$scope.applis.IdType;
                    IDCheck(conditionDto,callback)
                }
            },
            carOwnerIDNumberRule:{
                validator:function (val, callback) {
                    var conditionDto = {};
                    conditionDto.insuredIDNumber = $scope.carOwner.IdNumber;
                    conditionDto.insuredIDType =$scope.carOwner.IdType;
                    IDCheck(conditionDto,callback)
                }
            }
        };
        //*******************************************配送信息******************************************
        //配送信息--同被保险人、同车主
        $scope.addressMarkWithInsured=function () {
            // 同被保险人
            if($scope.loadpageDetDto.isAddressSameAsInsured == 0){ // 勾中
                $scope.loadpageDetDto.isAddressSameAsInsured=1;
                $scope.loadpageDetDto.isAddressSameAsCarOwner=0;
                $scope.addRess = $scope.insureds; // 建立联系
            } else { // 勾掉
                $scope.loadpageDetDto.isAddressSameAsInsured=0;
                $scope.addRess = angular.copy($scope.insureds); // 断开联系
            }
        };
        $scope.addressMarkWithCarOwner=function(){
            // 同车主
            if($scope.loadpageDetDto.isAddressSameAsCarOwner== 0){ // 勾中
                $scope.loadpageDetDto.isAddressSameAsCarOwner = 1;
                $scope.loadpageDetDto.isAddressSameAsInsured=0;
                $scope.addRess = $scope.carOwner; // 建立联系
            } else { // 勾掉
                $scope.loadpageDetDto.isAddressSameAsCarOwner=0;
                $scope.addRess = angular.copy($scope.carOwner); // 断开联系
            }
        };

        //************************************************************四大险种详情******************************************
        $scope.insureDetail=function (d) {
            $scope.showdetail = d;
            if( $scope.showTitle==d){
                $scope.showTitle= 0;
                $scope.showPlan = 0;
                $scope.showdetail = 0;
            }else {
                $scope.showTitle=d;
                $scope.showPlan = d;
                $scope.showdetail = d;
            }
        };

        //礼品
        $scope.curYuan = "p1";
        $scope.choosep=function (d) {
            if(d==1) {
                $scope.curYuan = "p1";
            }else if(d==2){
                $scope.curYuan = "p2";
            }else if(d==3){
                $scope.curYuan = "p3";
            }
        };
        //********************************************************** 险种条款 ****************************************

        $scope.$on("agreeSure",function (event) {
            $scope.loadpageDetDto.verifyAgreement=1;
            $scope.loadpageDetDto.verifyAgreementforSMS = 1;
        });
        //********************************************************** 险种条款end ****************************************

        /**************************************返回上一步***************************************************/
        $scope.backToCal=function () {
            $scope.loadpageDetDto.insuredPhoneNumber = $scope.insureds.mobile;
            $scope.loadpageDetDto.insuredMail = $scope.insureds.mail;
            $scope.loadpageDetDto.carOwnerName = $scope.carOwner.name;
            $scope.loadpageDetDto.carOwnerIdentifyType = $scope.carOwner.IdType;
            $scope.loadpageDetDto.carOwnerIdentifyNumber  = $scope.carOwner.IdNumber;
            $scope.loadpageDetDto.carOwnerMail = $scope.carOwner.mail;
            $scope.loadpageDetDto.carOwnerPhoneNumber = $scope.carOwner.mobile;
            $scope.loadpageDetDto.appliName = $scope.carOwner.name;
            $scope.loadpageDetDto.appliIdentifyType = $scope.applis.IdType;
            $scope.loadpageDetDto.appliIdentifyNum  = $scope.applis.IdNumber;
            $scope.loadpageDetDto.appliPhoneNumber = $scope.applis.mobile;
            $scope.loadpageDetDto.appliMail = $scope.applis.mail;
            $scope.loadpageDetDto.addressName = $scope.addRess.name;
            $scope.loadpageDetDto.addressPhoneNumber = $scope.addRess.mobile;
            $scope.loadpageDetDto.policyOfEmail = $scope.addRess.mail;
            var conditionDto = $scope.loadpageDetDto;
            conditionDto.uniqueid = $scope.uniqueID,
            finder.post("saveInsuranceForGoBack",conditionDto).then(
                function(result){
                     if(result.data.resultCode == '0000'){
                            $state.go("calculate",{uuid:$scope.uniqueID});
                     }
                }
            );
        };
        /**************************************提交订单***************************************************/
        $scope.saveProposal = function () {
            $scope.loadpageDetDto.insuredPhoneNumber = $scope.insureds.mobile;
            $scope.loadpageDetDto.insuredMail = $scope.insureds.mail;
            $scope.loadpageDetDto.carOwnerName = $scope.carOwner.name;
            $scope.loadpageDetDto.carOwnerIdentifyType = $scope.carOwner.IdType;
            $scope.loadpageDetDto.carOwnerIdentifyNumber  = $scope.carOwner.IdNumber;
            $scope.loadpageDetDto.carOwnerMail = $scope.carOwner.mail;
            $scope.loadpageDetDto.carOwnerPhoneNumber = $scope.carOwner.mobile;
            $scope.loadpageDetDto.appliName = $scope.carOwner.name;
            $scope.loadpageDetDto.appliIdentifyType = $scope.applis.IdType;
            $scope.loadpageDetDto.appliIdentifyNum  = $scope.applis.IdNumber;
            $scope.loadpageDetDto.appliPhoneNumber = $scope.applis.mobile;
            $scope.loadpageDetDto.appliMail = $scope.applis.mail;
            $scope.loadpageDetDto.addressName = $scope.addRess.name;
            $scope.loadpageDetDto.addressPhoneNumber = $scope.addRess.mobile;
            $scope.loadpageDetDto.policyOfEmail = $scope.addRess.mail;
            $scope.loadpageDetDto.appliIsResident = 'A';
            var conditionDto = $scope.loadpageDetDto;
            conditionDto.uniqueid = $scope.uniqueID;
            finder.post("saveProposal",conditionDto).then(
                function(result){
                    if(result.data.resultCode == "1001"){
                        $scope.$broadcast(result.data.elementID,result.data.resultMsg);
                        $location.hash(result.data.elementID);
                        $anchorScroll();
                    }else if(result.data.resultCode == '0000'){
                        toEcashier(result.data);
                    }
                }
            );

        };
        /**************************************保存***************************************************/
        $scope.saveCarInfo=function () {
            $scope.loadpageDetDto.insuredPhoneNumber = $scope.insureds.mobile;
            $scope.loadpageDetDto.insuredMail = $scope.insureds.mail;
            $scope.loadpageDetDto.carOwnerName = $scope.carOwner.name;
            $scope.loadpageDetDto.carOwnerIdentifyType = $scope.carOwner.IdType;
            $scope.loadpageDetDto.carOwnerIdentifyNumber  = $scope.carOwner.IdNumber;
            $scope.loadpageDetDto.carOwnerMail = $scope.carOwner.mail;
            $scope.loadpageDetDto.carOwnerPhoneNumber = $scope.carOwner.mobile;
            $scope.loadpageDetDto.appliName = $scope.carOwner.name;
            $scope.loadpageDetDto.appliIdentifyType = $scope.applis.IdType;
            $scope.loadpageDetDto.appliIdentifyNum  = $scope.applis.IdNumber;
            $scope.loadpageDetDto.appliPhoneNumber = $scope.applis.mobile;
            $scope.loadpageDetDto.appliMail = $scope.applis.mail;
            $scope.loadpageDetDto.addressName = $scope.addRess.name;
            $scope.loadpageDetDto.addressPhoneNumber = $scope.addRess.mobile;
            $scope.loadpageDetDto.policyOfEmail = $scope.addRess.mail;
            var conditionDto = $scope.loadpageDetDto;
            conditionDto.uniqueid = $scope.uniqueID;
            finder.post("saveInsuranceInfo",conditionDto).then(
                function(result){
                    if(result.data.resultCode == '0000'){
                        // $state.go("calculate",{uuid:$scope.uniqueID});
                    }else if(result.data.resultCode == "1003"){
                        angular.alert({msg: "需要先登录"})
                    }
                }
            );
        }
        /************************************跳转收银台*************************************************/
        var toEcashier = function(data){
            var conditionDto = {
                "proposalnoBI_sub":data.proposalNoBI,
                "proposalnoCI_sub":data.proposalNoCI
            };
            finder.post("toEcashier",conditionDto).then(
                function(result){
                    var newUrl = result.data.curUrl + "/ecashier/pay?outOrderId="+result.data.orderId+"&source="+result.data.source+"&key="+result.data.key;
                    window.location.href = newUrl;
                }
            );
        }
        //================================离开页面将uuid状态置为0====================================================
        var setUuidNullInsured = function(){
            $scope.loadpageDetDto.insuredPhoneNumber = $scope.insureds.mobile;
            $scope.loadpageDetDto.insuredMail = $scope.insureds.mail;
            $scope.loadpageDetDto.carOwnerName = $scope.carOwner.name;
            $scope.loadpageDetDto.carOwnerIdentifyType = $scope.carOwner.IdType;
            $scope.loadpageDetDto.carOwnerIdentifyNumber  = $scope.carOwner.IdNumber;
            $scope.loadpageDetDto.carOwnerMail = $scope.carOwner.mail;
            $scope.loadpageDetDto.carOwnerPhoneNumber = $scope.carOwner.mobile;
            $scope.loadpageDetDto.appliName = $scope.carOwner.name;
            $scope.loadpageDetDto.appliIdentifyType = $scope.applis.IdType;
            $scope.loadpageDetDto.appliIdentifyNum  = $scope.applis.IdNumber;
            $scope.loadpageDetDto.appliPhoneNumber = $scope.applis.mobile;
            $scope.loadpageDetDto.appliMail = $scope.applis.mail;
            $scope.loadpageDetDto.addressName = $scope.addRess.name;
            $scope.loadpageDetDto.addressPhoneNumber = $scope.addRess.mobile;
            $scope.loadpageDetDto.policyOfEmail = $scope.addRess.mail;
            var conditionDto = $scope.loadpageDetDto;
            conditionDto.uniqueid = $scope.uniqueID,
            finder.post("setUuidNullInsured", conditionDto,{async:false});
        }
    }];
});