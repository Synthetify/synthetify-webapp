import { Card,CardContent, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import {StatisticsCard} from './StatisticsCard'




interface Props {
    
}

export const StatisticCardAll = (props: Props) => {

    const classes = useStyles()
    return (
        <div className={classes.GridContainer}>
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={7}>
                    <StatisticsCard 
                        name="Collateral" 
                        value="23450456"
                        desc="Lorem ipsum dolor sit amet consectetur"
                    />
                </Grid>
                <Grid item xs={5}>
                    <StatisticsCard 
                        name="Collateral" 
                        value="23450456"
                        desc="Lorem ipsum dolor sit amet, consectetur"
                    />
                </Grid>
                <Grid item xs>
                    <StatisticsCard 
                            name="Mint" 
                            value={"450000"} 
                            desc={"Lorem ipsum dolor sit amet."}
                        />
                    </Grid>
                <Grid item xs={4} sm={5}>
                    <StatisticsCard 
                        name="Debt" 
                        value={"24456000"} 
                        desc={"Lorem ipsum dolor sit amet, consectetur"}
                    />
                </Grid>
                <Grid item xs>
                    <StatisticsCard 
                        name="Fee" 
                        value={"450000"} 
                        desc={"Lorem ipsum dolor sit amet."}
                    />
                </Grid>
            </Grid>
        </div>
    )
}


