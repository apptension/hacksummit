export default ngInject(function EvaluationService(API, MockAPI) {
  const evaluationMockAPIName = 'evaluation';

  this.getList = (date) => {
    return API.all(evaluationMockAPIName).customGET('date/' + date).then((evaluations) => {
      return evaluations;
    });
  };
});
