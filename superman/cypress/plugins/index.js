/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const plugins = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const persistentVariables = {}

  // cy.task() requires returning a Promise
  // or anything BUT undefined to signal that
  // the task is finished
  // see https://on.cypress.io/task
  on('task', {
    setPersistentVariable ({name, value}) {
      if (typeof value === 'undefined') {
        throw new Error(`Cannot store undefined value for item "${name}"`)
      }
      persistentVariables[name] = value
      return null
    },

    getPersistentVariable (name) {
      if (name in persistentVariables) {
        return persistentVariables[name]
      }
      throw new Error(`Missing item "${name}"`)
    },

    clearTempVariable() {
      persistentVariables = {};
      return null;
    }
  })
};

export default plugins;