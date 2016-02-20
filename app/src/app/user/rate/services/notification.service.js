export default ngInject(function NotificationService($state) {
  Notification.requestPermission();
  let notificationScheduled;

  this.scheduleNotfication = () => {
    this.cancelScheduled();
    notificationScheduled = setTimeout(this.showNotification.bind(this), 5000);
  };

  this.cancelScheduled = () => {
    clearTimeout(notificationScheduled);
  };

  this.notify = (content) => {
    if (!this.isEnabled()) {
      console.warn('Notifications not supported :(')
    } else {
      this.showNotification(content);
    }
  };

  this.isEnabled = () => {
    return ('Notification' in window) && (Notification.permission === 'granted');
  };

  this.proceed = () => {
    $state.go('app.user.rate');
  };

  this.showNotification = () => {
    let config = this.prepareConfig();
    let notification = new Notification('Hello,', config);
    notification.addEventListener('click', () => {
      this.proceed();
      notification.close();
    });
  };

  this.prepareConfig = () => {
    return {
      body: 'Would you mind rating someone? :)',
      icon: 'http://lorempixel.com/100/100/cats/'
    };
  };
});
