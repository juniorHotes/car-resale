import React from 'react'
import './styles.css'

export default function Input({ size, label, inputType, name, validate, ...rest }) {
    console.log(size)
    return (
        <div className="input-block" style={{width: `${size}`}}>
            <label htmlFor={name}>{label}</label>
            <input className={validate?.[0]} type={inputType} id={name} {...rest} />
            <span className={`${validate?.[0]}-span`}>{validate?.[1]}</span>
        </div>)
}