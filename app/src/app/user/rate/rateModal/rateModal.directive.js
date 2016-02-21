import template from './rateModal.html';

export default ngInject(() => {
  return {
    restrict: 'A',
    template,
    scope: {
      options: '='
    },
    link: (scope, $el) => {
      console.log('asd');
    }
  };
});
