import React from 'react'
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

export const Select = (props) => {
    const { register } = useFormContext();
    const [value, setValue] = useState("");
    let { opt, optValue, name, id, onChange, className } = props;
    if (!id) {
        id = '';
    }
    if (!className) {
        className = ''
    }
    if (!optValue) {
        optValue = opt;
    }

    const handleChange = (e) => {
        setValue(e.target.value);
        if (onChange) {
            onChange(e);
        }
    }

    return (
        <select {...register(name)} className={`${className} form-select w-fit`} id={id} onChange={handleChange} value={value}>
            {opt.map((element, i) => {
                return (
                    <option value={optValue[i]} key={element}>{ element }</option>
                )
            })}
        </select>
    )
}
