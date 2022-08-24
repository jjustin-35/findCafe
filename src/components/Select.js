import React from 'react'

export const Select = (props) => {
    let { opt, name, id, onChange, className } = props;
    if (!id) {
        id = '';
    }
    if (!className) {
        className = ''
    }

    return (
        <select className={`${className} form-select w-fit`} name={name} id={id} onChange={onChange}>
            {opt.map(element => {
                return (
                    <option value={element} key={element}>{ element }</option>
                )
            })}
        </select>
    )
}
