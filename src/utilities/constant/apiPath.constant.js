/**
 * Created by zqq on 2017/12/01.
 */
define([], function () {
    'use strict';
    var ApiPathConstant = {
        ip: '/newecar/',                              //测试环境
        riskdata:'mock/data/riskdata.json',
        getMarketing:'proposal/findMarketing',    //车惠活动接口
        insureItem:'components/loadInsuranceInfo/mode/insureItem.html',    //条款
        initNormalProposal: 'proposal/initNormalProposal',  //初始化车险精确报价流程页面
        checkEngineNo:'ajaxcheck/checkEngineNo',    //校验发动机号
        checkFrameNo:'ajaxcheck/checkFrameNo',       //校验车辆识别号
        checkInsurdeName:'ajaxcheck/checkInsurdeName',    //校验被保险人姓名
        checkInsuredIDNumber:'ajaxcheck/checkInsuredIDNumber',    //校验证件号码
        checkloanName:'ajaxcheck/checkloanName',         //校验贷款车
        saveCarInfo:'interim/saveCarInfo',                 //保存信息按钮校验
        preForCalBI:'proposal/newPreForCalBI',                 //获取精确报价按钮
        findCarModelJYQuery:'car/findCarModelJYQuery',    //新精友模糊查询
        findCarModel:'car/findCarModel',                    //品牌车型赋值
        checkCarPrice:'ajaxcheck/checkCarPrice',             //保费估算校验车价
        quotedPrice:'calculate/quotedPrice',                  //保费估算计算保费
        findIdentityType:'proposal/findIdentityType',        //证件类型下拉框
        findCarModelFromJYDB:'car/findCarModelFromJYDB',                     //从精友库中查车型
        findCarModelJYForDX:'car/findCarModelJYForDX',
        findCarModelFromJYDB1:'car/findCarModelFromJYDB1',
        findCarModelFromJYDB2:'car/findCarModelFromJYDB2',
        findCarModelFromJYDB3:'car/findCarModelFromJYDB3',
        findCarModelFromJYDB4:'car/findCarModelFromJYDB4',
        findCarModelFromJYDB5:'car/findCarModelFromJYDB5',
        findCarModelFromJYDB6:'car/findCarModelFromJYDB6',
        findCarModelFromJYDB7:'car/findCarModelFromJYDB7',
        findCarModelFromJYDB8:'car/findCarModelFromJYDB8',
        verificationForInsureQuery:'proposal/verificationForInsureQuery',   //验证码换一张
        initKindInfo:'calculate/initKindInfo',   //算费页初始化下拉框
        calculateForBatch:'calculate/calculateForBatchNew',   //算费页初始化保额保费
        calculateCI:'calculate/calculateCINew',               //交强险默认不购买—购买
        cancelCalculateCI:'calculate/cancelCalculateCINew',   //交强险默认购买—不购买
        initCalculateInfo:'proposal/initCalculateInfo',      //算费页初始化
        saveCalculateInfo:'interim/saveCalculateInfo',      //算费页保存信息
        getMAndE:'followup/getMAndE',                              //算费页发送报价
        checkInsuredMobile:'ajaxcheck/checkInsuredMobile',      //算费页发送报价-手机号码
        checkInsuredEmail:'ajaxcheck/checkInsuredEmail',      //算费页发送报价-电子邮箱
        sendPrice:'followup/sendPrice',      //算费页发送报价-确定按钮
        calculateBIForChangeItemKind:'calculate/calculateBIForChangeItemKindNew',      //自由选择方案内调整
        changeToOptPackage:'proposal/changeToOptPackage',      //调整按钮
        calBackToCarPage:'proposal/calBackToCarPage',   //算费页返回车辆信息页面
        loadInsuranceOrderDetail:'insurance/loadInsuranceOrderDetail',   //提交订单页-初始化险种详情数据
        initInsuranceInfo:'proposal/initInsuranceInfo',   //提交订单页-初始化页面数据
        checkCarOwnerName:'ajaxcheck/checkCarOwnerName',   //车主姓名
        checkAppliName:'ajaxcheck/checkAppliName',   //投保人姓名
        toInsurance:'proposal/toInsuranceNew',//算费页跳转关系人页面
        saveInsuranceForGoBack:'insurance/saveInsuranceForGoBack',
        checkAddressName:'ajaxcheck/checkAddressName',    //配送信息-收件人姓名
        saveProposal:'proposal/saveProposalNew',  //提交订单
        saveInsuranceInfo:'interim/saveInsuranceInfo', //提交订单页-保存信息
        toEcashier:'proposal/cancelSafeToEcashier',   //跳转到收银台
        checkRenewal:'renewal/checkRenewal',    //续保证件号码页-立即报价
        getCarModelsByPlatFormModelCode:'car/getCarModelsByPlatFormModelCode', //根据平台返回的车型代码获取精友车型信息
        calculateForRenewalNew:'calculate/calculateForRenewalNew',  //续保页 (算费接口)
        restorePackageNew:'calculate/restorePackageNew', //续保页 (取消调整)
        contrastCombosNew:'calculate/contrastCombosNew', //续保页 (方案对比接口)
        initUUidState:'uuid/initUUidState', //初始化uuid状态
        setUuidNullCar:'interim/setUuidNullCar',//车辆信息页关页面
        setUuidNullCalcu:'interim/setUuidNullCalcu',//算费页关页面
        setUuidNullInsured:'interim/setUuidNullInsured'//关系人页关页面

    };

    return ApiPathConstant;
});
