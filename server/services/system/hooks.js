module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
    /* context => {
      let data = {
        device: context.app.system.id,
        class: context.id,
        data: context.data.data
      }
      context.app.client.devicesService.create(data)
      return context;
    } */],
    update: [ /* context => {
      let data = {
        device: context.app.system.id,
        class: context.id,
        data: context.data.data
      }
      context.app.client.devicesService.create(data)
      return context;
    } */],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
