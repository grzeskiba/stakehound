export const applyUrlParamsAndQuery = (url: string) => (
  params: Record<string, unknown> = {},
  query: Record<string, unknown> = {}
) =>
  `${Object.entries(params).reduce((acc, [key, val]) => acc.replace(`:${key}`, `${val}`), url)}?${Object.entries(
    query
  ).reduce((acc, [key, val]) => (!acc ? `${acc}${key}=${val}` : `${acc}&${key}=${val}`), '')}`

export const isRequestSuccess = (status: number) => status >= 200 && status < 300

export const isResultWindowTooLarge = (data: Record<string, unknown>) =>
  data.message === 'Result window is too large, PageNo x Offset size must be less than or equal to 10000'
