export default ngInject(function MockAPI(Restangular) {
  return Restangular.withConfig(function (RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl('/public/mock');
    RestangularConfigurer.setRequestSuffix('.json');
  });
});
