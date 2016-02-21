import template from './projectForm.html';


export default ngInject(() => {
  return {
    restrict: 'AE',
    template: template,
    link: function ($scope, element, attr) {

      $scope.getUsersCollection = () => {
        let modelAttribute = attr.projectFormUsers.replace(/\[(\w+)\]/g, '.$1');
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
        let modelAttribute = attr.projectFormModel.replace(/\[(\w+)\]/g, '.$1');
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

      $scope.searchUser = (input, excluded) => {
        return $scope.getUsersCollection().filter((user) => {
            return user.name.toLowerCase().indexOf(angular.lowercase(input)) >= 0 && !excluded.find((f) => {return f.id === user.id});
          }) || [];
      };
    }
  };
});
