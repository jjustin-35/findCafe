import React from 'react'
import { useFormContext } from 'react-hook-form';

export const Select = (props) => {
    const { register } = useFormContext();
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

    return (
        <select {...register(name)} className={`${className} form-select w-fit`} id={id} onChange={onChange}>
            {opt.map((element, i) => {
                return (
                    <option value={optValue[i]} key={element}>{ element }</option>
                )
            })}
        </select>
    )
}
