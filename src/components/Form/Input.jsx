import React from 'react'
import './styles.css'

export default function Input(props) {
    const { label, inputType, name, validate, size, placeholder } = props
    console.log(props)
    return (
        <div className="input-block" style={{width: {size}}}>
            <label htmlFor={name}>{label}</label>
            <input className={validate?.[0]} type={inputType} id={name} placeholder={placeholder} />
            <span className={`${validate?.[0]}-span`}>{validate?.[1]}</span>
        </div>)
}