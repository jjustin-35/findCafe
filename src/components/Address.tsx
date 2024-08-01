import React from 'react';
import { useState, useEffect } from 'react';
// @ts-expect-error TS(6142): Module '../context/GlobalProvider' was resolved to... Remove this comment to see the full error message
import { useGlobal } from '../context/GlobalProvider';
// @ts-expect-error TS(2792): Cannot find module 'react-hook-form'. Did you mean... Remove this comment to see the full error message
import { useFormContext } from 'react-hook-form';

export const Address = ({
  parentClass = '',
  childClass = '',
  getLocation = false,
  labelClass = '',
  defaultValue
}: any) => {
  const { register } = useFormContext();

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { areas } = useGlobal().address;
  const [dist, setDist] = useState([]);
  const [country, setCountry] = useState(defaultValue?.country || '');
  const [nowDist, setNowDist] = useState(defaultValue?.districts || '');

  const countries = areas.map((area: any) => area.name);
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  const countriesOpt = countries.map((country: any) => <option value={country} key={country}>
    {country}
  </option>);

  useEffect(() => {
    if (country) {
      let [theCountry] = areas.filter((area: any) => area.name == country);
      const { districts } = theCountry;

      const theDist = districts.map((item: any) => {
        return (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <option value={item.name} key={JSON.stringify(item)}>
            {item.name}
          </option>
        );
      });

      setDist(theDist);
    }
  }, [country]);

  const handleCountry = (e: any) => {
    const country = e.target.value;
    if (!country) {
      setCountry('');
      return setDist([]);
    }
    setCountry(country);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={`d-flex justify-content-between ${parentClass}`}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <label htmlFor="country" className={`me-0-5 ${labelClass}`}>
          縣市:{' '}
        </label>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <select
          {...register('country')}
          className={`form-select d-inline align-middle w-fit ${childClass}`}
          id="country"
          onChange={handleCountry}
          value={country}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <option value="">請選擇</option>
          {countriesOpt}
        </select>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <label htmlFor="districts" className={`me-0-5 ${labelClass}`}>
          地區:{' '}
        </label>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <select
          {...register('districts')}
          className={`d-inline align-middle form-select w-fit ${childClass}`}
          onChange={(e) => {
            setNowDist(e.target.value);
          }}
          value={nowDist}
          id="districts"
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <option value="">請選擇</option>
          {dist}
        </select>
      </div>

      {getLocation && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <label htmlFor="location" className={`me-0-5 ${labelClass}`}>
            地址
          </label>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <input type="text" className={`form-control-inline w-fit ${childClass}`} {...register('location')} />
        </div>
      )}
    </div>
  );
};
