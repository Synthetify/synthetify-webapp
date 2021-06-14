import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { useSelector, useDispatch } from 'react-redux'
import solanaConnectionSelector from '#selectors/solanaConnection'
// import { actions as providerActions } from '#reducers/provider'
import { actions as solanaConnectionActions } from '#reducers/solanaConnection'
import EventsHandlers from '#containers/EventsHandlers'
import Header from '#containers/HeaderWrapper/HeaderWrapper'
import Account from '#containers/Account/Account'
import Staking from '#containers/Staking/Staking'
import Exchange from '#containers/Exchange/Exchange'
import SideMenuComponent from '#components/SideMenu/SideMenu'
import SideMenuSmallComponent from '#components/SideMenuSmall/SideMenuSmall'
import { useMediaQuery, useTheme } from '@material-ui/core'

import useStyles from './style'
export enum UiLocation {
  Account,
  Staking,
  Exchange
}
export interface ISideMenu {
  location: UiLocation
  setLocation: (location: UiLocation) => void
}
const SideMenu: React.FC<ISideMenu> = ({ location, setLocation }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  return matches ? (
    <SideMenuComponent location={location} setLocation={setLocation}></SideMenuComponent>
  ) : (
    <SideMenuSmallComponent location={location} setLocation={setLocation}></SideMenuSmallComponent>
  )
}
export default SideMenu
