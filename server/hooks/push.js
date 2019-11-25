module.exports = (options = {}) => {
  return (context) => {
    if (context.app.service('client').connected) {
      if (context.result) {
        context.data._id = context.id
        context.app.client.service(context.service.remote).create({ _id: context.id, ...context.data })
          .catch(() => {
            context.app.client.service(context.service.remote).patch(context.id, context.data)
          })
      }
    }
    return context
  }
}
