export const transformObject = (list, resourceType) => {
  return list.reduce((result, item) => {
    if (resourceType === 'users') {
      result[item.email] = item.id
      return result
    } else {
      result[item.title] = item.id
      return result
    }
  }, {})
}

export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgba(${r}, ${g}, ${b}, 0.4)`
}
