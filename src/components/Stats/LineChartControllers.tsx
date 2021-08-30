import React from 'react'
import { Button, ButtonGroup, FormControl, Grid, MenuItem } from '@material-ui/core'
import useStyles from './style'
import Select from '@material-ui/core/Select'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export interface IProps {
  activeButton: string
  onButtonClick: (date: string) => void
  onStatChange: (event: any) => void
}
export const LineChartControllers: React.FC<IProps> = ({
  activeButton,
  onButtonClick,
  onStatChange
}) => {
  const classes = useStyles()
  const selectItems: string[] = ['Volument', 'Liquidation', 'Mint', 'Burn', 'User count']
  const buttonItems: string[] = ['day', 'week', 'month', 'year']

  return (
    <Grid item container wrap='wrap' justifyContent='space-between' alignItems='center'>
      <Grid item>
        <FormControl>
          <Select
            MenuProps={{
              classes: { paper: classes.dropdown },
              disablePortal: true
            }}
            classes={{ icon: classes.icon, select: classes.selectBox }}
            IconComponent={ExpandMoreIcon}
            disableUnderline={true}
            defaultValue='Volument'
            displayEmpty={true}
            onChange={onStatChange}>
            {selectItems.map(item => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <ButtonGroup>
          {buttonItems.map(item => (
            <Button
              className={
                activeButton === item.toString() ? `${classes.activeButton}` : `${classes.button}`
              }
              onClick={() => onButtonClick(item.toString())}>
              {item[0].toUpperCase()}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}

export default LineChartControllers
