import angular from 'angular';

import filterListDirective from './filterList/filterList.directive'


export default angular.module('app.admin.home.components', [

])
  .directive('filterList', filterListDirective)
  .name;
