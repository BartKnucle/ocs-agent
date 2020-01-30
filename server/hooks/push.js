module.exports = (options = {}) => {
  return (context) => {
    if (context.result) {
      try {
        context.data._id = context.result._id
        context.app.client.service(context.service.remote).create(context.result)
          .catch(() => {
            context.app.client.service(context.service.remote).patch(context.result._id, context.result)
          })
      } catch (error) {}
    }
    return context
  }
}
