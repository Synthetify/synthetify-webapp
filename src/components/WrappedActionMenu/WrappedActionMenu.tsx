import React from 'react'
import { Grid, Card, CardContent, Typography, Divider } from '@material-ui/core'
import ActionMenu from '@components/SwitchMenu/ActionMenu'
import AmountInputWithLabel from '@components/Input/AmountInputWithLabel'
import MaxButton from '@components/CommonButton/MaxButton'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import classNames from 'classnames'
import { MaxWidthProperty } from 'csstype'
import useStyles from './style'

export interface IProps {
  maxWidth?: MaxWidthProperty<number>
}

export const WrappedActionMenu: React.FC<IProps> = ({ maxWidth }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card} style={{ maxWidth }}>
      <CardContent>
        <Grid
          container
          justify='space-around'
          alignItems='flex-start'
          direction='column'
          style={{ height: 280 }}>
          <Grid item>
            <ActionMenu onChange={() => {}} />
          </Grid>
          <Grid
            container
            item
            direction='row'
            wrap='nowrap'
            justify='space-between'
            alignItems='flex-end'>
            <Grid item>
              <AmountInputWithLabel
                setValue={(value: string) => value}
                currency={'xUSD'}
                style={{ maxWidth: 375 }}
              />
            </Grid>
            <Grid item>
              <MaxButton />
            </Grid>
            <Grid item alignItems='center'>
              <Divider orientation='vertical' className={classes.divider} />
            </Grid>
            <Grid item alignItems='center' className={classes.available}>
              <Typography className={classNames(classes.property, classes.lineHeight)}>
                Available to withdraw
              </Typography>
              <Typography className={classNames(classes.value, classes.lineHeight)}>
                xUSD 5164.0189
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <OutlinedButton name='Mint' color='secondary' padding='11px 40px' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default WrappedActionMenu
