import React, { useEffect, useRef } from 'react'
import './styles.css'
import { useField } from '@unform/core'

const Input = ({ label, name, size, ...rest }) => {
    const inputRef = useRef()
    const { fieldName, defaultValue, registerField, error } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])

    return (
        <div className="input-block" style={{ width: `${size}` }}>
            <label htmlFor={name}>{label}</label>

            <input name={name}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />

            <span className="input-error">{error}</span>
        </div>)
}

export default Input