export default ngInject(function UserService(API, MockAPI) {
  const usersAPIName = 'user';

  this.getList = () => {
    return API.all(usersAPIName).getList();
  };

  this.get = (id) => {
    return API.all(usersAPIName).get(id);
  };

  this.put = (user) => {
    return API.all(usersAPIName).customPUT(user, user.id);
  };

  this.post = (user) => {
    user.avatar = '/public/images/userAvatar.png';
    return API.all(usersAPIName).post(user);
  };

  this.delete = (user) => {
    return API.all(usersAPIName).customDELETE(user.id);
  };

  this.getProfile = () => {
    return API.all(usersAPIName).customGET('me');
  };

  this.getSuggestedEvaluation = () => {
    return this.getProfile().then(u => {
      return API.all(usersAPIName).one(`${u.id}`).customGET('evaluation');
    });
  };

  this.submitEvaluation = (data) => {
    let putData = this.prepareSubmitData(data);
    return this.getProfile().then(u => {
      return API.one('user', u.id).customPUT(putData,'evaluation');
    });
  };

  this.prepareSubmitData = (data) => {
    return {
      evaluationId: data.id,
      comment: data.comment,
      state: data.value !== -1 ? 1 : 2,
      starred: data.value === 1 ? 1 : 0
    };
  };

  this.login = (userId) => {
    return API.all(usersAPIName).customPOST({userId}, 'login');
  };
});
