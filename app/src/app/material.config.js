import moment from 'moment';

export default ngInject(function ($mdDateLocaleProvider, $mdThemingProvider) {
  // Can change week display to start on Monday.
  $mdDateLocaleProvider.firstDayOfWeek = 1;
  // Example uses moment.js to parse and format dates.
  $mdDateLocaleProvider.parseDate = function (dateString) {
    var m = moment(dateString, 'DD-MM-YYYY', true);
    return m.isValid() ? m.toDate() : new Date(NaN);
  };
  $mdDateLocaleProvider.formatDate = function (date) {
    return moment(date).format('DD-MM-YYYY');
  };


  let bluePrimaryMap = $mdThemingProvider.extendPalette('blue',
    {
      500: '009cf3',
      contrastDefaultColor: 'light'
    }),
    yellowAccentMap = $mdThemingProvider.extendPalette('blue',
    {
      A100: '009cf3',
      A200: '009cf3',
      A400: '009cf3',
      A700: '009cf3'
    });
  $mdThemingProvider
    .definePalette('bluePrimary', bluePrimaryMap)
    .definePalette('yellowAccent', yellowAccentMap);

  $mdThemingProvider
      .definePalette('bluePrimary', bluePrimaryMap)
      .definePalette('yellowAccent', yellowAccentMap)
      .theme('default')
      .primaryPalette('bluePrimary')
      .accentPalette('yellowAccent');
});
