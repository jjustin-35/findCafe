import React from 'react';
// @ts-expect-error TS(2792): Cannot find module 'react-hook-form'. Did you mean... Remove this comment to see the full error message
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

export const Select = (props: any) => {
  const { register } = useFormContext();
  const [value, setValue] = useState('');
  let { opt, optValue, name, id, onChange, className } = props;
  if (!id) {
    id = '';
  }
  if (!className) {
    className = '';
  }
  if (!optValue) {
    optValue = opt;
  }

  const handleChange = (e: any) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <select
      {...register(name)}
      className={`${className} form-select w-fit`}
      id={id}
      onChange={handleChange}
      value={value}
    >
      {opt.map((element: any, i: any) => {
        return (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <option value={optValue[i]} key={element}>
            {element}
          </option>
        );
      })}
    </select>
  );
};
