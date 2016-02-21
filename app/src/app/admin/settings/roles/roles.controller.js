import addRoleDialogTemplate from './components/addRoleDialog/addRoleDialog.html';
import addRoleDialogController from './components/addRoleDialog/addRoleDialog.controller';
import _ from 'lodash';

export default ngInject(function RolesController($scope, $mdDialog, $mdMedia, $timeout, Role, Skill, moment) {
  this.roles = [];
  this.skills = [];
  this.filters = {
    searchText: ''
  };

  let createRole = (role) => {
    role.edit = false;
    role.updatedAt = moment.utc(role.updatedAt).format('lll');
    role.formModel = angular.copy(role);
  };

  Role.getList().then((data) => {
    this.roles = data.map((role) => {
      createRole(role);
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
      Role.post(newRole).then((created) => {
        newRole.id = created.id;
        createRole(newRole);
        this.roles.push(newRole)
      });
    });
  };

  this.submitRole = (role) => {
    let roleIndex = this.roles.indexOf(role);

    Role.put(role.formModel);

    role = role.formModel;
    role.edit = true;
    role.formModel = null;
    role.formModel = angular.copy(role);

    this.roles[roleIndex] = role;

    $timeout(() => {
      role.edit = false;
    })
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
      Role.delete(role).then(() => {
        this.roles = _.without(this.roles, role);
      })
    });
  };

  this.getRoles = () => {
    return this.roles.filter((role) => {
      return role.name.toLowerCase().indexOf(this.filters.searchText.toLowerCase()) !== -1;
    });
  };

});
