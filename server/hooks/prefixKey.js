module.exports = () => {
  return (context) => {
    if (context.params.prefix) {
      context.data = {
        _id: context.data._id,
        ...Object.assign(
          {},
          ...Object.keys(context.data)
            .filter(key => key !== '_id')
            .filter(key => key !== 'updated')
            .map(key => ({ [`${context.params.prefix}_${key}`]: context.data[key] }))
        )
      }
    }
    return context
  }
}
