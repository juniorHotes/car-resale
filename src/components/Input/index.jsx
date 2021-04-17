import React from 'react'

export default function Input({ label, inputType, name, validate, rest }) {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input className={validate?.[0]} type={inputType} id={name} {...rest} />
            <span className={`${validate?.[0]}-span`}>{validate?.[1]}</span>
        </div>)
}