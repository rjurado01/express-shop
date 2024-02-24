export const pick = <T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K> => {
  return Object.assign(
    {},
    ...keys.map(key => {
      if (object && object.hasOwnProperty(key)) {
        return {[key]: object[key]}
      }

      return {}
    }),
  )
}

export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: [K, ...K[]],
): Omit<T, K> => {
  const copy = {...obj}
  keys.forEach(key => delete copy[key])
  return copy
}

export const assignPick = <T extends object>(
  object: T,
  data: PartialProperties<T>,
  keys: PartialPropertyNames<T>[],
): void => {
  Object.assign(object, pick(data, keys))
}

export function catchError(error: any, run: () => any, catchFun: () => any) {
  try {
    return run()
  } catch (err) {
    if (err instanceof error) {
      return catchFun()
    } else {
      throw err
    }
  }
}
