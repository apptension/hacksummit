export default ngInject(function NotifyButtonDirective(Notification) {
  return {
    restrict: 'A',
    link: function ($scope, $el) {
      $el.click(() => {
        Notification.notify();
      });
    }
  };
});
