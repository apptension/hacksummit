import moment from 'moment';

export default ngInject(() => {
  return (date) => {
    return moment(date).fromNow();
  };
});
