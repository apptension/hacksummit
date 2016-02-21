import addProjectDialogController from './components/addProjectDialog/addProjectDialog.controller';
import addProjectDialogTempalte from './components/addProjectDialog/addProjectDialog.html';

export default ngInject(function ProjectsController(Project, User, $mdDialog) {
  this.projects = [];
  this.users = [];
  this.filtrers = {
    searchText: ''
  };

  let loadProjects = () => {
    Project.getList().then((data) => {
      this.projects = data.map((project) => {
        project.edit = false;
        project.members = [];
        project.members = project.members.map((memberId) => {
          return _.find(this.users, {id: memberId});
        });
        project.formModel = angular.copy(project);
        project.formModel.startDate = project.formModel.startDate.toDate();
        project.formModel.endDate = project.formModel.endDate.toDate();
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

  this.addProject = (ev) => {
    $mdDialog.show({
      controller: addProjectDialogController,
      template: addProjectDialogTempalte,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {
        users: this.users
      }
    }).then((newProject) => {
      console.log(newProject);
    });
  };

  this.deleteProject = (project) => {
    $mdDialog.show($mdDialog.confirm()
      .title('Delete Project')
      .textContent('Are you sure you want to delete this project?')
      .ok('OK')
      .cancel('Cancel')
    ).then(() => {
      console.log('delete')
    });

  };

  this.getProjects = () => {
    return this.projects.filter((project) => {
      return project.name.toLowerCase().indexOf(this.filtrers.searchText.toLowerCase()) !== -1;
    });
  };


  init();
});
