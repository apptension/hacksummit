import addProjectDialogController from './components/addProjectDialog/addProjectDialog.controller';
import addProjectDialogTempalte from './components/addProjectDialog/addProjectDialog.html';
import moment from 'moment';

export default ngInject(function ProjectsController($timeout, Project, User, $mdDialog) {
  this.projects = [];
  this.users = [];
  this.filtrers = {
    searchText: ''
  };

  let createProject = (project) => {
    project.edit = false;
    project.formModel = angular.copy(project);
    project.formModel.startDate = project.formModel.startDate.utc().toDate();
    project.formModel.endDate = project.formModel.endDate.utc().toDate();
  };

  let loadProjects = () => {
    Project.getList().then((data) => {
      this.projects = data.map((project) => {
        createProject(project);
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

    project.formModel.startDate = moment(project.formModel.startDate);
    project.formModel.endDate = moment(project.formModel.endDate);
    Project.put(project.formModel);

    project = project.formModel;
    project.edit = true;
    project.formModel = null;
    project.formModel = angular.copy(project);
    project.formModel.startDate = project.formModel.startDate.toDate();
    project.formModel.endDate = project.formModel.endDate.toDate();

    this.projects[projectIndex] = project;

    $timeout(() => {
      project.edit = false;
    })
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
      Project.post(newProject).then((created) => {
        newProject.id = created.id;
        newProject.startDate = moment.utc(newProject.startDate);
        newProject.endDate = moment.utc(newProject.endDate);
        createProject(newProject);
        this.projects.push(newProject)
      });
    });
  };

  this.deleteProject = (project) => {
    $mdDialog.show($mdDialog.confirm()
      .title('Delete Project')
      .textContent('Are you sure you want to delete this project?')
      .ok('OK')
      .cancel('Cancel')
    ).then(() => {
      Project.delete(project).then(() => {
        this.projects = _.without(this.projects, project);
      })
    });
  };

  this.getProjects = () => {
    return this.projects.filter((project) => {
      return project.name.toLowerCase().indexOf(this.filtrers.searchText.toLowerCase()) !== -1;
    });
  };


  init();
});
