import React from 'react';
import { useState, useEffect } from 'react';
import { useGlobal } from '../context/GlobalProvider';
import { useFormContext } from 'react-hook-form';

export const Address = ({ parentClass = '', childClass = '', getLocation = false, labelClass = '', defaultValue }) => {
  const { register } = useFormContext();

  const { areas } = useGlobal().address;
  const [dist, setDist] = useState([]);
  const [country, setCountry] = useState(defaultValue?.country || '');
  const [nowDist, setNowDist] = useState(defaultValue?.districts || '');

  const countries = areas.map((area) => area.name);
  const countriesOpt = countries.map((country) => (
    <option value={country} key={country}>
      {country}
    </option>
  ));

  useEffect(() => {
    if (country) {
      let [theCountry] = areas.filter((area) => area.name == country);
      const { districts } = theCountry;

      const theDist = districts.map((item) => {
        return (
          <option value={item.name} key={JSON.stringify(item)}>
            {item.name}
          </option>
        );
      });

      setDist(theDist);
    }
  }, [country]);

  const handleCountry = (e) => {
    const country = e.target.value;
    if (!country) {
      setCountry('');
      return setDist([]);
    }
    setCountry(country);
  };

  return (
    <div className={`d-flex justify-content-between ${parentClass}`}>
      <div>
        <label htmlFor="country" className={`me-0-5 ${labelClass}`}>
          縣市:{' '}
        </label>
        <select
          {...register('country')}
          className={`form-select d-inline align-middle w-fit ${childClass}`}
          id="country"
          onChange={handleCountry}
          value={country}
        >
          <option value="">請選擇</option>
          {countriesOpt}
        </select>
      </div>
      <div>
        <label htmlFor="districts" className={`me-0-5 ${labelClass}`}>
          地區:{' '}
        </label>
        <select
          {...register('districts')}
          className={`d-inline align-middle form-select w-fit ${childClass}`}
          onChange={(e) => {
            setNowDist(e.target.value);
          }}
          value={nowDist}
          id="districts"
        >
          <option value="">請選擇</option>
          {dist}
        </select>
      </div>

      {getLocation && (
        <div>
          <label htmlFor="location" className={`me-0-5 ${labelClass}`}>
            地址
          </label>
          <input type="text" className={`form-control-inline w-fit ${childClass}`} {...register('location')} />
        </div>
      )}
    </div>
  );
};
