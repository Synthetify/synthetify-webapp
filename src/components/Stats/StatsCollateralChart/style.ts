import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'
//import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');


const useStyles = makeStyles((theme: Theme) => ({
    chartWrapper:{
        // fontFamily: "Inter, sans-serif",
        // fontWeight: 400,
        width: 1024,
        height: 128,
        //backgroundColor: colors.navy.background,
        borderRadius: 10,


    },
    legendWrapper:{
        width: '100%',
        display: 'flex',
        justifyContent: "space-between",
        fontSize: 18,
        flexWrap: "wrap",
    },
}))  

export default useStyles
