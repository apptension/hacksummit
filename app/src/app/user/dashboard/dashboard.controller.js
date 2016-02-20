export default ngInject(function DashboardController(Stats) {
  Stats.getUserStats(1).then((stats) => {

  });
});
