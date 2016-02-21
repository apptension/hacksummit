import addRoleDialogTemplate from './components/addRoleDialog/addRoleDialog.html';
import addRoleDialogController from './components/addRoleDialog/addRoleDialog.controller';

export default ngInject(function RolesController($scope,$mdDialog, $mdMedia, Role, Skill, moment) {
  this.roles = [];
  this.skills = [];
  this.filters = {
    searchText: ''
  };

  Role.getList().then((data) => {
    this.roles = data.map((role) => {
      role.edit = false;
      role.Skills = data.Skills ? data.Skills : [];
      role.updatedAt = moment.utc(role.updatedAt).format('lll');
      role.formModel = angular.copy(role);
      return role;
    });
  });

  Skill.getList().then((data) => {
    this.skills = data;
  });

  this.addRole = (ev) => {
    $mdDialog.show({
      controller: addRoleDialogController,
      template: addRoleDialogTemplate,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {
        skills: this.skills
      }
    }).then((newRole) => {
      console.log(newRole)
    });
  };

  this.submitRole = (role) => {
    let roleIndex = this.roles.indexOf(role);

    role = role.formModel;
    role.edit = true;
    role.formModel = null;
    role.formModel = angular.copy(role);

    this.roles[roleIndex] = role;
  };

  this.toggleItem = (selected) => {
    if (selected.edit) {
      selected.edit = false;
      return;
    }

    this.roles.forEach((role) => {
      role.edit = false;
    });

    selected.edit = true;
  };

  this.deleteRole = (role) => {
    $mdDialog.show($mdDialog.confirm()
      .title('Delete Role')
      .textContent('Are you sure you want to delete this role?')
      .ok('OK')
      .cancel('Cancel')
    ).then(() => {
      console.log('delete')
    });
  };

  this.getRoles = () => {
    return this.roles.filter((role) => {
      return role.name.toLowerCase().indexOf(this.filters.searchText.toLowerCase()) !== -1;
    });
  };

});
