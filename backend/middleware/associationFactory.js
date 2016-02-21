'use strict';

module.exports = (options) => {

  let process = (req, res, context) => {

    console.log(options.associations);

    let promises = options.associations.map((association) => {
      let associatedModel = association.associatedModel,
        attribute = association.attribute,
        setMethod = association.setMethod;

      // yeah... i know... transaction...

      let ids = context.attributes[attribute].map((el) => {
        return typeof el === 'object' ? el.id : el;
      });

      // download related instances
      return associatedModel.findAll({ where: { id: ids }}).then((models) => {
        // save association
        return context.instance[setMethod](models).then(() => {
          context.instance.setDataValue(attribute, models);
        });
      });
    });

    Promise.all(promises).then(() => {
      context.continue();
    });
  };

  return {
    create: {
      write: process
    },
    update: {
      write: process
    }
  };
};
