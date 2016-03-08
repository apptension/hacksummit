import _ from 'lodash';

export default ngInject(($q) => {
  let q = $q.defer();

  let createScriptTag = _.once(() => {
    let lastScriptTag = angular.element('script').last();
    let script = angular.element('<script>');
    lastScriptTag.parent().append(script);
    script.on('load', () => {
      q.resolve();
    });
    script.attr('src', 'http://s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js');
  });

  return {
    initMailChimp: () => {
      createScriptTag();

      return q.promise;
    }
  };
});
