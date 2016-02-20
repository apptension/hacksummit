export default ngInject(function ProjectsController($scope, Project) {
  $scope.projects = [];

  let loadData = () => {
    Project.getList().then((data) => {
      $scope.projects = data;
    });
  };

  loadData();
});
