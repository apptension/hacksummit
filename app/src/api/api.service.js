export default ngInject(function API(Restangular) {
  return Restangular.withConfig(function (RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl('/public/mock');
    RestangularConfigurer.setRequestSuffix('.json');
  });
});
