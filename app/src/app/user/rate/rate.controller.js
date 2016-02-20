export default ngInject(function RateController(User, Evaluation, $state) {
  User.getSuggestedEvaluation().then((evaluation) => {
    this.evaluation = evaluation.plain();
  });

  this.submit = (feedback) => {
    Evaluation.submit({
      value: feedback,
      comment: this.feedbackText
    }).finally(() => {
      $state.go('app.user.dashboard');
    });
  };
});
