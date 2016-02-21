import template from './role-item.html';


export default ngInject((Skill, moment, Role) => {
  return {
    restrict: 'AE',
    scope: {
      role: '='
    },
    template: template,
    link: function ($scope) {
      $scope.roleName = 'Role test';
    },
    controller: function ($scope, $rootScope) {
      if (!$scope.role) {
        $scope.role = {
          Skills: []
        };
      }

      $scope.selectedItem = null;
      $scope.searchText = null;
      $scope.transformChip = transformChip;
      $scope.skills = [];
      $scope.submitRole = submitRole;

      Skill.getList().then((data) => {
        $scope.skills = data.map((skill) => {
          skill.updatedAt = moment.utc(skill.updatedAt).format("lll");
          return skill;
        });
      });


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


      function transformChip(chip, role) {
        // If it is an object, it's already a known chip

        if (angular.isObject(chip)) {
          return chip;
        }

        if (role) {
          Skill.post({
            name: chip,
            isSoft: false
          }).then((data) => {
            role.Skills.push(data);
            return data;
          });
          return null;
        }
      }

      function submitRole(role) {
        if (role.id) {
          Role.put(role);
        } else {
          Role.post(role);
          $rootScope.$broadcast('newRoleAdded', []);
        }
      }

      function cancelRole(role) {
        if (role) {
          role.edit = false;
          return role.edit;
        }
        return $rootScope.$emit('canceledRole', []);
      }
    }
  };
});
