import React from 'react'
import { Typography, Modal } from '@material-ui/core'
import { PublicKey } from '@solana/web3.js'
import useStyles from './style'

export interface TokenNameWithIcon {
  name: string
  icon: string
  disabled?: boolean
}

export interface ISelectTokenModal {
  tokens: TokenNameWithIcon[]
  open: boolean
  handleClose: () => void
  onSelect: (tokenAddress: PublicKey) => void
  loading?: boolean
}

export const SelectToken: React.FC<ISelectTokenModal> = ({
  tokens,
  open,
  loading,
  handleClose,
  onSelect
}) => {
  const classes = useStyles()
  return (
    <Modal open={open} onClose={handleClose}>
      <Typography>aas</Typography>
    </Modal>
  )
}
export default SelectToken
