/**
 * Created by zqq on 2017/12/01.
 * 本地模拟假数据
 */
define({
    getMarketing: [{
        "activitydetailsCar": "网上买车险，自主选择保障方案，灵活又方便，保费全透明，支付更安心。",
        "activitytitleCar": "智能车险算一下就知道",
        "isLink": "0",
        "linkAddress": "",
        "marketingId": "4028c69f54a98fd40154c80c7a40046d",
        "marketingLanguage": "",
        "showfrom": ""
    }],   //车惠活动接口
    initNormalProposal:{
        "areaCode": "45000000",
        "carOwner": "",
        "ccaDescription": "",
        "ccaEmail": "",
        "ccaLink": "",
        "channelName": "0",
        "cityCode": "45130000",
        "cityCodeLast": "",
        "cmpid": "",
        "cookieValues": "",
        "ebsWebURL": "",
        "entryId": "",
        "iD": "",
        "isnewcar": "2",
        "licenseFlag": "",
        "licenseNo": "桂*",
        "packagetype": "",
        "uniqueID": "59b4cbf2-bc36-4b20-b141-e0409bc76ffb"
    },    //初始化车险精确报价流程页面
    checkEngineNo:{
        "endDateBI": "",
        "endHourBI": 24,
        "isRenewal": "",
        "maxStartDateBI": "",
        "minStartDateBI": "",
        "resUinqueMsg": "",
        "resUniqueCode": "",
        "resultCode": "0000",
        "resultMsg": "成功",
        "shourBIView": "",
        "startDateBI": "",
        "startHourBI": 0
    },    //校验发动机号
    checkFrameNo:{
        "elementID": "",
        "identifyNumber": "",
        "identifyType": "",
        "name": "",
        "resUinqueMsg": "",
        "resUniqueCode": "SUCCESS",
        "resultCode": "0000",
        "resultFlag": false,
        "resultMsg": "姓名需为至少2个中文字符（英文4-30)。",
        "resultUrl": "",
        "uniqueID": ""
    },  //校验车辆识别号
    checkInsurdeName:{
        "elementID": "insuredName",
        "identifyNumber": "",
        "identifyType": "",
        "name": "",
        "resUinqueMsg": "",
        "resUniqueCode": "CHECK0001_0038",
        "resultCode": "1001",
        "resultFlag": false,
        "resultMsg": "姓名需为至少2个中文字符（英文4-30)。",
        "resultUrl": "",
        "uniqueID": ""
    },    //校验被保险人姓名
    checkInsuredIDNumber:{
        "elementID": "insuredIDNumber",
        "identifyNumber": "",
        "identifyType": "",
        "name": "",
        "resUinqueMsg": "",
        "resUniqueCode": "SUCCESS",
        "resultCode": "0000",
        "resultFlag": true,
        "resultMsg": "",
        "resultUrl": "",
        "uniqueID": ""
    },  //校验证件号码
    checkloanName:{
        "elementID": "loanName",
        "identifyNumber": "",
        "identifyType": "",
        "name": "",
        "resUinqueMsg": "",
        "resUniqueCode": "SUCCESS",
        "resultCode": "0000",
        "resultFlag": true,
        "resultMsg": "",
        "resultUrl": "",
        "uniqueID": ""
    },  //校验贷款车
    saveCarInfo:{
        "elementID": "",
        "identifyNumber": "",
        "identifyType": "",
        "interimNo": "ZDAA2017000000000000000036895900",
        "name": "",
        "resUinqueMsg": "",
        "resUniqueCode": "",
        "resultCode": "1000",
        "resultFlag": true,
        "resultMsg": "已保存报价至会员中心",
        "resultUrl": "",
        "uniqueID": ""
    },  //保存信息按钮校验
    findCarModelJYQuery: {
        "head": {
            "errorCode": "0000",
            "errorMsg": "成功"
        },
        "body": {
            "pageSize": "8",
            "totalNum": "218",
            "queryVehicle": [
                {
                    "seat": "4",
                    "parentId": "4028b2b64cff98cb014d045e1e7107e1",
                    "price": "258800",
                    "newPrice": "258800",
                    "familyName": "大众up",
                    "brandName": "大众",
                    "engineDesc": "",
                    "newModelName": "<font color=\"red\">大众</font>electric up!纯电动轿车 2015款 纯电动 4座",
                    "gearboxType": "",
                    "displacement": "",
                    "vehicleFgwCode": "electric up!",
                    "vehicleName": "大众electric up!纯电动轿车",
                    "parentVehName": "2015款 纯电动"
                },
                {
                    "seat": "4",
                    "parentId": "4028b2b64cff98cb014d045f7c6b07e4",
                    "price": "100900",
                    "newPrice": "100900",
                    "familyName": "大众up",
                    "brandName": "大众",
                    "engineDesc": "1.0L",
                    "newModelName": "<font color=\"red\">大众</font>up! 1.0L轿车 2015款 Move 4座",
                    "gearboxType": "自动档",
                    "displacement": "0.999",
                    "vehicleFgwCode": "up! 1.0L",
                    "vehicleName": "大众up! 1.0L轿车",
                    "parentVehName": "2015款 Move"
                },
                {
                    "seat": "4",
                    "parentId": "4028b2b64cff98cb014d046011c507e5",
                    "price": "113900",
                    "newPrice": "113900",
                    "familyName": "大众up",
                    "brandName": "大众",
                    "engineDesc": "1.0L",
                    "newModelName": "<font color=\"red\">大众</font>up! 1.0L轿车 2015款 High 4座",
                    "gearboxType": "自动档",
                    "displacement": "0.999",
                    "vehicleFgwCode": "up! 1.0L",
                    "vehicleName": "大众up! 1.0L轿车",
                    "parentVehName": "2015款 High"
                },
                {
                    "seat": "7",
                    "parentId": "4028b28838b1bcb70138db2effbd38c8",
                    "price": "450000",
                    "newPrice": "450000",
                    "familyName": "大众TRANSPORTER",
                    "brandName": "大众",
                    "engineDesc": "2.5T",
                    "newModelName": "<font color=\"red\">大众</font>VOLKSWAGEN T5旅行车 2003款 标准版 7座",
                    "gearboxType": "手自一体",
                    "displacement": "2.5",
                    "vehicleFgwCode": "VOLKSWAGEN T5",
                    "vehicleName": "大众VOLKSWAGEN T5旅行车",
                    "parentVehName": "2003款 标准版"
                },
                {
                    "seat": "7",
                    "parentId": "4028b28838b1bcb70138db2e620638c5",
                    "price": "490000",
                    "newPrice": "490000",
                    "familyName": "大众TRANSPORTER",
                    "brandName": "大众",
                    "engineDesc": "2.5T",
                    "newModelName": "<font color=\"red\">大众</font>VOLKSWAGEN T5旅行车 2003款 豪华版 7座",
                    "gearboxType": "手自一体",
                    "displacement": "2.5",
                    "vehicleFgwCode": "VOLKSWAGEN T5",
                    "vehicleName": "大众VOLKSWAGEN T5旅行车",
                    "parentVehName": "2003款 豪华版"
                },
                {
                    "seat": "8",
                    "parentId": "4028b28838b1bcb70138db2d196938b7",
                    "price": "410000",
                    "newPrice": "410000",
                    "familyName": "大众TRANSPORTER",
                    "brandName": "大众",
                    "engineDesc": "2.5L",
                    "newModelName": "卡罗瓦雷CARAVELLE 2.5L客车 2003款 8座",
                    "gearboxType": "手动档",
                    "displacement": "2.461",
                    "vehicleFgwCode": "CARAVELLE 2.5L",
                    "vehicleName": "卡罗瓦雷CARAVELLE 2.5L客车",
                    "parentVehName": "2003款"
                },
                {
                    "seat": "8",
                    "parentId": "4028b28838b1bcb70138db2d9dbc38bb",
                    "price": "425000",
                    "newPrice": "425000",
                    "familyName": "大众TRANSPORTER",
                    "brandName": "大众",
                    "engineDesc": "2.5L",
                    "newModelName": "卡罗瓦雷CARAVELLE 2.5L客车 2003款 8座",
                    "gearboxType": "自动档",
                    "displacement": "2.461",
                    "vehicleFgwCode": "CARAVELLE 2.5L",
                    "vehicleName": "卡罗瓦雷CARAVELLE 2.5L客车",
                    "parentVehName": "2003款"
                },
                {
                    "seat": "8",
                    "parentId": "4028b28838b1bcb70138db2c98fe38b5",
                    "price": "360000",
                    "newPrice": "360000",
                    "familyName": "大众TRANSPORTER",
                    "brandName": "大众",
                    "engineDesc": "2.0L",
                    "newModelName": "卡罗瓦雷CARAVELLE 2.0L客车 2003款 8座",
                    "gearboxType": "手自一体",
                    "displacement": "1.984",
                    "vehicleFgwCode": "CARAVELLE 2.0L",
                    "vehicleName": "卡罗瓦雷CARAVELLE 2.0L客车",
                    "parentVehName": "2003款"
                }
            ],
            "queryFlag": "1",
            "pageNum": "1",
            "queryEngineDesc": [
                {
                    "engineDesc": "1.0L"
                },
                {
                    "engineDesc": "1.2T"
                },
                {
                    "engineDesc": "1.4L"
                },
                {
                    "engineDesc": "1.4T"
                },
                {
                    "engineDesc": "1.6L"
                },
                {
                    "engineDesc": "1.8L"
                },
                {
                    "engineDesc": "1.8T"
                },
                {
                    "engineDesc": "1.9L"
                },
                {
                    "engineDesc": "1.9T"
                },
                {
                    "engineDesc": "2.0L"
                },
                {
                    "engineDesc": "2.0T"
                },
                {
                    "engineDesc": "2.5L"
                },
                {
                    "engineDesc": "2.5T"
                },
                {
                    "engineDesc": "2.8L"
                },
                {
                    "engineDesc": "3.0L"
                },
                {
                    "engineDesc": "3.0T"
                },
                {
                    "engineDesc": "3.2L"
                },
                {
                    "engineDesc": "3.6L"
                },
                {
                    "engineDesc": "4.2L"
                },
                {
                    "engineDesc": "4.9T"
                },
                {
                    "engineDesc": "6.0L"
                }
            ],
            "queryFamily": [
                {
                    "familyCode": "DZA0AQ",
                    "familyName": "高尔夫GOLF"
                },
                {
                    "familyCode": "DZA0AA",
                    "familyName": "帕萨特PASSAT"
                },
                {
                    "familyCode": "DZA0AB",
                    "familyName": "途欢TIGUAN"
                },
                {
                    "familyCode": "DZA0AR",
                    "familyName": "辉腾PHAETON"
                },
                {
                    "familyCode": "DZA0AS",
                    "familyName": "甲壳虫BEETLE"
                },
                {
                    "familyCode": "DZA0AC",
                    "familyName": "夏朗SHARAN"
                },
                {
                    "familyCode": "DZA0AD",
                    "familyName": "途锐TOUAREG"
                },
                {
                    "familyCode": "DZA0AF",
                    "familyName": "大众TRANSPORTER"
                },
                {
                    "familyCode": "DZA0BX",
                    "familyName": "尚酷SCIROCCO"
                },
                {
                    "familyCode": "DZA0AG",
                    "familyName": "奕鸥EOS"
                },
                {
                    "familyCode": "DZA0AJ",
                    "familyName": "大众up"
                }
            ],
            "queryGearboxType": [
                {
                    "gearboxType": "手自一体"
                },
                {
                    "gearboxType": "自动档"
                },
                {
                    "gearboxType": "手动档"
                },
                {
                    "gearboxType": "双离合变速器"
                }
            ],
            "queryBrand": [
                {
                    "brandName": "大众",
                    "brandCode": "DZA0"
                },
                {
                    "brandName": "金杯",
                    "brandCode": "JBB0"
                },
                {
                    "brandName": "一汽大众",
                    "brandCode": "DZA1"
                },
                {
                    "brandName": "上海大众",
                    "brandCode": "DZA2"
                },
                {
                    "brandName": "上海大众斯柯达",
                    "brandCode": "SKA1"
                }
            ]
        }
    },   //新精友模糊查询
    findCarModel:{
        "head": {
            "errorCode": "0000",
            "errorMsg": "成功"
        },
        "body": {
            "absFlag": "有",
            "airbagNum": "4",
            "aliasName": "跃族1.0L AMT",
            "aliasNameViewFlag": "",
            "antiTheft": "有",
            "brand": "",
            "brandName": "大众",
            "countryNature": "02",
            "displacement": "0.999",
            "factoryName": "德国大众汽车股份公司",
            "familyName": "大众up",
            "fullWeight": "932",
            "gearboxName": "",
            "kindPrice": "0",
            "modelCode": "",
            "modelDesc": "",
            "modelName": "大众up",
            "price": "80000",
            "seat": "4",
            "seatFlag": "1",
            "serialno": "",
            "standardName": "大众up! 1.0L",
            "taxKindPrice": "0",
            "taxPrice": "85128",
            "tonCount": "",
            "tonnage": "0",
            "vehicleClassName": "轿车类",
            "vehicleCode": "DZABII0002"
        }
    },                    //品牌车型赋值
    checkCarPrice:{
        "elementID": "",
        "identifyNumber": "",
        "identifyType": "",
        "name": "",
        "resUinqueMsg": "",
        "resUniqueCode": "",
        "resultCode": "1001",
        "resultFlag": false,
        "resultMsg": "请在1-200万之间录入",
        "resultUrl": "",
        "uniqueID": ""
    },         //保费估算校验车价
    quotedPrice:{
        "eco": "2984.44",
        "ecomaket": "3730.56",
        "com": "4496.92",
        "commaket": "5621.15"
    },      //保费估算计算保费
    findIdentityType:[
        {"identifycode":"01","identifyname":"身份证"},
        {"identifycode":"02","identifyname":"户口薄"},
        {"identifycode":"03","identifyname":"护照"},
        {"identifycode":"04","identifyname":"军官证"},
        {"identifycode":"05","identifyname":"驾驶执照"},
        {"identifycode":"06","identifyname":"返乡证"},
        {"identifycode":"07","identifyname":"港澳身份证"},
        {"identifycode":"31","identifyname":"组织机构代码证"},
        {"identifycode":"99","identifyname":"其他"}
    ] ,              //证件类型下拉框
    findCarModelFromJYDB:{
        "head": {
            "sessionId": "",
            "errorCode": "00",
            "errorMsg": "成功",
            "checkStr": "",
            "requestType": "json",
            "uuid": "",
            "requestCode": ""
        },
        "body": {
            "common": {
                "resultMsg": "",
                "resultCode": ""
            },
            "Element": {
                "brandIcons": {
                    "FcBrand": [
                        {
                            "brandInitial": "A"
                        },
                        {
                            "brandInitial": "B"
                        },
                        {
                            "brandInitial": "C"
                        },
                        {
                            "brandInitial": "D"
                        },
                        {
                            "brandInitial": "F"
                        },
                        {
                            "brandInitial": "G"
                        },
                        {
                            "brandInitial": "H"
                        },
                        {
                            "brandInitial": "J"
                        },
                        {
                            "brandInitial": "K"
                        },
                        {
                            "brandInitial": "L"
                        },
                        {
                            "brandInitial": "M"
                        },
                        {
                            "brandInitial": "N"
                        },
                        {
                            "brandInitial": "O"
                        },
                        {
                            "brandInitial": "Q"
                        },
                        {
                            "brandInitial": "R"
                        },
                        {
                            "brandInitial": "S"
                        },
                        {
                            "brandInitial": "T"
                        },
                        {
                            "brandInitial": "W"
                        },
                        {
                            "brandInitial": "X"
                        },
                        {
                            "brandInitial": "Y"
                        },
                        {
                            "brandInitial": "Z"
                        }
                    ]
                }
            }
        }
    },
    findCarModelFromJYDB1:{
        "head": {
            "sessionId": "",
            "errorCode": "00",
            "errorMsg": "成功",
            "checkStr": "",
            "requestType": "json",
            "uuid": "",
            "requestCode": ""
        },
        "body": {
            "common": {
                "resultMsg": "",
                "resultCode": ""
            },
            "Element": {
                "brandIcons": {
                    "FcBrand": [
                        {
                            "brandName": "一汽奥迪",
                            "brandId": "402880861203d16701122d764d7a0085",
                            "brandPic": "/home/ecar/jy/pics/brand/ADA1.jpg"
                        },
                        {
                            "brandName": "讴歌",
                            "brandId": "I0000000000000000200000000000321",
                            "brandPic": "/home/ecar/jy/pics/brand/AKA0.jpg"
                        },
                        {
                            "brandName": "奥路卡",
                            "brandId": "4028808816ec9e150116f5ff053200ac",
                            "brandPic": "/home/ecar/jy/pics/brand/ALC0.jpg"
                        },
                        {
                            "brandName": "奥迪",
                            "brandId": "402880ef0cd29b61010cd7e6dade004d",
                            "brandPic": "/home/ecar/jy/pics/brand/ADA0.jpg"
                        },
                        {
                            "brandName": "奥克斯",
                            "brandId": "I0000000000000000200000000000322",
                            "brandPic": "/home/ecar/jy/pics/brand/AKD0.jpg"
                        },
                        {
                            "brandName": "阿斯顿-马丁",
                            "brandId": "I0000000000000000200000000000287",
                            "brandPic": "/home/ecar/jy/pics/brand/ASA0.jpg"
                        },
                        {
                            "brandName": "安驰",
                            "brandId": "402880991134d503011144d12bed0097",
                            "brandPic": "/home/ecar/jy/pics/brand/ACA0.jpg"
                        },
                        {
                            "brandName": "广汽讴歌",
                            "brandId": "4028b2b655edd02e015606ce3dfe2378",
                            "brandPic": "/home/ecar/jy/pics/brand/AKA1.jpg"
                        }
                    ]
                }
            }
        }
    },
    findCarModelFromJYDB2:{
        "head": {
            "sessionId": "",
            "errorCode": "00",
            "errorMsg": "成功",
            "checkStr": "",
            "requestType": "json",
            "uuid": "",
            "requestCode": ""
        },
        "body": {
            "common": {
                "resultMsg": "",
                "resultCode": ""
            },
            "Element": {
                "familys": {
                    "FcFamily": [
                        {
                            "brandName": "一汽奥迪",
                            "brandId": "402880861203d16701122d764d7a0085",
                            "familyAbbr": "A6",
                            "familyId": "402880ef0ca9c2b6010cc91c4fc30119"
                        },
                        {
                            "brandName": "一汽奥迪",
                            "brandId": "402880861203d16701122d764d7a0085",
                            "familyAbbr": 100,
                            "familyId": "I0000000000000000210000000000018"
                        },
                        {
                            "brandName": "一汽奥迪",
                            "brandId": "402880861203d16701122d764d7a0085",
                            "familyAbbr": "Q5",
                            "familyId": "4028808827035799012708102348035e"
                        },
                        {
                            "brandName": "一汽奥迪",
                            "brandId": "402880861203d16701122d764d7a0085",
                            "familyAbbr": "A4",
                            "familyId": "402880ef0ca9c2b6010cc86045c300f1"
                        },
                        {
                            "brandName": "一汽奥迪",
                            "brandId": "402880861203d16701122d764d7a0085",
                            "familyAbbr": "Q3",
                            "familyId": "4028b2883dc34916013dcf1597b81a09"
                        },
                        {
                            "brandName": "一汽奥迪",
                            "brandId": "402880861203d16701122d764d7a0085",
                            "familyAbbr": "奥迪A3",
                            "familyId": "4028b28844b618a00144f1b07be746d5"
                        }
                    ]
                }
            }
        }
    },
    findCarModelFromJYDB3:{
        "head": {
            "sessionId": "",
            "errorCode": "00",
            "errorMsg": "成功",
            "checkStr": "",
            "requestType": "json",
            "uuid": "",
            "requestCode": ""
        },
        "body": {
            "common": {
                "resultMsg": "",
                "resultCode": ""
            },
            "Element": {
                "groups": {
                    "FcGroup": [
                        {
                            "groupName": "(1999年至2005年)A6 C5",
                            "groupId": "901714b5c057ffc8000000002af8648a",
                            "groupCode": "ADA1AF01",
                            "familyId": "402880ef0ca9c2b6010cc91c4fc30119"
                        },
                        {
                            "groupName": "(2005年至2008年)A6L C6 大鬼脸",
                            "groupId": "90170e3dc057ffc800000000675e6718",
                            "groupCode": "ADA1AF02",
                            "familyId": "402880ef0ca9c2b6010cc91c4fc30119"
                        },
                        {
                            "groupName": "(2008年至2009年)A6L C6 大鬼脸",
                            "groupId": "4028808826173b04012620034b92043f",
                            "groupCode": "ADA1AF03",
                            "familyId": "402880ef0ca9c2b6010cc91c4fc30119"
                        },
                        {
                            "groupName": "(2009年至2012年)A6L C6 大鬼脸",
                            "groupId": "4028808826173b040126200430840440",
                            "groupCode": "ADA1AF04",
                            "familyId": "402880ef0ca9c2b6010cc91c4fc30119"
                        },
                        {
                            "groupName": "(2012年03月至今)A6L C7",
                            "groupId": "4028b288444f4391014453021e6704e6",
                            "groupCode": "ADA1AF05",
                            "familyId": "402880ef0ca9c2b6010cc91c4fc30119"
                        }
                    ]
                }
            }
        }
    },
    findCarModelFromJYDB4:{
        "head": {
            "sessionId": "",
            "errorCode": "00",
            "errorMsg": "成功",
            "checkStr": "",
            "requestType": "json",
            "uuid": "",
            "requestCode": ""
        },
        "body": {
            "common": {
                "resultMsg": "",
                "resultCode": ""
            },
            "Element": {
                "parents": {
                    "FcParent": [
                        {
                            "engineDesc": "2.0T",
                            "groupId": "90170e3dc057ffc800000000675e6718"
                        },
                        {
                            "engineDesc": "2.4L",
                            "groupId": "90170e3dc057ffc800000000675e6718"
                        },
                        {
                            "engineDesc": "2.8L",
                            "groupId": "90170e3dc057ffc800000000675e6718"
                        },
                        {
                            "engineDesc": "3.0L",
                            "groupId": "90170e3dc057ffc800000000675e6718"
                        },
                        {
                            "engineDesc": "3.2L",
                            "groupId": "90170e3dc057ffc800000000675e6718"
                        },
                        {
                            "engineDesc": "4.2L",
                            "groupId": "90170e3dc057ffc800000000675e6718"
                        }
                    ]
                }
            }
        }
    },
    findCarModelFromJYDB5:{
        "head": {
            "sessionId": "",
            "errorCode": "00",
            "errorMsg": "成功",
            "checkStr": "",
            "requestType": "json",
            "uuid": "",
            "requestCode": ""
        },
        "body": {
            "common": {
                "resultMsg": "",
                "resultCode": ""
            },
            "Element": {
                "parents": {
                    "FcParent": [
                        {
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "groupId": "90170e3dc057ffc800000000675e6718"
                        },
                        {
                            "gearboxType": 0,
                            "gearboxName": "手动档",
                            "groupId": "90170e3dc057ffc800000000675e6718"
                        },
                        {
                            "gearboxType": 1,
                            "gearboxName": "手自一体",
                            "groupId": "90170e3dc057ffc800000000675e6718"
                        }
                    ]
                }
            }
        }
    },
    findCarModelFromJYDB6:{
        "head": {
            "sessionId": "",
            "errorCode": "00",
            "errorMsg": "成功",
            "checkStr": "",
            "requestType": "json",
            "uuid": "",
            "requestCode": ""
        },
        "body": {
            "common": {
                "resultMsg": "",
                "resultCode": ""
            },
            "Element": {
                "parents": {
                    "FcParent": [
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 5,
                            "gearboxType": 0,
                            "gearboxName": "手动档",
                            "newPrice": 389600,
                            "price": 338300,
                            "parentVehName": "2005款 基本型",
                            "parentVehId": "9016122ac057ffc8000000004ec831d6",
                            "taxprice": 367200,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 0,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 384500,
                            "price": 384500,
                            "parentVehName": "2008款 技术型",
                            "parentVehId": "402880882558d7850125684f0366073c",
                            "taxprice": 417400,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 5,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 462200,
                            "price": 384500,
                            "parentVehName": "2005款 标准型",
                            "parentVehId": "402880883146f731013165180623103a",
                            "taxprice": 417400,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 0,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 518800,
                            "price": 384500,
                            "parentVehName": "2006款 技术领先型",
                            "parentVehId": "4028b2883948a78001394be768850057",
                            "taxprice": 417400,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 0,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 424600,
                            "price": 384500,
                            "parentVehName": "2006款 技术型",
                            "parentVehId": "4028b28846b8bb580146db3ead08296b",
                            "taxprice": 417400,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 0,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 460400,
                            "price": 428800,
                            "parentVehName": "2006款 舒适型",
                            "parentVehId": "4028b28846b8bb580146db410000296f",
                            "taxprice": 465500,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 5,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 428800,
                            "price": 428800,
                            "parentVehName": "2005款 舒适型",
                            "parentVehId": "4028b28846b8bb580146db4080be296d",
                            "taxprice": 465500,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 0,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 428800,
                            "price": 428800,
                            "parentVehName": "2008款 舒适型",
                            "parentVehId": "402880882558d78501256bb7e94007ab",
                            "taxprice": 465400,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 5,
                            "gearboxType": 1,
                            "gearboxName": "手自一体",
                            "newPrice": 470000,
                            "price": 428800,
                            "parentVehName": "2005款 舒适型",
                            "parentVehId": "90161305c057ffc800000000fedfe335",
                            "taxprice": 465400,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 5,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 456000,
                            "price": 428800,
                            "parentVehName": "2005款 舒适型",
                            "parentVehId": "4028b28846b8bb580146db4080be296d",
                            "taxprice": 465500,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 5,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 486100,
                            "price": 486100,
                            "parentVehName": "2008款 尊享型",
                            "parentVehId": "402880882558d78501256846b9d1072d",
                            "taxprice": 527600,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 5,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 506100,
                            "price": 486100,
                            "parentVehName": "2005款 尊贵型",
                            "parentVehId": "4028b28846b8bb580146db5eaec129cc",
                            "taxprice": 527600,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 5,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 486100,
                            "price": 486100,
                            "parentVehName": "2005款 尊贵型",
                            "parentVehId": "4028b28846b8bb580146db5fcd0329d3",
                            "taxprice": 527600,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 0,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 521100,
                            "price": 486100,
                            "parentVehName": "2006款 尊贵型",
                            "parentVehId": "4028b28846b8bb580146db5f2df429d1",
                            "taxprice": 527600,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 0,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 570200,
                            "price": 497100,
                            "parentVehName": "2005款 尊贵型",
                            "parentVehId": "4028b28846b8bb580146db6124b329d9",
                            "taxprice": 539600,
                            "familyName": "一汽奥迪A6"
                        },
                        {
                            "importFlag": 1,
                            "engineDesc": "2.4L",
                            "seat": 0,
                            "gearboxType": 1,
                            "gearboxName": "CVT",
                            "newPrice": 504700,
                            "price": 504700,
                            "parentVehName": "2005款 豪华型",
                            "parentVehId": "4028b28846b8bb580146db60aca529d6",
                            "taxprice": 547800,
                            "familyName": "一汽奥迪A6"
                        }
                    ]
                }
            }
        }
    },
    findCarModelFromJYDB7:{
        "head": {
            "sessionId": "",
            "errorCode": "00",
            "errorMsg": "成功",
            "checkStr": "",
            "requestType": "json",
            "uuid": "",
            "requestCode": ""
        },
        "body": {
            "common": {
                "resultMsg": "",
                "resultCode": ""
            },
            "Element": {
                "parents": {
                    "FcVehicle": [
                        {
                            "vehicleFgwCode": "FV7241CVTG"
                        }
                    ]
                }
            }
        }
    },
    findCarModelFromJYDB8:{
        "body": {
            "absFlag": "",
            "airbagNum": "",
            "aliasName": "",
            "aliasNameViewFlag": "",
            "antiTheft": "",
            "brand": "",
            "brandName": "",
            "countryNature": "03",
            "displacement": "",
            "factoryName": "",
            "familyName": "",
            "fullWeight": "",
            "kindPrice": "",
            "modelCode": "",
            "modelDesc": "",
            "modelName": "奥迪FV7241CVTG",
            "price": "",
            "seat": "5",
            "seatFlag": "1",
            "serialno": "",
            "standardName": "",
            "taxKindPrice": "",
            "taxPrice": "",
            "tonCount": "",
            "tonnage": "",
            "vehicleClassName": "",
            "vehicleCode": ""
        },
        "head": {
            "errorCode": "00",
            "errorMsg": "成功"
        }
    },
    preForCalBI:{
        "elementID": "frameNo",
        "identifyNumber": "",
        "identifyType": "",
        "name": "",
        "platFormBrand": "",
        "platFormCarName": "",
        "platFormModelCode": "",
        "platFormSeries": "",
        "resUinqueMsg": "",
        "resUniqueCode": "CHECK0001_0001",
        "resultCode": "1001",
        "resultFlag": false,
        "resultMsg": "请选择正确的初登日期",
        "resultUrl": "",
        "startHourNew": 0,
        "uniqueID": ""
    },     //获取精确报价
    changeToOptPackage:{
        "resUniqueCode": "SUCCESS",
        "resultCode": "0000",
        "resultFlag": true,
        "resultMsg": "",
    },
    initCalculateInfo12:{
        "areaCode": "45000000",
        "biselect": "",
        "brandName": "雅阁HG7230轿车",
        "ciInfluence": "true",
        "ciselect": "1",
        "cityCode": "45010000",
        "cityCodeLast": "",
        "defaultBuyEAD": "1",
        "eadbuystyle": "",
        "eadselect": "",
        "eadsum": "",
        "endDateBI": "2019年01月26日",
        "endDateCI": {
            "id": "endDateCI",
            "maxValue": "",
            "minValue": "",
            "value": "2019/01/26",
            "viewStatus": "3"
        },
        "endHourBI": "24",
        "endHourCI": {
            "id": "endHourCI",
            "maxValue": "",
            "minValue": "",
            "value": "24",
            "viewStatus": "3"
        },
        "engage": "每次事故绝对免赔额为100元或者损失金额的5%，以高者为准。汽车玻璃贴膜每次事故赔偿限额1000元。",
        "engagegl": "",
        "insuredEADName": "SDFSDF",
        "insuredcopies": "0",
        "insuredcount": "",
        "isCcaIDYel": "1",
        "isOpenEAD": "1",
        "isOpenYEL": "1",
        "jqInsuredcopies": "5",
        "licenseNo": "桂*",
        "numberYel": "2",
        "othercopies": "",
        "realprice": "100",
        "startDateBI": "2018年01月27日",
        "startDateCI": {
            "id": "startDateCI",
            "maxValue": "2018/04/26",
            "minValue": "2018/01/27",
            "value": "2018/01/27",
            "viewStatus": ""
        },
        "startHourBI": "0",
        "startHourCI": {
            "id": "startHourCI",
            "maxValue": "",
            "minValue": "",
            "value": "0",
            "viewStatus": "3"
        },
        "syInsuredcopies": "3",
        "yelAmount": "5000",
        "yel_insuredCopies": "1",
        "yelselect": "1"
    },   //算费初始化
    initCalculateInfo:{
        "calculateInItCommonDto":{
            "brandName":"雅阁HG7230",
            "carModelDetail":"",
            "ciInfluence":"false",
            "claimant":"0",
            "claimantFlag":"2",
            "comCardamageFlag":"0",
            "defaultBuyEAD":"0",
            "endDateBI":"2019年03月23日",
            "endHourBI":"24",
            "engage":"每次事故绝对免赔额为100元或者损失金额的5%，以高者为准。汽车玻璃贴膜每次事故赔偿限额1000元。",
            "engagegl":"",
            "insuredEADName":"dfgdfg",
            "isCcaIDYel":"1",
            "isOpenEAD":"1",
            "isOpenYEL":"1",
            "licenseNo":"桂*",
            "numberYel":"2",
            "realprice":"100",
            "startDateCIMax":"2018/06/21",
            "startDateCIMin":"2018/03/24",
            "startHourBI":"0"
        },
        "calculatePageReqDto":{
            "areaCode":"45000000",
            "biselect":"",
            "checkIsOffRenewal":"1",
            "ciselect":"0",
            "cityCode":"45130000",
            "eADFlag":"",
            "eadbuystyle":"0",
            "endDateCI":"2019/03/23",
            "endHourCI":24,
            "haveOwnerSelect":"0",
            "insuredYELcopies":"1",
            "insuredcopies":"1",
            "isHaveLoanFlag":"0",
            "isRevoke":"00",
            "loanNameVal":"",
            "othercopies":"1",
            "othernumber":"2",
            "packageName":"EconomyPackage",
            "sendEmail":"",
            "sendMobile":"",
            "sendMobileFlag":"",
            "startDateBI":"2018年03月24日",
            "startDateCI":"2018/03/24",
            "startHourCI":0,
            "uniqueID":"1fc03f3d-e3ed-4228-b4f9-812a785022cd",
            "yelAmount":"5000",
            "yelFlag":"1",
            "yelPerminum":"100"
        }
    },  //算费初始化
    initKindInfo:{
        "amount050200": 250000,
        "amount050200Max": 325000,
        "amount050200Min": 175000,
        "items": [
            {
                "amountList": "0|250000.00",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "250000.00",
                        "amountvalue": "250000.00"
                    }
                ],
                "kindCode": "050200",
                "kindName": "机动车辆损失险"
            },
            {
                "amountList": "0|50000|100000|150000|200000|300000|500000|1000000|1500000|2000000",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "50000",
                        "amountvalue": "50000"
                    },
                    {
                        "amounttype": "100000",
                        "amountvalue": "100000"
                    },
                    {
                        "amounttype": "150000",
                        "amountvalue": "150000"
                    },
                    {
                        "amounttype": "200000",
                        "amountvalue": "200000"
                    },
                    {
                        "amounttype": "300000",
                        "amountvalue": "300000"
                    },
                    {
                        "amounttype": "500000",
                        "amountvalue": "500000"
                    },
                    {
                        "amounttype": "1000000",
                        "amountvalue": "1000000"
                    },
                    {
                        "amounttype": "1500000",
                        "amountvalue": "1500000"
                    },
                    {
                        "amounttype": "2000000",
                        "amountvalue": "2000000"
                    }
                ],
                "kindCode": "050600",
                "kindName": "第三者责任险"
            },
            {
                "amountList": "0|250000.00",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "250000.00",
                        "amountvalue": "250000.00"
                    }
                ],
                "kindCode": "050500",
                "kindName": "盗抢险"
            },
            {
                "amountList": "0|10000|20000|30000|40000|50000|80000|100000|150000|200000",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "10000",
                        "amountvalue": "10000"
                    },
                    {
                        "amounttype": "20000",
                        "amountvalue": "20000"
                    },
                    {
                        "amounttype": "30000",
                        "amountvalue": "30000"
                    },
                    {
                        "amounttype": "40000",
                        "amountvalue": "40000"
                    },
                    {
                        "amounttype": "50000",
                        "amountvalue": "50000"
                    },
                    {
                        "amounttype": "80000",
                        "amountvalue": "80000"
                    },
                    {
                        "amounttype": "100000",
                        "amountvalue": "100000"
                    },
                    {
                        "amounttype": "150000",
                        "amountvalue": "150000"
                    },
                    {
                        "amounttype": "200000",
                        "amountvalue": "200000"
                    }
                ],
                "kindCode": "050701",
                "kindName": "车上人员责任险 - 司机"
            },
            {
                "amountList": "0|10000|20000|30000|40000|50000|80000|100000|150000|200000",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "10000",
                        "amountvalue": "1"
                    },
                    {
                        "amounttype": "20000",
                        "amountvalue": "2"
                    },
                    {
                        "amounttype": "30000",
                        "amountvalue": "3"
                    },
                    {
                        "amounttype": "40000",
                        "amountvalue": "4"
                    },
                    {
                        "amounttype": "50000",
                        "amountvalue": "5"
                    },
                    {
                        "amounttype": "80000",
                        "amountvalue": "8"
                    },
                    {
                        "amounttype": "100000",
                        "amountvalue": "10"
                    },
                    {
                        "amounttype": "150000",
                        "amountvalue": "15"
                    },
                    {
                        "amounttype": "200000",
                        "amountvalue": "20"
                    }
                ],
                "kindCode": "050702",
                "kindName": "车上人员责任险 - 乘客"
            },
            {
                "amountList": "0|250000.00",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "250000.00",
                        "amountvalue": "250000.00"
                    }
                ],
                "kindCode": "050310",
                "kindName": "自燃损失险"
            },
            {
                "amountList": "0|10|20",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "10",
                        "amountvalue": "国产玻璃"
                    },
                    {
                        "amounttype": "20",
                        "amountvalue": "进口玻璃"
                    }
                ],
                "kindCode": "050231",
                "kindName": "玻璃单独破碎险"
            },
            {
                "amountList": "0|2000|5000|10000",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "2000",
                        "amountvalue": "2000"
                    },
                    {
                        "amounttype": "5000",
                        "amountvalue": "5000"
                    },
                    {
                        "amounttype": "10000",
                        "amountvalue": "10000"
                    }
                ],
                "kindCode": "050210",
                "kindName": "车身划痕损失险"
            },
            {
                "amountList": "",
                "amountlists": [
                    {
                        "amounttype": "",
                        "amountvalue": ""
                    }
                ],
                "kindCode": "050900",
                "kindName": "不计免赔率特约条款"
            },
            {
                "amountList": "0|1",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "1",
                        "amountvalue": "投保"
                    }
                ],
                "kindCode": "050252",
                "kindName": "指定修理厂险"
            },
            {
                "amountList": "0|1",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "1",
                        "amountvalue": "投保"
                    }
                ],
                "kindCode": "050291",
                "kindName": "发动机涉水损失险"
            },
            {
                "amountList": "0|1",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "1",
                        "amountvalue": "投保"
                    }
                ],
                "kindCode": "050451",
                "kindName": "机动车损失保险无法找到第三方特约险"
            },
            {
                "amountList": "0|10000|20000|30000|40000|50000",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "10000",
                        "amountvalue": "10000"
                    },
                    {
                        "amounttype": "20000",
                        "amountvalue": "20000"
                    },
                    {
                        "amounttype": "30000",
                        "amountvalue": "30000"
                    },
                    {
                        "amounttype": "40000",
                        "amountvalue": "40000"
                    },
                    {
                        "amounttype": "50000",
                        "amountvalue": "50000"
                    }
                ],
                "kindCode": "050643",
                "kindName": "精神损害抚慰金责任险"
            },
            {
                "amountList": "0|1",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "1",
                        "amountvalue": "投保"
                    }
                ],
                "kindCode": "051047",
                "kindName": "法定节假日责任限额翻倍保险"
            },
            {
                "amountList": "0|1",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "1",
                        "amountvalue": "投保"
                    }
                ],
                "kindCode": "050911",
                "kindName": "机动车辆损失险"
            },
            {
                "amountList": "0|1",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "1",
                        "amountvalue": "投保"
                    }
                ],
                "kindCode": "050912",
                "kindName": "第三者责任险"
            },
            {
                "amountList": "0|1",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "1",
                        "amountvalue": "投保"
                    }
                ],
                "kindCode": "050921",
                "kindName": "盗抢险"
            },
            {
                "amountList": "0|1",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "1",
                        "amountvalue": "投保"
                    }
                ],
                "kindCode": "050928",
                "kindName": "车上人员责任险 - 司机"
            },
            {
                "amountList": "0|1",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "1",
                        "amountvalue": "投保"
                    }
                ],
                "kindCode": "050929",
                "kindName": "车上人员责任险 - 乘客"
            },
            {
                "amountList": "0|1",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "1",
                        "amountvalue": "投保"
                    }
                ],
                "kindCode": "050935",
                "kindName": "自燃损失险"
            },
            {
                "amountList": "0|1",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "1",
                        "amountvalue": "投保"
                    }
                ],
                "kindCode": "050922",
                "kindName": "车身划痕损失险"
            },
            {
                "amountList": "0|1",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "1",
                        "amountvalue": "投保"
                    }
                ],
                "kindCode": "050924",
                "kindName": "发动机涉水损失险"
            },
            {
                "amountList": "0|1",
                "amountlists": [
                    {
                        "amounttype": "-1",
                        "amountvalue": "不投保"
                    },
                    {
                        "amounttype": "1",
                        "amountvalue": "投保"
                    }
                ],
                "kindCode": "050917",
                "kindName": "精神损害抚慰金责任险"
            }
        ],
        "resUinqueMsg": "",
        "resUniqueCode": "",
        "resultCode": "0000",
        "resultMsg": "",
        "seatCount": 5,
        "userpriceconf": "1"
    },   //算费初始化下拉框
    calculateForBatch:{
        "bi":{
            "amount050200":250000,
            "amount050200Max":325000,
            "amount050200Min":175000,
            "com_ori":11151.88,
            "com_sum":6848.68,
            "ecoAndCom":[
                {
                    "com":{
                        "amount":500000,
                        "iopPremium":173.62,
                        "iopStatus":"1",
                        "premium":1331.07
                    },
                    "eco":{
                        "amount":500000,
                        "iopPremium":173.62,
                        "iopStatus":"1",
                        "premium":1331.07
                    },
                    "kindCode":"050600",
                    "kindName":"第三者责任保险"
                },
                {
                    "com":{
                        "amount":80000,
                        "iopPremium":22.54,
                        "iopStatus":"1",
                        "premium":172.82
                    },
                    "eco":{
                        "amount":40000,
                        "iopPremium":11.27,
                        "iopStatus":"1",
                        "premium":86.41
                    },
                    "kindCode":"050702",
                    "kindName":"车上人员责任险(乘客)"
                },
                {
                    "com":{
                        "amount":20000,
                        "iopPremium":8.89,
                        "iopStatus":"1",
                        "premium":68.14
                    },
                    "eco":{
                        "amount":10000,
                        "iopPremium":4.44,
                        "iopStatus":"1",
                        "premium":34.06
                    },
                    "kindCode":"050701",
                    "kindName":"车上人员责任险(司机)"
                },
                {
                    "com":{
                        "amount":1,
                        "iopPremium":19.4,
                        "iopStatus":"1",
                        "premium":148.73
                    },
                    "eco":{
                        "amount":0,
                        "premium":0
                    },
                    "kindCode":"050291",
                    "kindName":"发动机特别损失险条款"
                },
                {
                    "com":{
                        "amount":20000,
                        "iopPremium":23.12,
                        "iopStatus":"1",
                        "premium":138.72
                    },
                    "eco":{
                        "amount":0,
                        "premium":0
                    },
                    "kindCode":"050643",
                    "kindName":"精神损害抚慰金责任险"
                },
                {
                    "com":{
                        "amount":10,
                        "premium":343.19
                    },
                    "eco":{
                        "amount":0,
                        "premium":0
                    },
                    "kindCode":"050231",
                    "kindName":"玻璃单独破碎险条款"
                },
                {
                    "com":{
                        "amount":250000,
                        "iopPremium":43.35,
                        "iopStatus":"1",
                        "premium":260.1
                    },
                    "eco":{
                        "amount":0,
                        "premium":0
                    },
                    "kindCode":"050310",
                    "kindName":"自燃损失险条款"
                },
                {
                    "com":{
                        "amount":250000,
                        "iopPremium":169.07,
                        "iopStatus":"1",
                        "premium":1014.4
                    },
                    "eco":{
                        "amount":250000,
                        "iopPremium":169.07,
                        "iopStatus":"1",
                        "premium":1014.4
                    },
                    "kindCode":"050500",
                    "kindName":"盗抢险"
                },
                {
                    "com":{
                        "amount":2000,
                        "iopPremium":43.35,
                        "iopStatus":"1",
                        "premium":332.35
                    },
                    "eco":{
                        "amount":0,
                        "premium":0
                    },
                    "kindCode":"050210",
                    "kindName":"车身划痕损失险条款"
                },
                {
                    "com":{
                        "amount":250000,
                        "iopPremium":387.98,
                        "iopStatus":"1",
                        "premium":2974.5
                    },
                    "eco":{
                        "amount":250000,
                        "iopPremium":387.98,
                        "iopStatus":"1",
                        "premium":2974.5
                    },
                    "kindCode":"050200",
                    "kindName":"机动车损失保险"
                },
                {
                    "com":{
                        "amount":1,
                        "premium":64.66
                    },
                    "eco":{
                        "amount":0,
                        "premium":0
                    },
                    "kindCode":"050451",
                    "kindName":"机动车损失保险无法找到第三方特约险"
                }
            ],
            "eco_ori":8858.82,
            "eco_sum":5440.44,
            "opt":[
                {
                    "amount":500000,
                    "iopPremium":173.62,
                    "iopStatus":"1",
                    "kindCode":"050600",
                    "kindName":"第三者责任保险",
                    "premium":1331.07
                },
                {
                    "amount":250000,
                    "iopPremium":387.98,
                    "iopStatus":"1",
                    "kindCode":"050200",
                    "kindName":"机动车损失保险",
                    "premium":2974.5
                },
                {
                    "amount":10000,
                    "iopPremium":4.44,
                    "iopStatus":"1",
                    "kindCode":"050701",
                    "kindName":"车上人员责任险(司机)",
                    "premium":34.06
                },
                {
                    "amount":250000,
                    "iopPremium":169.07,
                    "iopStatus":"1",
                    "kindCode":"050500",
                    "kindName":"盗抢险",
                    "premium":1014.4
                },
                {
                    "amount":40000,
                    "iopPremium":11.27,
                    "iopStatus":"1",
                    "kindCode":"050702",
                    "kindName":"车上人员责任险(乘客)",
                    "premium":86.41
                }
            ],
            "opt_ori":8858.82,
            "opt_sum":5440.44,
            "userpriceconf":"1"
        },
        "biSelect":"1",
        "ci":{
            "carShipTaxMessage":{
                "delayPayTax":"0.0",
                "payEndDate":"2017-12-31",
                "payStartDate":"2017-04-11",
                "prePayTax":"0.0",
                "prepayTaxYear":"",
                "thisPayTax":"540.0"
            },
            "checkcode":"",
            "checkcodeFlag":"",
            "ciPremiumMessage":{
                "premium":"950.0",
                "premiumBZcp":"",
                "rateBZfalg":"",
                "sumNetPremiumCI":"896.23"
            },
            "endDateNew":"2019/03/16",
            "endHourNew":24,
            "errorInfo":"",
            "hourNew":0,
            "localmsg":"",
            "localmsgflag":"",
            "needRefreshBI":"0",
            "stareDateNew":"2018/03/17"
        },
        "ciSelect":"1",
        "needRefreshBI":"1",
        "resUinqueMsg":"",
        "resUniqueCode":"SUCCESS",
        "resultCode":"0000",
        "resultMsg":"成功"
    },   //算费初始化保额保费
    calculateForBatch23:{
        "bi":{
            "amount050200":250000,
            "amount050200Max":325000,
            "amount050200Min":175000,
            "com_ori":11151.88,
            "com_sum":6848.68,
            "ecoAndCom":[
                {
                    "com":{
                        "amount":500000,
                        "iopPremium":173.62,
                        "iopStatus":"1",
                        "premium":1331.07
                    },
                    "eco":{
                        "amount":500000,
                        "iopPremium":173.62,
                        "iopStatus":"1",
                        "premium":1331.07
                    },
                    "kindCode":"050600",
                    "kindName":"第三者责任保险"
                },
                {
                    "com":{
                        "amount":80000,
                        "iopPremium":22.54,
                        "iopStatus":"1",
                        "premium":172.82
                    },
                    "eco":{
                        "amount":40000,
                        "iopPremium":11.27,
                        "iopStatus":"1",
                        "premium":86.41
                    },
                    "kindCode":"050702",
                    "kindName":"车上人员责任险(乘客)"
                },
                {
                    "com":{
                        "amount":20000,
                        "iopPremium":8.89,
                        "iopStatus":"1",
                        "premium":68.14
                    },
                    "eco":{
                        "amount":10000,
                        "iopPremium":4.44,
                        "iopStatus":"1",
                        "premium":34.06
                    },
                    "kindCode":"050701",
                    "kindName":"车上人员责任险(司机)"
                }
            ],
            "eco_ori":8858.82,
            "eco_sum":5440.44,
            "opt":[
                {
                    "amount":500000,
                    "iopPremium":173.62,
                    "iopStatus":"1",
                    "kindCode":"050600",
                    "kindName":"第三者责任保险",
                    "premium":1331.07
                },
                {
                    "amount":250000,
                    "iopPremium":387.98,
                    "iopStatus":"1",
                    "kindCode":"050200",
                    "kindName":"机动车损失保险",
                    "premium":2974.5
                },
                {
                    "amount":10000,
                    "iopPremium":4.44,
                    "iopStatus":"1",
                    "kindCode":"050701",
                    "kindName":"车上人员责任险(司机)",
                    "premium":34.06
                },
                {
                    "amount":250000,
                    "iopPremium":169.07,
                    "iopStatus":"1",
                    "kindCode":"050500",
                    "kindName":"盗抢险",
                    "premium":1014.4
                },
                {
                    "amount":40000,
                    "iopPremium":11.27,
                    "iopStatus":"1",
                    "kindCode":"050702",
                    "kindName":"车上人员责任险(乘客)",
                    "premium":86.41
                }
            ],
            "opt_ori":8858.82,
            "opt_sum":5440.44,
            "userpriceconf":"1"
        },
        "biSelect":"1",
        "ci":{
            "carShipTaxMessage":{
                "delayPayTax":"0.0",
                "payEndDate":"2017-12-31",
                "payStartDate":"2017-04-11",
                "prePayTax":"0.0",
                "prepayTaxYear":"",
                "thisPayTax":"540.0"
            },
            "checkcode":"",
            "checkcodeFlag":"",
            "ciPremiumMessage":{
                "premium":"950.0",
                "premiumBZcp":"",
                "rateBZfalg":"",
                "sumNetPremiumCI":"896.23"
            },
            "endDateNew":"2019/03/16",
            "endHourNew":24,
            "errorInfo":"",
            "hourNew":0,
            "localmsg":"",
            "localmsgflag":"",
            "needRefreshBI":"0",
            "stareDateNew":"2018/03/17"
        },
        "ciSelect":"1",
        "needRefreshBI":"1",
        "resUinqueMsg":"",
        "resUniqueCode":"SUCCESS",
        "resultCode":"0000",
        "resultMsg":"成功"
    }   //算费初始化保额保费
});