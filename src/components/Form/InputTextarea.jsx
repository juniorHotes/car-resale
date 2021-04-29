import React, { useEffect, useRef } from 'react'
import './styles.css'
import { useField } from '@unform/core'

const InputTextarea = ({ label, name, size, ...rest }) => {
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

            <textarea name={name}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            ></textarea>

            <span className="input-error">{error}</span>
        </div>)
}

export default InputTextarea