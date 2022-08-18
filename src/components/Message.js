import React from 'react';

export const Message = (props) => {

    const { err, setErr } = props;
    const { boolean, msg } = err;

    if (boolean) {
        return (
            <div className='errMsg'>
                <p>{ msg }</p>
            </div>
        )
    }

    return (
        <div></div>
    )
}
