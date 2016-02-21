import addUserDialogController from './components/addUserDialog/addUserDialog.controller';
import addUserDialogTempalte from './components/addUserDialog/addUserDialog.html';


export default ngInject(function UsersController($scope, $mdDialog, User, Role, moment) {
  this.users = [];
  this.roles = [];
  this.filters = {
    searchText: '',
    roleSearchText: null
  };

  User.getList().then((data) => {
    this.users = data.map((user) => {
      user.edit = false;
      user.updatedAt = moment.utc(user.updatedAt).format("lll");
      user.roles = data.roles ? data.roles : [];
      user.formModel = angular.copy(user);
      return user;
    });
  });

  Role.getList().then((data) => {
    this.roles = data;
  });

  this.search = (collection, excluded, attributes, query) => {
    let result = [];
    collection.forEach((item) => {
      attributes.forEach((attribute) => {
        console.log(item, item[attribute]);
        if (item[attribute].toLowerCase().indexOf(query.toLowerCase()) !== -1 && (!excluded || excluded.indexOf(item) === -1)) {
          result.push(item);
        }
      });
    });
    return result;
  };

  this.addUser = (ev) => {
    $mdDialog.show({
      controller: addUserDialogController,
      template: addUserDialogTempalte,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {
        roles: this.roles
      }
    }).then((newProject) => {
      console.log(newProject);
    });
  };

  this.submitUser = (user) => {
    let userIndex = this.users.indexOf(user);

    user = user.formModel;
    user.edit = true;
    user.formModel = null;
    user.formModel = angular.copy(user);

    this.users[userIndex] = user;
  };

  this.deleteUser = (user) => {
    $mdDialog.show($mdDialog.confirm()
      .title('Delete User')
      .textContent('Are you sure you want to delete this user?')
      .ok('OK')
      .cancel('Cancel')
    ).then(() => {
      console.log('delete')
    });
  };

  this.getUsers = () => {
    return this.users.filter((user) => {
      return user.name.toLowerCase().indexOf(this.filters.searchText.toLowerCase()) !== -1;
    });
  };

  this.toggleItem = (selected) => {
    if (selected.edit) {
      selected.edit = false;
      return;
    }

    this.users.forEach((user) => {
      user.edit = false;
    });

    selected.edit = true;
  };
});
