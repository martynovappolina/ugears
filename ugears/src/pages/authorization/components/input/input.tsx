import React from 'react'
import inputStyle from './input.module.scss'

type InputProps = {
    type: string;
    value?: string;
    placeholder: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({type, value, placeholder, onChange}) => {
    return <input className={inputStyle.input} value = {value} type={type} placeholder={placeholder} onChange={onChange}></input>
}

export default React.memo(Input)