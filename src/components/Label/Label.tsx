import React from 'react'
import {dataPie} from '../../mockedData'

const style = {
    li:{
        display:"flex",
        alignItems:"center",
        justifyContent:"start",
        padding:"12px 0"
    },
    ul:{
        width:"20%",
        backgroundColor:"#1c1c39",
        borderRadius:"24px",
        
    },
    h1:{
        fontSize:"24px"
    },
    p:{
        color:"white",
        fontSize:"18px",
        padding:"0 0 0 14px"
    }
}


export const Label = () => {

    const labelItems = (): JSX.Element[] =>{
        return dataPie.map(({id,color,label,value}) =>
            <li key={id} style={style.li}><h1 style={{color:color}}>{label}</h1><p style={style.p}>({value.toString().replace('.',',')}%)</p></li>
    )}
    
    return (
        <ul style={style.ul}>
            {labelItems()}
        </ul>
    )
}
