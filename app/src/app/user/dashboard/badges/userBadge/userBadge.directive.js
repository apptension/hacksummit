import template from './userBadge.html';

export default ngInject(() => {
  return {
    restrict: 'A',
    template,
    scope: {
      data: '='
    },
    link: (scope) => {
      scope.userImageBackground = () => {
        if (!scope.data) {return {};}

        return {
          backgroundImage: `url(${scope.data.image})`
        };
      };
    }
  };
});
