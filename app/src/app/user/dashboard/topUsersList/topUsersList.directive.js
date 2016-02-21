import template from './topUsersList.html';

export default ngInject((User) => {
  return {
    restrict: 'A',
    template,
    scope: {
      data: '='
    },
    link: (scope) => {
      User.getProfile().then(res => {
        scope.activeUser = res;
      })
    }
  };
});
