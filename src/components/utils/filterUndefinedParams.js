export default function filterUndefinedParams (params) {
  if (typeof params === 'object') {
    for (const x in params) {
      if (params.hasOwnProperty(x)) {
        if (typeof params[x] === 'undefined') {
          delete params[x]
        }
      }
    }
  }
  return params
}
