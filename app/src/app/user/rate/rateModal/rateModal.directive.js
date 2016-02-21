import template from './rateModal.html';

export default ngInject(($state, User, Question, Project) => {
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
          };
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

        User.get(evaluation.EvaluatedUserId).then(u => {
          scope.user = u;
        });

        User.getProfile().then(u => {
          scope.me = u.name;
        });
      });

      scope.intro = () => {
        return `Hey ${scope.me}, since you worked with
          <span class="rate_intro-markup">${scope.user.name}</span>
          on <span class="rate_intro-markup">${scope.project}</span>,
          please answer this question:`;
      };

      scope.getUserImage = (user) => {
        let img = user.avatar || 'http://placehold.it/100/100';
        return {
          backgroundImage: `url('${img}')`
        };
      };

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
