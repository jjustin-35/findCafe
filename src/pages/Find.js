import React from 'react';
import { Board } from '../components/Board';

export const Find = () => {
    return (
      <>
        <div>Search</div>
        <Board page={0} perpage={15} />
      </>
      
  )
}
