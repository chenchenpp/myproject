/**
 * Created by zhuqianqian on 2017/12/01.
 */
define(
    [
        'utilities/constant/apiPath.constant',
        'mock/data/data'
    ],function (apiPath,jsonDB) {

        /**
         * 此处定义接口处理回调方法，对于需要特殊处理的接口，定义回调，覆盖默认的返回处理
         * @author admin
         * @date   2017/11/21
         * @param method
         * @param url
         * @param req 请求数据
         * @param res 返回数据
         * @returns {*} api处理结果
         */
        var initSelectTagCallBack = function(method, url, req, res){
            var param = JSON.parse(req);
            if(param.codeType == "PersonalIdentifyType") {
                return [200,res.PersonalIdentifyType]
            }else if(param.codeType == "BusinessNature") {
                return [200,res.BusinessNature]
            }
        };
        /**
         * 此处定义每个接口mock处理的映射表，相同系统接口请放在一起
         * name:接口名,无逻辑判断；desc:接口中文描述; method:接口处理方法(GET/POST); url:接口调用url,对应后台的url; data:接口返回值: callback:回调方法,用在需要对返回值特殊处理时,可空
         * @author admin
         * @date   2017/11/21
         */
        return [
            /** 系统接口 */
            // {"name":"menu", "desc":"菜单查询", "method":"POST", "url":config.backend.menuData, "data":jsonDB['menuData']},
            // {"name":"reportRegistrationQuery", "desc":"报案登记查询", "method":"POST", "url":config.backend.prplregistList, "data":jsonDB['prplregistList']},
            // {"name":"reportTaskQuery", "desc":"报案任务查询", "method":"POST", "url":config.backend.queryPrpLregistList, "data":jsonDB['queryPrpLregistList']}
            {"name":"getMarketing", "desc":"车惠活动", "method":"POST", "url":apiPath.ip+apiPath.getMarketing, "data":jsonDB['getMarketing']},
            {"name":"initNormalProposal", "desc":"初始化车险精确报价流程页面", "method":"POST", "url":apiPath.ip+apiPath.initNormalProposal, "data":jsonDB['initNormalProposal']},
            {"name":"checkEngineNo", "desc":"校验发动机号", "method":"POST", "url":apiPath.ip+apiPath.checkEngineNo, "data":jsonDB['checkEngineNo']},
            {"name":"checkFrameNo", "desc":"校验车辆识别号", "method":"POST", "url":apiPath.ip+apiPath.checkFrameNo, "data":jsonDB['checkFrameNo']},
            {"name":"checkInsurdeName", "desc":"校验被保险人姓名", "method":"POST", "url":apiPath.ip+apiPath.checkInsurdeName, "data":jsonDB['checkInsurdeName']},
            {"name":"checkInsuredIDNumber", "desc":"校验证件号码", "method":"POST", "url":apiPath.ip+apiPath.checkInsuredIDNumber, "data":jsonDB['checkInsuredIDNumber']},
            {"name":"checkloanName", "desc":"校验贷款车", "method":"POST", "url":apiPath.ip+apiPath.checkloanName, "data":jsonDB['checkloanName']},
            {"name":"saveCarInfo", "desc":"精确报价保存按钮", "method":"POST", "url":apiPath.ip+apiPath.saveCarInfo, "data":jsonDB['saveCarInfo']},
            {"name":"findCarModel", "desc":"品牌车型赋值", "method":"POST", "url":apiPath.ip+apiPath.findCarModel, "data":jsonDB['findCarModel']},
            {"name":"findCarModelJYQuery", "desc":"精友查询", "method":"POST", "url":apiPath.ip+apiPath.findCarModelJYQuery, "data":jsonDB['findCarModelJYQuery']},
            {"name":"checkCarPrice", "desc":"保费估算校验车价", "method":"POST", "url":apiPath.ip+apiPath.checkCarPrice, "data":jsonDB['checkCarPrice']},
            {"name":"quotedPrice", "desc":"保费估算计算保费", "method":"POST", "url":apiPath.ip+apiPath.quotedPrice, "data":jsonDB['quotedPrice']},
            {"name":"findIdentityType", "desc":"证件类型下拉框", "method":"POST", "url":apiPath.ip+apiPath.findIdentityType, "data":jsonDB['findIdentityType']},
            {"name":"findCarModelFromJYDB", "desc":"从精友库查车", "method":"POST", "url":apiPath.ip+apiPath.findCarModelFromJYDB, "data":jsonDB['findCarModelFromJYDB']},
            {"name":"findCarModelFromJYDB1", "desc":"从精友库查车", "method":"POST", "url":apiPath.ip+apiPath.findCarModelFromJYDB1, "data":jsonDB['findCarModelFromJYDB1']},
            {"name":"findCarModelFromJYDB2", "desc":"从精友库查车", "method":"POST", "url":apiPath.ip+apiPath.findCarModelFromJYDB2, "data":jsonDB['findCarModelFromJYDB2']},
            {"name":"findCarModelFromJYDB3", "desc":"从精友库查车", "method":"POST", "url":apiPath.ip+apiPath.findCarModelFromJYDB3, "data":jsonDB['findCarModelFromJYDB3']},
            {"name":"findCarModelFromJYDB4", "desc":"从精友库查车", "method":"POST", "url":apiPath.ip+apiPath.findCarModelFromJYDB4, "data":jsonDB['findCarModelFromJYDB4']},
            {"name":"findCarModelFromJYDB5", "desc":"从精友库查车", "method":"POST", "url":apiPath.ip+apiPath.findCarModelFromJYDB5, "data":jsonDB['findCarModelFromJYDB5']},
            {"name":"findCarModelFromJYDB6", "desc":"从精友库查车", "method":"POST", "url":apiPath.ip+apiPath.findCarModelFromJYDB6, "data":jsonDB['findCarModelFromJYDB6']},
            {"name":"findCarModelFromJYDB7", "desc":"从精友库查车", "method":"POST", "url":apiPath.ip+apiPath.findCarModelFromJYDB7, "data":jsonDB['findCarModelFromJYDB7']},
            {"name":"findCarModelFromJYDB8", "desc":"从精友库查车", "method":"POST", "url":apiPath.ip+apiPath.findCarModelFromJYDB8, "data":jsonDB['findCarModelFromJYDB8']},
            {"name":"preForCalBI", "desc":"获取精确报价", "method":"POST", "url":apiPath.ip+apiPath.preForCalBI, "data":jsonDB['preForCalBI']},
            {"name":"initCalculateInfo", "desc":"算费初始化", "method":"POST", "url":apiPath.ip+apiPath.initCalculateInfo, "data":jsonDB['initCalculateInfo']},
            {"name":"initKindInfo", "desc":"算费1", "method":"POST", "url":apiPath.ip+apiPath.initKindInfo, "data":jsonDB['initKindInfo']},
            {"name":"changeToOptPackage", "desc":"调整按钮", "method":"POST", "url":apiPath.ip+apiPath.changeToOptPackage, "data":jsonDB['changeToOptPackage']},
            {"name":"calculateForBatch", "desc":"算费2", "method":"POST", "url":apiPath.ip+apiPath.calculateForBatch, "data":jsonDB['calculateForBatch']}
        ]
    }
);