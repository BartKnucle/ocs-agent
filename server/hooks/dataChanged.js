const dataChanged = async (context) => {
  const oldData = await context.service.get(context.id)
  return Object.keys(context.data).reduce((result, item) => {
    result = (oldData[item] !== context.data[item]) || result
    return result
  }, false)
}

module.exports = () => {
  return async (context) => {
    if (await dataChanged(context)) {
      return context
    }
  }
}
