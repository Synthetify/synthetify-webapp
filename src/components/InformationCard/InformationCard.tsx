import React from 'react'
import useStyles from './style'
const InformationCard = () => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.infoBackground}>dsads</div>
      <div className={classes.info}>
        <h1 className={classes.text}>TESTOWY TEKST INFORMACYJNY</h1>
      </div>
    </div>
  )
}

export default InformationCard
