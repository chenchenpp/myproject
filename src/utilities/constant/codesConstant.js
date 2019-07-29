/**
 * DESC       : 人保新车险 组件使用数据常量存储
 * AUTHOR     : 人保新车险项目组
 * CREATEDATE : 2018/2/26
 * --------------------------------------------------------
 */
define([], function () {
    'use strict';
    var TipsConstant = {
        yesNo: [
            {
                "name": "是",
                "code": "1"
            }, {
                "name": "否",
                "code": "0"
            }
        ],
        gender:[ // "性别"
            {
                "name": "",
                "code": "appsex" // 男
            }, {
                "name": "",
                "code": "" // 女
            }
        ],
        emailHost: [
            "163.com",
            "qq.com",
            "sina.cn",
            "126.com",
            "hotmail.com",
            "gmail.com",
            "sohu.com",
            "sogou.com",
            "yahoo.com.cn",
            "139.com",
            "189.cn",
            "wo.com.cn",
            "tom.com",
            "msn.com",
            "21cn.com"
        ],
        opt:[
            {
                "kindName": "全面型车损险",
                "kindCode": "051027",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "机动车辆损失险",
                "kindCode": "050200",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "第三者责任保险",
                "kindCode": "050600",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "盗抢险",
                "kindCode": "050500",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "车上人员责任险 - 司机",
                "kindCode": "050701",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "车上人员责任险 - 乘客",
                "kindCode": "050702",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "自燃损失险",
                "kindCode": "050310",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "玻璃单独破碎险",
                "kindCode": "050231",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "精神损害抚慰金责任险",
                "kindCode": "050643",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "机动车损失保险无法找到第三方特约险",
                "kindCode": "050451",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "车身划痕损失险",
                "kindCode": "050210",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "指定修理厂险",
                "kindCode": "050252",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "发动机涉水损失险",
                "kindCode": "050291",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "法定节假日责任限额翻倍保险",
                "kindCode": "051047",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "车轮单独损坏除外特约保险",
                "kindCode": "051029",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            },
            {
                "kindName": "绝对免赔率特约条款保险",
                "kindCode": "051028",
                "amount": "-1",
                "iopStatus": "-1",
                "iopPremium": "0.00",
                "premium": "0"
            }
        ],

        rule:{
         //全面型车损险
            "051027":[
             "050310", //自燃损失险
             "050231", //玻璃险
             "050451", //无法找到第三方特约
             "050210", //车身划痕险
             "050252", //指定修理车险
             "050291"  //发动机涉水险
            ],
            //机动车
            "050200":[
                "051029", //车轮单独损坏除外特约保险
                "051028"  //绝对免赔率特约条款保险
            ],
            "initDisabled":[
                "050310", //自燃损失险
                "050231", //玻璃险
                "050451", //无法找到第三方特约
                "050210", //车身划痕险
                "050252", //指定修理车险
                "050291",  //发动机涉水险
                "051028",  //绝对免赔率特约条款保险,
                "051047",  //法定节假日责任限额翻倍保险
                "050643", //精神抚慰金
                "051029" //车轮单独损坏除外特约保险
            ]

            // //三者险
            //  "050600":[
            //     // "050643", //精神抚慰金
            //     "051047"  //法定节假日责任限额翻倍保险
            // ],
            // //司机
            // "05050701":[
            //     // "050643", //精神抚慰金
            // ],
            // //乘客
            // "05050702":[
            //     // "050643", //精神抚慰金
            // ]
        },

        riskList:[
            {
                "kindCode":"051027"//全面型车损险
            },
            {
                "kindCode":"050200"//机动车辆损失险
            },
            {
                "kindCode":"050600"//第三者责任险
            },
            {
                "kindCode":"050500"//盗抢险
            },
            {
                "kindCode":"050701"//车上人员责任险 - 司机
            },
            {
                "kindCode":"050702"//车上人员责任险 - 乘客
            },
            {
                "kindCode":"050310"//自燃损失险
            },
            {
                "kindCode":"050231"//玻璃单独破碎险
            },
            {
                "kindCode":"050643"//精神损害抚慰金责任险
            },
            {
                "kindCode":"051029"//车轮单独损坏除外特约保险
            },
            {
                "kindCode":"051028"//绝对免赔率特约条款
            },
            {
                "kindCode":"050451"//机动车损失保险无法找到第三方特约险
            },
            {
                "kindCode":"050210"//车身划痕损失险
            },
            {
                "kindCode":"050252"//指定修理厂险
            },
            {
                "kindCode":"050291"//发动机涉水损失险
            },
            {
                "kindCode":"051047"//法定节假日责任限额翻倍保险
            }
        ]


    };

    return TipsConstant;
});

