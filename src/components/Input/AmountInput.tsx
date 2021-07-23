import { Divider, Input, InputAdornment } from '@material-ui/core'
import React, { CSSProperties, useState } from 'react'
import classNames from 'classnames'
import SelectTokenModal from '@components/Modals/SelectTokenModal/SelectTokenModal'
import { BN } from '@project-serum/anchor'
import { blurContent, unblurContent } from '@consts/uiUtils'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles, { useStylesWithProps } from './style'

interface IProps {
  setValue: (value: string) => void
  currency: string | null
  value?: string
  error?: string | null
  className?: string
  placeholder?: string
  style?: CSSProperties
  tokens?: Array<{ symbol: string, balance?: BN, decimals?: number }>
  onSelectToken?: (chosen: string) => void
}

interface inputString {
  target: { value: string }
}

export const AmountInput: React.FC<IProps> = ({
  currency,
  value,
  setValue,
  error,
  className,
  placeholder,
  style,
  tokens,
  onSelectToken
}) => {
  const classes = useStyles()
  const proppedClasses = useStylesWithProps({ tokens, onSelectToken })

  const [open, setOpen] = useState(false)

  const allowOnlyDigits = (e: inputString) => {
    const regex = /^\d*\.?\d*$/
    if (e.target.value === '' || regex.test(e.target.value)) {
      setValue(e.target.value)
    }
  }

  return (
    <>
      <Input
        error={!!error}
        className={classNames(classes.amountInput, className)}
        style={style}
        color='primary'
        type={'text'}
        value={value}
        disableUnderline={true}
        placeholder={placeholder}
        endAdornment={
          !currency ? null : (
            <InputAdornment position='end' className={classNames(classes.currency, proppedClasses.select)} onClick={() => {
              if (tokens?.length && onSelectToken) {
                blurContent()
                setOpen(true)
              }
            }}
            >
              <Divider orientation='vertical' className={classes.divider} />
              {currency}
              {(tokens?.length && onSelectToken) ? <ExpandMoreIcon style={{ minWidth: 20 }} /> : null}
            </InputAdornment>
          )
        }
        onChange={allowOnlyDigits}
      />
      {(tokens?.length && onSelectToken)
        ? (
          <SelectTokenModal
            tokens={tokens}
            open={open}
            centered={true}
            anchorEl={null}
            onSelect={onSelectToken}
            handleClose={() => {
              unblurContent()
              setOpen(false)
            }}
          />
        )
        : null
      }
    </>
  )
}
export default AmountInput
