import {questions} from './questions';

export default ngInject(function QuestionsService(Skill, User) {
  this.randomItem = (items) => {
    let rndIndex = Math.floor(Math.random() * items.length);
    return items[rndIndex];
  };

  this.populate = (text, skill, user) => {
    return text
      .replace('{SKILL}', skill.name)
      .replace('{NAME}', user.name);
  };

  this.randomizeQuestion = (skillId, userId) => {
    return Skill.get(skillId).then(skill => {
      return User.get(userId).then(user => {
        let question;
        if(skill.isSoft) {
          let lcName = skill.name.toLowerCase();
          question = this.randomItem(questions.soft[lcName]);
        } else {
          question = this.randomItem(questions.hard);
        }
        return this.populate(question, skill, user);
      });
    });
  };
});
