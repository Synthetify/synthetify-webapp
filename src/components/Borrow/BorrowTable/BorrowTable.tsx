import { CardMedia, Grid, Hidden, Paper, Tooltip } from '@material-ui/core'
import icons from '@static/icons'
import classNames from 'classnames'
import React from 'react'
import { colors } from '@static/theme'
import AnimatedNumber from '@components/AnimatedNumber'
import { formatNumbersBorrowTable, showPrefix } from '@consts/utils'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive'
import { UserVaults } from '@selectors/exchange'
import useStyles from './style'

interface IProp {
  userVaults: UserVaults[]
  setValueWithTable: (collSymbol: string, synthSymbol: string) => void
  active: string | null
}
export const BorrowTable: React.FC<IProp> = ({ userVaults, setValueWithTable, active }) => {
  const classes = useStyles()
  return (
    <Grid className={classes.root} component={Paper}>
      <Grid>
        <Grid>
          <Grid container direction='row' className={classes.headerRow}>
            <Hidden xsDown>
              <Grid classes={{ root: classNames(classes.rootHeader, classes.symbolColumn) }}>
                Collateral
              </Grid>
            </Hidden>
            <Hidden xsDown>
              <Grid classes={{ root: classNames(classes.rootHeader, classes.symbolColumn) }}>
                Borrowed
              </Grid>
            </Hidden>
            <Hidden smUp>
              <Grid classes={{ root: classNames(classes.rootHeader, classes.symbolColumn) }}>
                Coll./Borr.
              </Grid>
            </Hidden>
            <Grid classes={{ root: classNames(classes.rootHeader, classes.amountColumn) }}>
              <Hidden xsDown> Deposited</Hidden>
              <Hidden smUp> Depos.</Hidden>
            </Grid>
            <Grid classes={{ root: classNames(classes.rootHeader, classes.amountColumn) }}>
              <Hidden xsDown>Current debt</Hidden>
              <Hidden smUp>Curr. debt</Hidden>
            </Grid>
            <Grid classes={{ root: classNames(classes.rootHeader, classes.cRatioColumn) }}>
              C-Ratio
            </Grid>
            <Hidden smDown>
              <Grid classes={{ root: classNames(classes.rootHeader, classes.interestDebtColumn) }}>
                Interest rate
              </Grid>
            </Hidden>
            <Grid classes={{ root: classNames(classes.rootHeader, classes.liquidationColumn) }}>
              <Hidden mdDown>Liquidation price</Hidden>
              <Hidden only={['lg', 'xl']}>Liq. price</Hidden>
            </Grid>
            <Hidden mdDown>
              <Grid classes={{ root: classNames(classes.rootHeader, classes.maxBorrowColumn) }}>
                Max borrows limit
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid>
          {userVaults.map((element, index) =>
            element.deposited !== 0 || element.currentDebt !== 0 ? (
              <Grid
                key={index}
                className={classNames(
                  classes.gridRow,
                  element.collateral === active ? classes.active : null
                )}
                onClick={() => setValueWithTable(element.collateral, element.borrowed)}
                container
                direction='row'>
                <Hidden xsDown>
                  <Grid classes={{ root: classNames(classes.rootCell, classes.symbolColumn) }}>
                    <Grid container alignItems='center'>
                      <CardMedia
                        className={classes.icon}
                        image={icons[element.collateral] ?? icons.SNY}
                      />
                      {element.collateral}
                    </Grid>
                  </Grid>
                  <Grid classes={{ root: classNames(classes.rootCell, classes.symbolColumn) }}>
                    <Grid container alignItems='center'>
                      <CardMedia
                        className={classes.icon}
                        image={icons[element.borrowed] ?? icons.SNY}
                      />
                      {element.borrowed}
                    </Grid>
                  </Grid>
                </Hidden>
                <Hidden smUp>
                  <Grid classes={{ root: classNames(classes.rootCell, classes.symbolColumn) }}>
                    <Grid className={classes.dualIcon} style={{ marginLeft: '8px' }}>
                      <CardMedia
                        className={classes.icon}
                        image={icons[element.collateral] ?? icons.SNY}
                        style={{ marginRight: 0 }}
                      />
                      <CardMedia
                        className={classNames(classes.icon, classes.secondIcon)}
                        image={icons[element.borrowed] ?? icons.SNY}
                      />
                    </Grid>
                  </Grid>
                </Hidden>
                <Grid classes={{ root: classNames(classes.rootCell, classes.amountColumn) }}>
                  <Tooltip
                    classes={{ tooltip: classes.tooltipNumber }}
                    title={`${element.deposited} ${element.collateral}`}
                    placement='bottom-start'>
                    <Grid>
                      {'~ '}
                      <AnimatedNumber
                        value={element.deposited}
                        formatValue={formatNumbersBorrowTable}
                      />
                      {showPrefix(element.deposited)} {element.collateral}
                    </Grid>
                  </Tooltip>
                </Grid>
                <Grid classes={{ root: classNames(classes.rootCell, classes.amountColumn) }}>
                  <Tooltip
                    classes={{ tooltip: classes.tooltipNumber }}
                    title={`${element.currentDebt} ${element.borrowed}`}
                    placement='bottom-start'>
                    <Grid>
                      {'~ '}
                      <AnimatedNumber
                        value={element.currentDebt}
                        formatValue={formatNumbersBorrowTable}
                      />
                      {showPrefix(element.currentDebt)} {element.borrowed}
                    </Grid>
                  </Tooltip>
                </Grid>
                <Grid
                  classes={{ root: classNames(classes.rootCell, classes.cRatioColumn) }}
                  style={{
                    color:
                      element.cRatio === 'NaN' ||
                      Number(element.cRatio) * 10000 >= element.minCRatio
                        ? colors.green.button
                        : colors.red.error
                  }}>
                  <Grid container direction='row' alignItems='center'>
                    {Number(element.cRatio) * 10000 < 9999 ? (
                      (Number(element.cRatio) * 10000).toFixed(2)
                    ) : (
                      <AllInclusiveIcon style={{ height: '0.70em' }} />
                    )}
                    {'%'}
                  </Grid>
                </Grid>
                <Hidden smDown>
                  <Grid
                    classes={{ root: classNames(classes.rootCell, classes.interestDebtColumn) }}>
                    <AnimatedNumber
                      value={element.interestRate}
                      formatValue={(value: number) => value.toFixed(2)}
                    />

                    {'%'}
                  </Grid>
                </Hidden>
                <Grid classes={{ root: classNames(classes.rootCell, classes.liquidationColumn) }}>
                  <Tooltip
                    classes={{ tooltip: classes.tooltipNumber }}
                    title={`${Number(element.liquidationPrice).toFixed(6)} $`}
                    placement='bottom-start'>
                    <Grid container direction='row' alignItems='center'>
                      <CardMedia
                        className={classes.icon}
                        image={icons[element.collateral] ?? icons.SNY}
                      />
                      {'$'}
                      <AnimatedNumber
                        value={Number(element.liquidationPrice)}
                        formatValue={formatNumbersBorrowTable}
                      />
                      {showPrefix(Number(element.liquidationPrice))}
                    </Grid>
                  </Tooltip>
                </Grid>
                <Hidden mdDown>
                  <Grid
                    classes={{ root: classNames(classes.rootCell, classes.maxBorrowColumn) }}
                    style={{
                      color:
                        element.cRatio === 'NaN' ||
                        Number(element.cRatio) * 10000 >= element.minCRatio
                          ? colors.green.button
                          : colors.red.error
                    }}>
                    <Tooltip
                      classes={{ tooltip: classes.tooltipNumber }}
                      title={`${element.maxBorrow} ${element.borrowed}`}
                      placement='bottom-start'>
                      <Grid>
                        {'~ '}
                        <AnimatedNumber
                          value={element.maxBorrow}
                          formatValue={formatNumbersBorrowTable}
                        />
                        {showPrefix(Number(element.maxBorrow))} {element.borrowed} left
                      </Grid>
                    </Tooltip>
                  </Grid>
                </Hidden>
              </Grid>
            ) : null
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
