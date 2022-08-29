import React from 'react';

export const Message = ({err}) => {

    if (err) {
        return (
            <div className='bg-danger opacity-25 text-danger'>
                <p>{ err }</p>
            </div>
        )
    }

    return (
        <div></div>
    )
}
