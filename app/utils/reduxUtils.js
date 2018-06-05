const camelify = str => str
  .split('_')
  .map((s, i) => (i !== 0 ? s[0] + s.slice(1).toLowerCase() : s.toLowerCase()))
  .join('')

export const createTypes = (arr, namespace) =>
  arr.reduce((o, type) => ({
    ...o,
    [type]: `${namespace}_${type}`,
  }), {})

export const createActions = types => Object.keys(types).reduce((o, key) => ({
  ...o,
  [camelify(key)]: payload => ({
    type: types[key],
    payload,
  }),
}), {})

export const handleActions = (handlers, initialState) => (state = initialState, action) => {
  const handler = handlers[action.type]
  if (typeof handler === 'function') return handler(state, action)
  return state
}

export const action = (type, payload, meta) => {
  if (typeof payload === 'undefined') {
    return { type }
  }
  if (typeof meta === 'undefined') {
    return { type, payload }
  }
  return { type, payload, meta }
}
