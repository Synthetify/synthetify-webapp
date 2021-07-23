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

  const inputRef = useRef<HTMLInputElement>(null)

  const allowOnlyDigitsAndTrimUnnecessaryZeroes: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const regex = /^\d*\.?\d*$/
    if (e.target.value === '' || regex.test(e.target.value)) {
      const startValue = e.target.value
      let parsed = e.target.value
      const zerosRegex = /^0+\d+\.?\d*$/
      if (zerosRegex.test(parsed)) {
        parsed = parsed.replace(/^0+/, '')
      }

      const caretPosition = e.target.selectionStart
      setValue(parsed)
      if (caretPosition !== null && parsed !== startValue) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = caretPosition - 1
            inputRef.current.selectionEnd = caretPosition - 1
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
        onChange={allowOnlyDigitsAndTrimUnnecessaryZeroes}
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
