export default ngInject(function ProjectsController(Project, User) {
  this.projects = [];
  this.users = [];
  this.filtrers = {
    searchText: ''
  };

  let loadProjects = () => {
    Project.getList().then((data) => {
      this.projects = data.map((project) => {
        project.edit = false;
        project.formModel = angular.copy(project);
        project.formModel.startDate = project.formModel.startDate.toDate();
        project.formModel.endDate = project.formModel.endDate.toDate();
        project.members = [];
        project.members = project.members.map((memberId) => {
          return _.find(this.users, {id: memberId});
        });
        return project;
      });
    });
  };

  let loadUsers = () => {
    return User.getList().then((data) => {
      this.users = data;
    });
  };

  let init = () => {
    loadUsers().then(() => {
      loadProjects();
    });
  };

  this.toggleItem = (selected) => {
    if (selected.edit) {
      selected.edit = false;
      return;
    }

    this.projects.forEach((project) => {
      project.edit = false;
    });

    selected.edit = true;
  };

  this.submitProject = (project) => {
    let projectIndex = this.projects.indexOf(project);

    project = project.formModel;
    project.formModel = null;
    project.formModel = angular.copy(project);

    this.projects[projectIndex] = project;
  };

  this.getProjects = () => {
    return this.projects.filter((project) => {
      return project.name.toLowerCase().indexOf(this.filtrers.searchText.toLowerCase()) !== -1;
    });
  };

  this.searchUser = (input, excluded) => {
    return this.users.filter((user) => {
      return user.name.toLowerCase().indexOf(angular.lowercase(input)) >= 0 && excluded.indexOf(user) === -1;
    }) || [];
  };

  init();
});
