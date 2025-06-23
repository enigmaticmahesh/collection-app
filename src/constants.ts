export const FOOTER_TABS = {
    NOTES: 'NOTES',
    NAMES: 'NAMES',
    TOTAL: 'TOTAL',
} as const

export const smallPaddingCardStyles = {
  body: {
    padding: '.5rem',
  },
} as const

// export const NOTES = [500, 200, 100, 50, 20, 10, 5, 2, 1] as const
export const NOTES = ['500', '200', '100', '50', '20', '10', '5', '2', '1'] as const

export const DEFAULT_CHANGE = { change: 0, changeStr: '0' } as const

export const CUSTOM_EVENTS = {
  SHOW_ALERT: 'SHOW_ALERT'
} as const