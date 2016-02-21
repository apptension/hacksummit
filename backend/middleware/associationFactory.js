'use strict';

let models = require('../models');

module.exports = (options) => {

  let associatedModel = options.associatedModel,
      attribute = options.attribute,
      setMethod = options.setMethod;

  let process = (req, res, context) => {

    // yeah... i know... transaction...

    let ids = context.attributes[attribute].map((el) => {
      return typeof el === 'object' ? el.id : el;
    });

    // download related instances
    associatedModel.findAll({ where: { id: ids }}).then((models) => {
      // save association
      context.instance[setMethod](models).then(() => {
        context.instance.setDataValue(attribute, models);
        context.continue();
      });
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
