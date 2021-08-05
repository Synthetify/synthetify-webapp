import { Divider, Input, InputAdornment } from '@material-ui/core'
import React, { CSSProperties, useState, useRef } from 'react'
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
  showArrow?: boolean
  walletConnected?: boolean
  noWalletHandler?: () => void
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
  onSelectToken,
  showArrow,
  walletConnected,
  noWalletHandler
}) => {
  const classes = useStyles()
  const proppedClasses = useStylesWithProps({ onSelectToken })

  const [open, setOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const allowOnlyDigitsAndTrimUnnecessaryZeros: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const regex = /^\d*\.?\d*$/
    if (e.target.value === '' || regex.test(e.target.value)) {
      const startValue = e.target.value
      const caretPosition = e.target.selectionStart

      let parsed = e.target.value
      const zerosRegex = /^0+\d+\.?\d*$/
      if (zerosRegex.test(parsed)) {
        parsed = parsed.replace(/^0+/, '')
      }

      const dotRegex = /^\.\d*$/
      if (dotRegex.test(parsed)) {
        parsed = `0${parsed}`
      }

      const diff = startValue.length - parsed.length

      setValue(parsed)
      if (caretPosition !== null && parsed !== startValue) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = Math.max(caretPosition - diff, 0)
            inputRef.current.selectionEnd = Math.max(caretPosition - diff, 0)
          }
        }, 0)
      }
    }
  }

  return (
    <>
      <Input
        inputRef={inputRef}
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
              if (!walletConnected && noWalletHandler) {
                noWalletHandler()
                return
              }

              if (tokens?.length && onSelectToken) {
                blurContent()
                setOpen(true)
              }
            }}
            >
              <Divider orientation='vertical' className={classes.divider} />
              {currency}
              {(showArrow) ? <ExpandMoreIcon style={{ marginRight: -5 }} /> : null}
            </InputAdornment>
          )
        }
        onChange={allowOnlyDigitsAndTrimUnnecessaryZeros}
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
