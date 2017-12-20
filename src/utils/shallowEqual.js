const shallowEqual = (a, b) => {
  if (a === b) return true

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false

  for (let i = 0; i < keysA.length; i += 1) {
    const key = keysA[i]
    if (a[key] !== b[key]) return false
  }
  return true
}

export default shallowEqual
