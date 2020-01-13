const tags = ['el-select'];

const hasOptions = (options) => {
  return options && typeof options === 'function'
}

export const hasChildren =  (item) => {
  return tags.includes(item.tag) && hasOptions(item.options)
}