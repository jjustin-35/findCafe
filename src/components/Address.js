import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { MyContext } from '../App';

export const Address = (props) => {

    const { className } = props;

    const { address } = useContext(MyContext);
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
      <div>
          <select name="country" className={className} id="" onChange={handleCountry}>
              <option value="null">請選擇</option>
              {countriesOpt}
          </select>
          <select name="districts" className={className} id="">
            <option value="null">請選擇</option>
              {dist.map((item) => {
                  return (
                      <option value={item.name} key={JSON.stringify(item)}>{ item.name }</option>
                  )
              })}
          </select>
          <input type="text" className={className} name='location'/>
    </div>
  )
}
