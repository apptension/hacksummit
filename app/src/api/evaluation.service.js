export default ngInject(function EvaluationService(API, MockAPI) {
  const evaluationMockAPIName = 'evaluation';

  this.getList = (date) => {
    return API.all('evaluation').customGET('date/' + date).then((evaluations) => {
      return evaluations;
    });
  };

  this.submit = (data) => {
    return MockAPI.one(evaluationMockAPIName, data.id).put(data);
  };
});
