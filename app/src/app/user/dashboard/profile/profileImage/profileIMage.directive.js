import template from './profileImage.html';

const defaultPhoto = 'http://lorempixel.com/100/100/people';

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
          backgroundImage: `url(${scope.data.image || defaultPhoto})`
        };
      };
    }
  };
});
