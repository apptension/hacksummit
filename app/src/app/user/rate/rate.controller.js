export default ngInject(function RateController(Evaluation, $state, Notification) {
  Notification.notify();

  Evaluation.getTargetSuggestion().then((evaluation) => {
    let data = evaluation.plain();
    this.user = data.user;
    this.skill = data.skill;
  });

  this.submit = (feedback) => {
    Evaluation.submit({
      value: feedback,
      comment: this.feedbackText
    });
    $state.go('app.user.dashboard');
  };
});
