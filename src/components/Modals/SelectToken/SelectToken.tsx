import React from 'react'
import { Typography, Modal } from '@material-ui/core'
import { PublicKey } from '@solana/web3.js'
import useStyles from './style'

interface TokenNameWithIcon {
  name: string
  icon: string
  disabled?: boolean
}

export interface ISelectTokenModal {
  tokens: TokenNameWithIcon[]
  open: boolean
  loading: boolean
  handleClose: () => void
  onSelect: (tokenAddress: PublicKey) => void
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
