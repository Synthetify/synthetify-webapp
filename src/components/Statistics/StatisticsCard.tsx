import { Card,CardContent, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import AnimatedNumber from '@components/AnimatedNumber'

interface IProps {
    name:string,
    value: string,
    desc:string
}

export const StatisticsCard: React.FC<IProps>= ({name,value,desc}) => {
    const classes = useStyles()
    return (
        <Card className={classes.Card}>
            <CardContent classes={{root:classes.root}}>
                <Typography className={classes.Header}>
                    <h1 className={classes.CardName}>{name}</h1>
                    <p className={classes.CardTime}>last 24h</p>
                </Typography>
                <Typography className={classes.CardValue}>
                <AnimatedNumber
                    value={value}
                    duration={400}
                    formatValue={(value: string) => {
                    const num = Number(value)
                        return num.toFixed(0)
                    }}
                />
                </Typography>
                <Typography className={classes.CardDesc}>{desc}</Typography>
            </CardContent>
        </Card>
    )
}

