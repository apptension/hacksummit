export default ngInject(function ProjectsController(Project) {
  Project.getList().then((data) => {
    console.log('projects', data);
  });
});
