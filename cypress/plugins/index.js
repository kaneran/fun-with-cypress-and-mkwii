/// <reference types="cypress" />
const cache = {};

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    putInCache({ key, data }) {
      return (cache[key] = data);
    },
    getCache(key) {
      return cache[key];
    },
  });
};
