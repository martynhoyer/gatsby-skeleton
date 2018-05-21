const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  base: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  xxl: '4rem',
}

export const boxPadding = {
  compact: {
    xs: {
      x: spacing.md,
      y: spacing.md,
    },
    md: {
      x: spacing.md,
    },
  },
  default: {
    xs: {
      x: spacing.lg,
      y: spacing.md,
    },
    md: {
      x: spacing.xl,
    },
  },
}

export const fontsize = {
  sm: '0.875rem',
  base: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
  xxxl: '4rem',
}

export default spacing
