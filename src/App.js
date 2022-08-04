import React from 'react';
import { useState } from 'react';
import { AddCafe } from './pages/AddCafe';

export const App = () => {

  const [err, setErr] = useState({
    boolean: false,
    msg: ''
  });

  return (
    <div>
      <AddCafe err={ err } setErr={setErr} />
    </div>
  )
}
