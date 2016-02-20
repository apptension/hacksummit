import envConfig from 'env-config';


export default ngInject(function API(Restangular) {
  return Restangular.withConfig(function (RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl(envConfig.api.baseURL);
    RestangularConfigurer.setRequestSuffix('.json');
  });
});
