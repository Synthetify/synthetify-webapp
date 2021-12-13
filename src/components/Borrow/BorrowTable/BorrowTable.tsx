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
import { OwnedVaults } from '../WrappedBorrow/WrappedBorrow'
interface IProp {
  ownedVaults: OwnedVaults[]
  setValueWithTable: (cRatio: number, interestRate: number, liquidationPrice: number) => void
  active: boolean
}
export const BorrowTable: React.FC<IProp> = ({ ownedVaults, setValueWithTable, active }) => {
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
          {ownedVaults.map(element => (
            <TableRow
              key={element.vault.toString()}
              className={classNames(classes.row, active ? classes.active : null)}
              onClick={() =>
                setValueWithTable(
                  Number(element.cRatio),
                  Number(element.interestRate),
                  Number(element.liquidationPrice)
                )
              }>
              <TableCell classes={{ root: classes.rootCell }}>
                <Grid container alignItems='center'>
                  <CardMedia
                    className={classes.icon}
                    image={icons[element.collateral] ?? icons.SNY}
                  />
                  <Hidden xsDown>{element.collateral}</Hidden>
                </Grid>
              </TableCell>

              <TableCell classes={{ root: classes.rootCell }}>
                <Grid container alignItems='center'>
                  <CardMedia
                    className={classes.icon}
                    image={icons[element.borrowed] ?? icons.SNY}
                  />
                  <Hidden xsDown>{element.borrowed}</Hidden>
                </Grid>
              </TableCell>
              <TableCell classes={{ root: classes.rootCell }}>
                <AnimatedNumber
                  value={element.currentDebt}
                  formatValue={formatNumbersBorrowTable}
                />
                {showPrefix(element.currentDebt)} {element.currentDebtSign}
              </TableCell>
              <TableCell classes={{ root: classes.rootCell }}>
                <AnimatedNumber value={element.deposited} formatValue={formatNumbersBorrowTable} />
                {showPrefix(element.deposited)} {element.depositedSign}
              </TableCell>
              <TableCell
                classes={{ root: classes.rootCell }}
                style={{
                  color: Number(element.cRatio) <= 100 ? colors.green.button : colors.red.error
                }}>
                {element.cRatio}
                {'%'}
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
                {'$'}
                <AnimatedNumber
                  value={Number(element.liquidationPrice)}
                  formatValue={formatNumbersBorrowTable}
                />
                {showPrefix(Number(element.liquidationPrice))}
              </TableCell>
              <Hidden mdDown>
                <TableCell
                  classes={{ root: classes.rootCell }}
                  style={{
                    color: Number(element.cRatio) <= 100 ? colors.green.button : colors.red.error
                  }}>
                  {Number(element.maxBorrow).toFixed(2)} {element.borrowed} left
                </TableCell>
              </Hidden>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
