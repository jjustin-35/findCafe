import React from 'react';
import { useState, useEffect } from 'react';

export const Address = (props) => {

    const { className } = props;

    const [areas, setAreas] = useState([]);
    const [dist, setDist] = useState([]);

    useEffect(() => {
        (async function getData() {
            let areas = await fetch('http://localhost:3600/data/address', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    
            areas = await areas.json();
    
            setAreas(areas);
        }());
    }, []);

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
