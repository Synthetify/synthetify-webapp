import React from 'react'
import { Grid, Card, CardContent, Typography, Divider } from '@material-ui/core'
import ActionMenu from '@components/SwitchMenu/ActionMenu'
import useStyles from './style'
import AmountInputWithLabel from '@components/Input/AmountInputWithLabel'
import MaxButton from '@components/CommonButton/MaxButton'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'

export const WrappedActionMenu: React.FC = () => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid alignItems='flex-start' direction='column'>
          {/*TOP*/}
          <Grid item>
            <ActionMenu onChange={() => {}} />
          </Grid>
          {/*MIDDLE*/}
          <Grid container item direction='row' alignItems='flex-end'>
            <Grid item xs={6}>
              <AmountInputWithLabel setValue={(value: string) => value} currency={'xUSD'} />
            </Grid>
            <Grid item xs={2}>
              <MaxButton />
            </Grid>
            <Grid item container xs={4} alignItems='flex-end'>
              <Grid item>
                <Divider orientation='vertical' className={classes.divider} />
              </Grid>
              <Grid item className={classes.available}>
                <Typography className={classes.property}>Available to withdraw</Typography>
                <Typography className={classes.value}>xUSD 5164.0189</Typography>
              </Grid>
            </Grid>
          </Grid>
          {/*  BOTTOM*/}
          <Grid>
            <OutlinedButton name='Mint' color='secondary' padding='11px 40px' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default WrappedActionMenu
