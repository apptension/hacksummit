import template from './roleForm.html';


export default ngInject((Skill, moment, Role) => {
  return {
    restrict: 'AE',
    template: template,
    link: function ($scope, element, attr) {
      $scope.searchModel = null;

      $scope.getSkillsCollection = () => {
        let modelAttribute = attr.roleFormSkills.replace(/\[(\w+)\]/g, '.$1');
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
        let modelAttribute = attr.roleFormModel.replace(/\[(\w+)\]/g, '.$1');
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

      $scope.addSkill = (newSkill) => {
        if (_.isString(newSkill)) {
          let newSkillIndex = $scope.getFormModel().Skills.indexOf(newSkill);
          let newSkillObject = {
            name: newSkill,
            isSoft: false
          };
          $scope.getFormModel().Skills[newSkillIndex] = newSkillObject;
          Skill.post(newSkillObject).then((updated) => {
            newSkillObject.id = updated.id;
          })
        }
      };

      $scope.searchSkill = (input, excluded) => {
        return $scope.getSkillsCollection().filter((skill) => {
            return skill.name.toLowerCase().indexOf(angular.lowercase(input)) >= 0 && !excluded.find((f) => {return f.id === skill.id});
          }) || [];
      };
    }
  };
});
