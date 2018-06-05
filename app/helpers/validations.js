const validators = (() => {
  const required = (value, type) => {
    if (type === 'name' || type === 'loginPassword' || type === 'gender' || type === 'surname') {
      return !value
        ? ['Input value is required!']
        : []
    }
    return []
  }

  const testValue = (value, type) => {
    if (type === 'name' || type === 'password' || type === 'surname') {
      return value.length < 3
        ? ['at least 3 chars']
        : []
    }
    return []
  }
  return { required, testValue }
})()

export default(form) => {
  const error = {}
  let valid = 0
  for (const type in form) { //eslint-disable-line
    if (Object.prototype.hasOwnProperty.call(form, type)) {
      const errors = []
      for (const checkers in validators) { //eslint-disable-line
        if (Object.prototype.hasOwnProperty.call(validators, checkers)) {
          errors.push(...validators[checkers](form[type], type))
        }
        error[type] = errors
      }
      valid += errors.length
    }
  }
  return {
    error,
    valid: valid === 0,
  }
}
