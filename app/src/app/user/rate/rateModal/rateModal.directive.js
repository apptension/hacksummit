import template from './rateModal.html';

export default ngInject(($state, User, Question) => {
  return {
    restrict: 'A',
    template,
    link: (scope, $el) => {
      scope.activeStep = '';
      scope.feedback = {};

      scope.getFeedbackCopy = () => {
        if(scope.activeStep === 'positive')
          return {
            title: 'That’s great!',
            description: 'Would you like to offer any additional comments?'
          };
        if(scope.activeStep === 'negative')
          return {
            title: 'OK, noted!',
            description: 'Would you like to help out with some feedback?'
          }
      };

      scope.showFeedback = (feedback) => {
        scope.activeStep = feedback;
        scope.feedback = scope.getFeedbackCopy();
      };

      scope.cancel = () => {
        scope.activeStep = '';
      };

      scope.submit = () => {
        let type = scope.activeStep === 'positive' ? 1 : 0;
        scope.sendSubmit(type);
      };

      User.getSuggestedEvaluation().then((evaluation) => {
        scope.evaluation = evaluation.plain();
        Question.randomizeQuestion(evaluation.skillId || 1, evaluation.userId || 1).then(q => {scope.question = q;});
      });

      scope.sendSubmit = (answer) => {
        User.submitEvaluation({
          id: scope.evaluation.id,
          value: answer,
          comment: scope.feedbackText
        }).finally(() => {
          $state.go('app.user.dashboard');
        });
      };
    }
  };
});
