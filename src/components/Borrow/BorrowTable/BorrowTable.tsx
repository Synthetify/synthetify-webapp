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
  TableRow
} from '@material-ui/core'
import icons from '@static/icons'
import classNames from 'classnames'
import React from 'react'
import { colors } from '@static/theme'
import AnimatedNumber from '@components/AnimatedNumber'
import { formatNumbersBorrowTable, showPrefix } from '@consts/utils'
import useStyles from './style'
interface IProp {
  collateral: string
  borrowed: string
  currentDebt: number
  currentDebtSign: string
  deposited: number
  depositedSign: string
  cRatio: string
  interestRate: string
  liquidationPrice: string
  maxBorrow: string
  setValueWithTable: (cRatio: number, interestRate: number, liquidationPrice: number) => void
  active: boolean
}
export const BorrowTable: React.FC<IProp> = ({
  collateral,
  borrowed,
  currentDebt,
  currentDebtSign,
  deposited,
  depositedSign,
  cRatio,
  interestRate,
  liquidationPrice,
  maxBorrow,
  setValueWithTable,
  active
}) => {
  const classes = useStyles()

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell classes={{ root: classes.rootHeader }}>
              <Hidden xsDown>Collateral</Hidden>
              <Hidden smUp>Collat.</Hidden>
            </TableCell>
            <TableCell classes={{ root: classes.rootHeader }}>
              <Hidden xsDown> Borrowed</Hidden>
              <Hidden smUp> Borr.</Hidden>
            </TableCell>
            <TableCell classes={{ root: classes.rootHeader }}>
              <Hidden xsDown>Current debt</Hidden>
              <Hidden smUp>Curr. debt</Hidden>
            </TableCell>
            <TableCell classes={{ root: classes.rootHeader }}>
              <Hidden xsDown> Deposited</Hidden>
              <Hidden smUp> Depos.</Hidden>
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
          <TableRow
            className={classNames(classes.row, active ? classes.active : null)}
            onClick={() =>
              setValueWithTable(Number(cRatio), Number(interestRate), Number(liquidationPrice))
            }>
            <TableCell classes={{ root: classes.rootCell }}>
              <Grid container alignItems='center'>
                <CardMedia className={classes.icon} image={icons[collateral] ?? icons.SNY} />
                <Hidden xsDown>{collateral}</Hidden>
              </Grid>
            </TableCell>

            <TableCell classes={{ root: classes.rootCell }}>
              <Grid container alignItems='center'>
                <CardMedia className={classes.icon} image={icons[borrowed] ?? icons.SNY} />
                <Hidden xsDown>{borrowed}</Hidden>
              </Grid>
            </TableCell>
            <TableCell classes={{ root: classes.rootCell }}>
              <AnimatedNumber value={currentDebt} formatValue={formatNumbersBorrowTable} />
              {showPrefix(currentDebt)} {currentDebtSign}
            </TableCell>
            <TableCell classes={{ root: classes.rootCell }}>
              <AnimatedNumber value={deposited} formatValue={formatNumbersBorrowTable} />
              {showPrefix(deposited)} {depositedSign}
            </TableCell>
            <TableCell
              classes={{ root: classes.rootCell }}
              style={{
                color: Number(cRatio) <= 100 ? colors.green.button : colors.red.error
              }}>
              {cRatio}
              {'%'}
            </TableCell>
            <Hidden smDown>
              <TableCell classes={{ root: classes.rootCell }}>
                <AnimatedNumber
                  value={interestRate}
                  formatValue={(value: number) => value.toFixed(2)}
                />

                {'%'}
              </TableCell>
            </Hidden>
            <TableCell classes={{ root: classes.rootCell }}>
              {'$'}
              <AnimatedNumber
                value={Number(liquidationPrice)}
                formatValue={formatNumbersBorrowTable}
              />
              {showPrefix(Number(liquidationPrice))}
            </TableCell>
            <Hidden mdDown>
              <TableCell
                classes={{ root: classes.rootCell }}
                style={{
                  color: Number(cRatio) <= 100 ? colors.green.button : colors.red.error
                }}>
                {Number(maxBorrow).toFixed(2)} {borrowed} left
              </TableCell>
            </Hidden>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
