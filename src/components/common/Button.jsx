import React from 'react'

const Button = ({ title = "button", onClick = () =>{console.log('Button clicked')} }) => {

    return (

        <button className="action-btn" onClick={onClick}>{title}</button>

    )
}


export default Button
