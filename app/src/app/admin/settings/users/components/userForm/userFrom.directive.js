import template from './userForm.html';


export default ngInject(() => {
  return {
    restrict: 'AE',
    template: template,
    link: function ($scope, element, attr) {
      $scope.searchModel = null;

      $scope.getRolesCollection = () => {
        let modelAttribute = attr.userFormRoles.replace(/\[(\w+)\]/g, '.$1');
        modelAttribute = modelAttribute.replace(/^\./, '');
        let modelAttributeArray = modelAttribute.split('.');
        let modelObject = $scope;
        modelAttributeArray.forEach((property) => {
          if (!_.isUndefined(modelObject[property])) {
            modelObject = modelObject[property]
          }
        });
        return modelObject;
      };

      $scope.getFormModel = () => {
        let modelAttribute = attr.userFormModel.replace(/\[(\w+)\]/g, '.$1');
        modelAttribute = modelAttribute.replace(/^\./, '');
        let modelAttributeArray = modelAttribute.split('.');
        let modelObject = $scope;
        modelAttributeArray.forEach((property) => {
          if (!_.isUndefined(modelObject[property])) {
            modelObject = modelObject[property]
          }
        });
        return modelObject;
      };

      $scope.searchRole = (input, excluded) => {
        return $scope.getRolesCollection().filter((role) => {
            return role.name.toLowerCase().indexOf(angular.lowercase(input)) >= 0 && !excluded.find((f) => {return f.id === role.id});
          }) || [];
      };
    }
  };
});
