export default ngInject(function EvaluationService(MockAPI) {
  const evaluationMockAPIName = 'evaluation';

  this.getList = (date) => {
    return MockAPI.all(evaluationMockAPIName).getList({date}).then((evaluations) => {
      return evaluations;
    });
  };

  this.submit = (data) => {
    return MockAPI.one(evaluationMockAPIName, data.id).put(data);
  };
});
