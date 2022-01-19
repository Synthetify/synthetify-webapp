import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import { FormGroup, Grid, Switch, Typography } from '@material-ui/core'
import React from 'react'
import HintIcon from '@static/svg/questionMark.svg'
import useStyles from './style'
export interface ILeverProps {
  leverStatus: boolean
  setLeverStatus: (val: boolean) => void
  leverType: string
}
export const SwitchLeverage: React.FC<ILeverProps> = ({
  leverStatus,
  setLeverStatus,
  leverType
}) => {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <Grid>
        <Grid container direction='row' alignItems='center'>
          <Typography className={classes.leverText}>Leverage</Typography>
          <MobileTooltip
            hint={
              <>
                <Typography className={classes.tooltipTitle} style={{ marginBottom: 10 }}>
                  When can you Short and Long?
                </Typography>
                <Typography className={classes.tooltipDescription} style={{ marginBottom: 10 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum justo
                  dui, vel gravida mi vulputate et. Nunc luctus hendrerit metus eget convallis.
                  Praesent elementum dignissim tristique. Pellentesque ante eros, venenatis id nisl
                  eu,
                </Typography>
              </>
            }
            anchor={<img src={HintIcon} alt='' className={classes.questionMark} />}
            mobilePlacement='top-end'
            desktopPlacement='top-end'
          />
        </Grid>
        <Typography className={classes.leverText}>{leverType}</Typography>
      </Grid>
      <FormGroup>
        <Switch
          className={classes.switch}
          classes={{
            switchBase: classes.switchBase,
            root: classes.switch,
            thumb: classes.switchThumb,
            track: classes.switchTrack,
            checked: classes.switchChecked
          }}
          disableRipple
          checked={leverStatus}
          onClick={() => {
            setLeverStatus(!leverStatus)
          }}
        />
      </FormGroup>
    </Grid>
  )
}
