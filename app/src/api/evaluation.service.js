export default ngInject(function EvaluationService(API) {
  const evaluateAPI = API.all('user');

  this.getTargetSuggestion = () => {
    return evaluateAPI.customGET('evaluate');
  };

  this.submit = (data) => {
    evaluateAPI.customPOST(data, 'submit');
  };
});
