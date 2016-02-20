export default ngInject(function UserRateController(Evaluation, $state) {
  Evaluation.getTargetSuggestion().then((evaluation) => {
    let data = evaluation.plain()[0];
    this.user = data.user;
    this.skill = data.skill;
  });

  this.submit = (feedback) => {
    Evaluation.submit(feedback);
    $state.go('app.user.dashboard');
  };
});
