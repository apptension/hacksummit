import template from './role-item.html';


export default ngInject(() => {
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
      $scope.skills = [
        {
          name: 'Angular 1'
        },
        {
          name: 'Angular 2'
        },
        {
          name: 'ReactJS'
        },
        {
          name: 'TypeScript'
        },
        {
          name: 'CoffeeScript'
        },
        {
          name: 'CSS'
        },
        {
          name: 'WebGL'
        }
      ];


      $scope.roleSkills = [
        {
          name: "HTML5"
        }
      ];

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
        console.log(chip);
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
