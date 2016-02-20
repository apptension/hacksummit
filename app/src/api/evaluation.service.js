export default ngInject(function EvaluationService(API) {
  const evaluationAPIName = 'evaluation';

  this.getList = (skill, date) => {
    return API.all(evaluationAPIName).getList({skill, date}).then((evaluations) => {
      return evaluations;
    });
  };

  this.submit = (data) => {
    return API.one(evaluationAPIName, data.id).put(data);
  };
});
