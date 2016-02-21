import template from './role-item.html';


export default ngInject((Skill, moment) => {
  return {
    restrict: 'AE',
    template: template,
    link: function ($scope) {
      $scope.roleName = 'Role test';
    },
    controller: function ($scope) {
      $scope.selectedItem = null;
      $scope.searchText = null;
      $scope.transformChip = transformChip;
      $scope.skills = [];
      //Skill.getList()
      //Skill.getList()

      //roleList.Skills.then((data) => {
      //  $scope.roleSkills = data.map((skill) => {
      //    skill.updatedAt = moment.utc(skill.updatedAt).format("lll");
      //    return skill;
      //  });
      //  console.log($scope.roleSkills);
      //});


      $scope.querySearch = querySearch;
      $scope.transformChip = transformChip;



      function querySearch(query) {
        var results = query ? $scope.skills.filter(createFilterFor(query)) : [];
        return results;
      }

      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(skill) {
          return (angular.lowercase(skill.name).indexOf(lowercaseQuery) === 0);
        };
      }

      function transformChip(chip) {
        // If it is an object, it's already a known chip
        if (angular.isObject(chip)) {
          return chip;
        }

        // Otherwise, create a new one
        return {name: chip};
      }
    }
  };
});
