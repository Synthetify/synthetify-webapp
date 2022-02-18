import { CardMedia, Grid, Hidden, Paper, Tooltip } from '@material-ui/core'
import icons from '@static/icons'
import classNames from 'classnames'
import React from 'react'
import { colors } from '@static/theme'
import AnimatedNumber from '@components/AnimatedNumber'
import { formatNumbersBorrowTable, printBN, showPrefix } from '@consts/utils'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive'
import { UserVaults } from '@selectors/exchange'
import useStyles from './style'
import { getLeverageLevel } from '@consts/leverageUtils'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'

interface IProp {
  userVaults: UserVaults[]
  setValueWithTable?: (collSymbol: string, synthSymbol: string, vaultType: number) => void
  active?: { collateral: string | null; synthetic: string | null }
  vaultType?: number
  page: string
  closePositionWithTable?: (collSymbol: string, synthSymbol: string, vaultType: number) => void
}
export const BorrowTable: React.FC<IProp> = ({
  userVaults,
  setValueWithTable,
  active,
  vaultType,
  page,
  closePositionWithTable
}) => {
  const classes = useStyles()
  const alphabetTable = ['A', 'D', 'C', 'B', 'E', 'F']

  return (
    <Grid className={classes.root} component={Paper}>
      <Grid>
        <Grid>
          <Grid container direction='row' className={classes.headerRow}>
            <Grid classes={{ root: classNames(classes.rootHeader, classes.symbolColumn) }}>
              Coll./Borr.
            </Grid>
            {page === 'vault' ? (
              <Grid classes={{ root: classNames(classes.rootHeader, classes.typeColumn) }}>
                Type
              </Grid>
            ) : null}
            <Grid classes={{ root: classNames(classes.rootHeader, classes.amountColumn) }}>
              <Hidden xsDown> Deposited</Hidden>
              <Hidden smUp> Depos.</Hidden>
            </Grid>
            <Grid classes={{ root: classNames(classes.rootHeader, classes.amountColumn) }}>
              <Hidden xsDown>Current debt</Hidden>
              <Hidden smUp>Curr. debt</Hidden>
            </Grid>
            {page === 'vault' ? (
              <Grid classes={{ root: classNames(classes.rootHeader, classes.cRatioColumn) }}>
                C-Ratio
              </Grid>
            ) : (
              <Grid classes={{ root: classNames(classes.rootHeader, classes.LeverColumn) }}>
                Lever
              </Grid>
            )}
            {page === 'vault' ? (
              <Hidden smDown>
                <Grid
                  classes={{ root: classNames(classes.rootHeader, classes.interestDebtColumn) }}>
                  Interest rate
                </Grid>
              </Hidden>
            ) : null}
            <Grid classes={{ root: classNames(classes.rootHeader, classes.liquidationColumn) }}>
              <Hidden mdDown>Liquidation price</Hidden>
              <Hidden only={['lg', 'xl']}>Liq. price</Hidden>
            </Grid>
            {page === 'vault' ? (
              <Hidden mdDown>
                <Grid classes={{ root: classNames(classes.rootHeader, classes.maxBorrowColumn) }}>
                  Max borrows limit
                </Grid>
              </Hidden>
            ) : null}
            {page === 'leverage' ? (
              <Grid classes={{ root: classNames(classes.rootHeader, classes.buttonColumn) }}>
                Close
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid>
          {userVaults.map((element, index) => (
            <Grid
              key={index}
              className={classNames(
                classes.gridRow,
                typeof active !== 'undefined' &&
                  element.collateral === active.collateral &&
                  element.borrowed === active.synthetic &&
                  element.vaultType === vaultType
                  ? classes.active
                  : null
              )}
              onClick={() =>
                page === 'vault'
                  ? setValueWithTable
                    ? setValueWithTable(element.collateral, element.borrowed, element.vaultType)
                    : null
                  : setValueWithTable &&
                    element.collateral[0] === 'x' &&
                    element.borrowed[0] === 'x'
                  ? setValueWithTable(element.collateral, element.borrowed, element.vaultType)
                  : null
              }
              container
              direction='row'>
              <Hidden xsDown>
                <Grid
                  classes={{ root: classNames(classes.rootCell, classes.symbolColumn) }}
                  style={{ display: 'flex' }}>
                  <Grid className={classes.dualIcon}>
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
                  <Grid>
                    {element.collateral}/{element.borrowed}
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
              {page === 'vault' ? (
                <Grid
                  classes={{
                    root: classNames(classes.rootCell, classes.typeColumn)
                  }}>
                  {alphabetTable[element.vaultType]}
                </Grid>
              ) : null}
              <Grid classes={{ root: classNames(classes.rootCell, classes.amountColumn) }}>
                <Tooltip
                  classes={{ tooltip: classes.tooltipNumber }}
                  title={`${printBN(element.deposited.val, element.deposited.scale)} ${
                    element.collateral
                  }`}
                  placement='bottom-start'>
                  <Grid>
                    {'~ '}
                    <AnimatedNumber
                      value={Number(
                        printBN(element.deposited.val, element.deposited.scale)
                      ).toFixed(6)}
                      formatValue={formatNumbersBorrowTable}
                      duration={300}
                    />
                    {showPrefix(+printBN(element.deposited.val, element.deposited.scale))}{' '}
                    {element.collateral}
                  </Grid>
                </Tooltip>
              </Grid>
              <Grid classes={{ root: classNames(classes.rootCell, classes.amountColumn) }}>
                <Tooltip
                  classes={{ tooltip: classes.tooltipNumber }}
                  title={`${printBN(element.currentDebt.val, element.currentDebt.scale)} ${
                    element.borrowed
                  }`}
                  placement='bottom-start'>
                  <Grid>
                    {'~ '}
                    <AnimatedNumber
                      value={Number(
                        printBN(element.currentDebt.val, element.currentDebt.scale)
                      ).toFixed(6)}
                      formatValue={formatNumbersBorrowTable}
                      duration={300}
                    />
                    {showPrefix(+printBN(element.currentDebt.val, element.currentDebt.scale))}{' '}
                    {element.borrowed}
                  </Grid>
                </Tooltip>
              </Grid>
              {page === 'vault' ? (
                <Grid
                  classes={{ root: classNames(classes.rootCell, classes.cRatioColumn) }}
                  style={{
                    color:
                      element.cRatio === 'NaN' || Number(element.cRatio) >= element.minCRatio
                        ? colors.green.button
                        : colors.red.error
                  }}>
                  <Grid container direction='row' alignItems='center'>
                    {Number(element.cRatio) < 9999 ? (
                      Number(element.cRatio).toFixed(2)
                    ) : (
                      <AllInclusiveIcon style={{ height: '0.70em' }} />
                    )}
                    {'%'}
                  </Grid>
                </Grid>
              ) : (
                <Grid classes={{ root: classNames(classes.rootCell, classes.LeverColumn) }}>
                  <Grid container direction='row' alignItems='center'>
                    {getLeverageLevel(Number(element.cRatio))}
                    {'x'}
                  </Grid>
                </Grid>
              )}
              {page === 'vault' ? (
                <Hidden smDown>
                  <Grid
                    classes={{ root: classNames(classes.rootCell, classes.interestDebtColumn) }}>
                    <AnimatedNumber
                      value={element.interestRate}
                      formatValue={(value: number) => value.toFixed(2)}
                      duration={300}
                    />

                    {'%'}
                  </Grid>
                </Hidden>
              ) : null}
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
                      duration={300}
                    />
                    {showPrefix(Number(element.liquidationPrice))}
                  </Grid>
                </Tooltip>
              </Grid>
              {page === 'vault' ? (
                <Hidden mdDown>
                  <Grid
                    classes={{ root: classNames(classes.rootCell, classes.maxBorrowColumn) }}
                    style={{
                      color:
                        element.cRatio === 'NaN' || Number(element.cRatio) >= element.minCRatio
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
                          duration={300}
                        />
                        {showPrefix(Number(element.maxBorrow))} {element.borrowed} left
                      </Grid>
                    </Tooltip>
                  </Grid>
                </Hidden>
              ) : null}
              {page === 'leverage' ? (
                <Grid classes={{ root: classNames(classes.rootCell, classes.buttonColumn) }}>
                  <OutlinedButton
                    name={'Close'}
                    className={classes.closeButton}
                    fontWeight={900}
                    onClick={
                      typeof closePositionWithTable !== 'undefined'
                        ? () => {
                            closePositionWithTable(
                              element.collateral,
                              element.borrowed,
                              element.vaultType
                            )
                          }
                        : undefined
                    }
                    disabled={element.collateral[0] !== 'x' || element.borrowed[0] !== 'x'}
                  />
                </Grid>
              ) : null}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
