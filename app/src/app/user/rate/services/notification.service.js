export default ngInject(function NotificationService($state, $rootScope) {
  Notification.requestPermission();
  let notificationScheduled;
  this.notificationPending = false;

  this.scheduleNotfication = () => {
    this.cancelScheduled();
    notificationScheduled = setTimeout(this.showNotification.bind(this), 10000);
  };

  this.cancelScheduled = () => {
    clearTimeout(notificationScheduled);
  };

  this.notify = (content) => {
    if (!this.isEnabled()) {
      console.warn('Notifications not supported :(');
    } else {
      this.showNotification(content);
    }
  };

  this.isEnabled = () => {
    return ('Notification' in window) && (Notification.permission === 'granted');
  };

  this.proceed = () => {
    $state.go('app.user.dashboard.rate');
  };

  this.showNotification = () => {
    let config = this.prepareConfig();
    let notification = new Notification('Hi there,', config);
    notification.addEventListener('click', () => {
      this.proceed();
      notification.close();
    });

    //propagate notification
    this.notificationPending = true;
    $rootScope.$apply();
  };

  this.prepareConfig = () => {
    return {
      body: 'Feel like answering a question?',
      icon: 'http://lorempixel.com/100/100/cats/'
    };
  };
});
