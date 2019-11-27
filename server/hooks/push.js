module.exports = (options = {}) => {
  return (context) => {
    if (context.app.service('client').connected) {
      if (context.result) {
        console.log(context.result._id)
        context.data._id = context.id
        context.app.client.service(context.service.remote).create({ _id: context.result._id, ...context.data })
          .catch(() => {
            context.app.client.service(context.service.remote).patch(context.result._id, context.data)
          })
      }
    }
    return context
  }
}
