import React from 'react';

export const Message = ({err}) => {

    if (err) {
        return (
            <div className='bg-danger mt-0-5 rounded-2'>
                <p className='text-red p-1'>{ err }</p>
            </div>
        )
    }

    return (
        <div></div>
    )
}
