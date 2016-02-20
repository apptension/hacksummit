export default ngInject(function EvaluationService(API) {
  const evaluateAPI = API.all('evaluate');

  this.getTargetSuggestion = () => {
    return evaluateAPI.getList();
  };

  this.submit = (data) => {
    console.log('submitting ', data);
  };
});
