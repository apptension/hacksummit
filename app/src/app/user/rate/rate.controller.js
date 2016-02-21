export default ngInject(function RateController(User, $state, Question) {
  User.getSuggestedEvaluation().then((evaluation) => {
    this.evaluation = evaluation.plain();
    Question.randomizeQuestion(evaluation.skillId || 1, evaluation.userId || 1).then(q => {this.question = q;});
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
