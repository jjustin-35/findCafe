import React from 'react'

export const Select = (props) => {
    let { opt, name, id, onChange } = props;
    if (!id) {
        id = '';
    }

    return (
        <select className='form-select' name={name} id={id} onChange={onChange}>
            {opt.map(element => {
                return (
                    <option value={element} key={element}>{ element }</option>
                )
            })}
        </select>
    )
}
