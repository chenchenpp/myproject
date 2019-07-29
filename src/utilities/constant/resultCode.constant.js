/**
 * 提示码
 */
define([], function () {
    'use strict';
    var ResultCodeConstant = {
        SUCCESSCODE:'0000',//成功编码
        EJECTMSGCODE:'1000',//需要弹出提示
        TEXTMSGCODE:'1001',//提示用红色文本框显示
        FORWARDCODE:'1002',//需要跳转路径
        LOGINCODE:'1003',// 需要登录
        REFUSECODE:'1004',// 跳到拒保页面
        MSGREFUSECODE:'1005',// 跳到拒保页面，并弹出框提示
        EJECTMSGCODE_A:'1000_A',//弹出核保不通过的消息
        EJECTMSGCODE_B:'1000_B',// 弹出提示框点击确定之后要做某些操作
        EJECTMSGCODE_C:'1000_C',//弹出提示，确认按钮显示“知道了”
        EJECTMSGCODE_D:'1000_D',//弹出脱保提示，确认按钮显示“返回修改”、“继续投保”
        EJECTMSGCODE_E:'1000_E',
        EJECTMSGCODE_CHECK:'1000_CHECK',//商业险投保查询需要验证码校验
        EJECTMSGCODECI_CHECK:'1000_CHECKCI'//交强险投保查询需要验证码校验
    };
    return ResultCodeConstant;
});
