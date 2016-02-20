export default ngInject(function HomeController($scope, Project, Skill, User) {

  $scope.filters = {
    projects: [],
    skills: [],
    users: [],
    dateFrom: null,
    dateTo: null
  };
  
  Project.getList().then((result) => {
    $scope.projects = result;
  });

  Skill.getList().then((result) => {
    $scope.skills = result;
  });

  User.getList().then((result) => {
    $scope.users = result;
  });
});
