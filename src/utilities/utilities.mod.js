import angular from 'angular';
import utilitiesDirctive from './dirctive/public.components'
console.log(utilitiesDirctive)
var utilities=angular.module('utilities',[
    utilitiesDirctive.name//"utilitiesDirctive"
])
export default utilities