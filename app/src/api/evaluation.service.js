export default ngInject(function EvaluationService(API) {
  const evaluationAPIName = 'evaluation';

  this.submit = (data) => {
    API.one(evaluationAPIName, data.id).put(data);
  };
});
