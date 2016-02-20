import template from './filterList.html';

export default ngInject(() => {
  return {
    scope: {
      filterModel: '=',
      filterCollection: '=',
      filterNameAttributes: '@',
      placeholder: '@'
    },
    link: (scope) => {
      let parseNameAttributes = () => {
        let trimmedNameAttributes = scope.filterNameAttributes.replace(/ /g, '');
        let result = [];
        trimmedNameAttributes.substring(1, trimmedNameAttributes.length - 1).split(',').forEach((attribute) => {
          result.push(attribute.replace(/'/g, ''));
        });
        return result;
      };

      scope.searchModel = null;
      scope.nameAttributes = parseNameAttributes();

      scope.getName = (item) => {
        let name = '';
        scope.nameAttributes.forEach((attribute) => {
          name += item[attribute];
          name += ' ';
        });
        return name.substring(0, name.length - 1);
      };

      scope.search = (collection, excluded, attributes, query) => {
        let result = [];
        collection.forEach((item) => {
          attributes.forEach((attribute) => {
            if (item[attribute].toLowerCase().indexOf(query.toLowerCase()) !== -1 && excluded.indexOf(item) === -1) {
              result.push(item);
            }
          });
        });
        return result;
      };
    },
    template: template
  };
});
