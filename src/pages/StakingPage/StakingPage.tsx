import React from 'react'
import { Fade, Grid } from '@material-ui/core'
import useStyles from './style'
import StakingStats from '@containers/StakingStats/StakingStats'
import TokenListWrapper from '@containers/TokenListWrapper/TokenListWrapper'
import ActionMenuContainer from '@containers/ActionMenuContainer/ActionMenuContainer'
import WelcomeModal from '@components/WelcomeModal/WelcomeModal'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/ui'
import navigationSelectors from '@selectors/ui'

export const StakingPage: React.FC = () => {
  const classes = useStyles()
  const welcomeModalStatus = useSelector(navigationSelectors.welcomeModal)
  const loader = useSelector(navigationSelectors.loader)
  const dispatch = useDispatch()
  return (
    <Fade in={true}>
      <Grid
        container
        classes={{ root: classes.root }}
        className={classes.slide}
        item
        xs={12}
        justifyContent='center'>
        <Grid container className={classes.innerWrapper}>
          <Grid container className={classes.pageRow} item xs={12}>
            <StakingStats />
          </Grid>
          <Grid item className={classes.pageRow} xs={12}>
            <ActionMenuContainer />
          </Grid>
          <Grid item className={classes.pageRow} xs={12}>
            <TokenListWrapper />
          </Grid>
        </Grid>
        <WelcomeModal
          open={welcomeModalStatus && !loader.open}
          handleClose={value => dispatch(actions.setWelcomeModal(value))}
        />
      </Grid>
    </Fade>
  )
}

export default StakingPage
