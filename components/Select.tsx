import React, { useState, ChangeEvent } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface SelectProps {
  opt: string[];
  optValue?: string[];
  name: string;
  id?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  register?: UseFormRegister<FieldValues>;
}

const Select: React.FC<SelectProps> = ({ opt, optValue, name, id = '', onChange, className = '', register }) => {
  const [value, setValue] = useState<string>('');

  if (!optValue) {
    optValue = opt;
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <select
      {...register(name)}
      className={`${className} form-select w-fit`}
      id={id}
      onChange={handleChange}
      value={value}
    >
      {opt.map((element, i) => (
        <option value={optValue[i]} key={element}>
          {element}
        </option>
      ))}
    </select>
  );
};

export default Select;
