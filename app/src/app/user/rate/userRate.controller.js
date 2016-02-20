export default ngInject(function UserRateController(Evaluation) {
  Evaluation.getTargetSuggestion().then((evaluation) => {
    let data = evaluation.plain()[0];
    this.user = data.user;
    this.skill = data.skill;
  });

  this.submit = (feedback) => {
    Evaluation.submit(feedback);
  }
});
