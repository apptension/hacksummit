export default ngInject(() => {
  return function(skills) {
    if(!skills) return [];
    return skills.filter(s => s.isSoft);
  }
});
