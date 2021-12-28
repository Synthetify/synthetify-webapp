import {
  CardMedia,
  Grid,
  Hidden,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@material-ui/core'
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
    <TableContainer className={classes.root} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <Hidden xsDown>
              <TableCell classes={{ root: classes.rootHeader }}>Collateral</TableCell>
            </Hidden>
            <Hidden xsDown>
              <TableCell classes={{ root: classes.rootHeader }}>Borrowed</TableCell>
            </Hidden>
            <Hidden smUp>
              <TableCell classes={{ root: classes.rootHeader }}>Coll./Borr.</TableCell>
            </Hidden>
            <TableCell classes={{ root: classes.rootHeader }}>
              <Hidden xsDown> Deposited</Hidden>
              <Hidden smUp> Depos.</Hidden>
            </TableCell>
            <TableCell classes={{ root: classes.rootHeader }}>
              <Hidden xsDown>Current debt</Hidden>
              <Hidden smUp>Curr. debt</Hidden>
            </TableCell>
            <TableCell classes={{ root: classes.rootHeader }}>C-Ratio</TableCell>
            <Hidden smDown>
              <TableCell classes={{ root: classes.rootHeader }}>Interest rate</TableCell>
            </Hidden>
            <TableCell classes={{ root: classes.rootHeader }}>
              <Hidden mdDown>Liquidation price</Hidden>
              <Hidden only={['lg', 'xl']}>Liq. price</Hidden>
            </TableCell>
            <Hidden mdDown>
              <TableCell classes={{ root: classes.rootHeader }}>Max borrows limit</TableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>
          {userVaults.map((element, index) =>
            element.deposited !== 0 || element.currentDebt !== 0 ? (
              <TableRow
                key={index}
                className={classNames(
                  classes.row,
                  element.collateral === active ? classes.active : null
                )}
                onClick={() => setValueWithTable(element.collateral, element.borrowed)}>
                <Hidden xsDown>
                  <TableCell classes={{ root: classes.rootCell }}>
                    <Grid container alignItems='center'>
                      <CardMedia
                        className={classes.icon}
                        image={icons[element.collateral] ?? icons.SNY}
                      />
                      {element.collateral}
                    </Grid>
                  </TableCell>
                  <TableCell classes={{ root: classes.rootCell }}>
                    <Grid container alignItems='center'>
                      <CardMedia
                        className={classes.icon}
                        image={icons[element.borrowed] ?? icons.SNY}
                      />
                      {element.borrowed}
                    </Grid>
                  </TableCell>
                </Hidden>
                <Hidden smUp>
                  <TableCell classes={{ root: classes.rootCell }}>
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
                  </TableCell>
                </Hidden>
                <TableCell classes={{ root: classes.rootCell }}>
                  <Tooltip
                    classes={{ tooltip: classes.tooltipNumber }}
                    title={`${element.deposited} ${element.depositedSign}`}
                    placement='bottom-start'>
                    <Grid>
                      {'~ '}
                      <AnimatedNumber
                        value={element.deposited}
                        formatValue={formatNumbersBorrowTable}
                      />
                      {showPrefix(element.deposited)} {element.depositedSign}
                    </Grid>
                  </Tooltip>
                </TableCell>
                <TableCell classes={{ root: classes.rootCell }}>
                  <Tooltip
                    classes={{ tooltip: classes.tooltipNumber }}
                    title={`${element.currentDebt} ${element.currentDebtSign}`}
                    placement='bottom-start'>
                    <Grid>
                      {'~ '}
                      <AnimatedNumber
                        value={element.currentDebt}
                        formatValue={formatNumbersBorrowTable}
                      />
                      {showPrefix(element.currentDebt)} {element.currentDebtSign}
                    </Grid>
                  </Tooltip>
                </TableCell>
                <TableCell
                  classes={{ root: classes.rootCell }}
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
                </TableCell>
                <Hidden smDown>
                  <TableCell classes={{ root: classes.rootCell }}>
                    <AnimatedNumber
                      value={element.interestRate}
                      formatValue={(value: number) => value.toFixed(2)}
                    />

                    {'%'}
                  </TableCell>
                </Hidden>
                <TableCell classes={{ root: classes.rootCell }}>
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
                </TableCell>
                <Hidden mdDown>
                  <TableCell
                    classes={{ root: classes.rootCell }}
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
                        <AnimatedNumber
                          value={element.maxBorrow}
                          formatValue={formatNumbersBorrowTable}
                        />
                        {showPrefix(Number(element.maxBorrow))} {element.borrowed} left
                      </Grid>
                    </Tooltip>
                  </TableCell>
                </Hidden>
              </TableRow>
            ) : null
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
