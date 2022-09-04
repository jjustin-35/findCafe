import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useGlobal } from '../context/GlobalProvider';
import { useFormContext } from 'react-hook-form';

export const Address = (props) => {
  const { register } = useFormContext();
    const { parentClass = "", childClass = "", getLocation = false, labelClass = ""} = props;

    const { address } = useGlobal();
    const { areas, setAreas } = address;
    const [dist, setDist] = useState([]);

    const countries = areas.map(area => area.name);
    const countriesOpt = countries.map(country => <option value={country} key={country}>{country}</option>);

    const handleCountry = (e) => {
        const country = e.target.value;

        let [theCountry] = areas.filter(area => area.name == country);
        const {districts} = theCountry;

        setDist(districts);
    }

  return (
      <div className={`d-flex justify-content-between ${parentClass}`}>
          <div>
          <label htmlFor="country" className={`me-0-5 ${labelClass}`}>縣市: </label>
            <select {...register("country")} className={`form-select d-inline align-middle w-fit ${childClass}`} id="country" onChange={handleCountry}>
            <option value="null">請選擇</option>
                {countriesOpt}
            </select>
          </div>
          <div>
          <label htmlFor="districts" className={`me-0-5 ${labelClass}`}>地區: </label>
            <select {...register("districts")} className={`d-inline align-middle form-select w-fit ${childClass}`} id="districts">
            <option value="null">請選擇</option>
                {dist.map((item) => {
                    return (
                        <option value={item.name} key={JSON.stringify(item)}>{ item.name }</option>
                    )
                })}
            </select>
          </div>
          
          {getLocation && <div>
            <label htmlFor="location" className={`me-0-5 ${labelClass}`}>地址</label>
            <input type="text" className={`form-control-inline w-fit ${childClass}`} {...register('location')} />
          </div>}
    </div>
  )
}
