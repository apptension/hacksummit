import envConfig from 'env-config';


export default ngInject(function MockAPI(Restangular) {
  return Restangular.withConfig(function (RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl(envConfig.api.baseURL);
  });
});
