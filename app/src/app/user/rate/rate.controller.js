export default ngInject(function RateController(User, $state) {
  User.getSuggestedEvaluation().then((evaluation) => {
    this.evaluation = evaluation.plain();
  });

  this.submit = (answer) => {
    User.submitEvaluation({
      id: this.evaluation.id,
      value: answer,
      comment: this.feedbackText
    }).finally(() => {
      $state.go('app.user.dashboard');
    });
  };
});
