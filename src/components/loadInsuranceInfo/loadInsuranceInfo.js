define([
    'components/loadInsuranceInfo/insureItem.dirc',
    'components/loadInsuranceInfo/loadInsuranceInfo.ctrl'
], function (insureItem, loadInsuranceInfoCtrl) {
    'use strict';
    return angular.module('loadInsuranceInfo', [])
        .controller('loadInsuranceInfoCtrl', loadInsuranceInfoCtrl)
        .directive('insureItem',insureItem)
});