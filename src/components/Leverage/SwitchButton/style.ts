import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
}))
export default useStyles

export const useSingleTabStyles = makeStyles<Theme, { value: number }>(() => ({
  root: {
    zIndex: 1,
    textTransform: 'capitalize',
    ...typography.subtitle2,
    minWidth: '95px',
    color: colors.navy.info,
    maxHeight: '34px',
    minHeight: '34px',

    '&:hover': {
      color: colors.navy.grey
    }
  },
  selected: ({ value }) => ({
    ...typography.subtitle1,
    color: value === 0 ? colors.navy.background : colors.navy.veryLightGrey,
    transition: 'color 300ms',
    maxHeight: '34px',

    '&:hover': {
      color: value === 0 ? colors.navy.background : colors.navy.veryLightGrey
    }
  })
}))

export const useTabsStyles = makeStyles<Theme, { value: number }>(() => ({
  root: { overflow: 'visible', minHeight: '34px' },
  indicator: ({ value }) => ({
    height: '100%',
    borderRadius: 5,
    backgroundColor: value === 0 ? colors.green.button : colors.red.error
  }),
  scrollable: {
    overflow: 'visible',
    maxHeight: '34px'
  },
  scrollButtons: {
    color: 'white'
  },
  flexContainer: {
    justifyContent: 'space-around',
    borderRadius: '5px',
    background: colors.navy.background,
    maxHeight: '34px'
  }
}))
