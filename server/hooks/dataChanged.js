const dataChanged = async (context) => {
  const oldData = await context.service.get(context.id)
  return Object.keys(context.data)
    .filter(x => x !== '_id')
    .filter(x => x !== 'updated')
    .reduce((result, item) => {
    result = (oldData[item] !== context.data[item]) || result
    return result
  }, false)
}

module.exports = () => {
  return async (context) => {
    if (await dataChanged(context)) {
      console.log('change')
      return context
    } else {
      context.result = false
    }
  }
}
