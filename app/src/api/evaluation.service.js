export default ngInject(function EvaluationService(MockAPI) {
  const evaluationMockAPIName = 'evaluation';

  this.getList = (skill, date) => {
    return MockAPI.all(evaluationMockAPIName).getList({skill, date}).then((evaluations) => {
      return evaluations;
    });
  };

  this.submit = (data) => {
    return MockAPI.one(evaluationMockAPIName, data.id).put(data);
  };
});
