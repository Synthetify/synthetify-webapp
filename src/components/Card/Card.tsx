import React from 'react'

export interface Props {
    content:string,
    value:number
}

const style = {
    card:{
        backgroundColor:"#1c1c39",
        width:"194px",
        borderRadius:"24px",
        padding:"16px",
        color:"white"
    },
    header:{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between"
    },
}

export const Card = (props: Props) => {
    return (
        <div style={style.card}>
            <div style={style.header}>
                <h2>{props.content}</h2><p style={{color:"#6160bc"}}>last 24h</p>
            </div>
            <h2 style={{textAlign:"center",letterSpacing:"4px",fontSize:"32px",marginTop:"0",color:"#6160bc"}}>
                <b>{props.value}</b>
            </h2>
            <p style={{textAlign:"center",color:"#6160bc"}}>Lorem ipsum dolor sit amet</p>
        </div>
    )
}
