export const parseNumber = (val: string) => +val

export const identity = <T>(val: T): T => val

export const fromSnakeToCamelCase = (val: string) =>
  val.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))

export const createMapper = <T>(map: Record<string, ((arg: string) => unknown) | ((arg: string) => string)[]>) => (
  obj: Record<string, string>
): T => {
  return Object.entries(obj).reduce((acc, [prop, val]) => {
    if (Array.isArray(map[prop])) {
      acc[map[prop][1](prop)] = map[prop][0](val)
    } else {
      acc[prop] = (map[prop] as (arg: string) => unknown)(val)
    }
    return acc
  }, {}) as T
}
