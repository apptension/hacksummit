export default ngInject(function NotificationService() {
  Notification.requestPermission();

  this.notify = (content) => {
    if (!this.isEnabled()) {
      console.log(content);
    } else {
      this.showNotification(content);
    }
  };

  this.isEnabled = () => {
    return ('Notification' in window) && (Notification.permission === 'granted');
  };

  this.showNotification = () => {
    let config = this.prepareConfig();
    let notification = new Notification('Hello,', config);
    notification.addEventListener('click', () => {
      window.open('http://localhost:3000/user/rate', '_self');
    });
  };

  this.prepareConfig = () => {
    return {
      body: 'Would you mind rating someone? :)',
      icon: 'http://lorempixel.com/100/100/cats/'
    };
  };
});
