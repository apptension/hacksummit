export default ngInject(function ProjectsController(Project, User) {
  this.projects = [];
  this.users = [];

  let loadProjects = () => {
    Project.getList().then((data) => {
      this.projects = data.map((project) => {
        project.edit = false;
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

  this.searchUser = (input) => {
    return this.users.filter((user) => {
      return user.name.toLowerCase().indexOf(angular.lowercase(input)) >= 0;
    }) || [];
  };

  init();
});
