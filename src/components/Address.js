import React from 'react';
import { useState, useEffect } from 'react';

export const Address = (props) => {

    
    fetch('http://localhost:3600/data/address', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const { className } = props;

    const [where, setWhere] = useState({});
    const [distOpt, setDistOpt] = useState({});
    useEffect(() => {
        changeDistrict();
    }, [where]);

    const countries = areas.map(area => area.name);
    const countriesOpt = countries.map(country => <option value={country}>{country}</option>);

    const handleChange_area = (e) => {
        const {name, value} = e.target;
        let here = { ...where };
        
        here[name] = value;
        setWhere(here);
    }

    const changeDistrict = () => {
        let { country } = where;
        const [thisCountry] = areas.filter(area => area.name === country);
        
        const { districts } = thisCountry;
        let distOpt = districts.map(district => <option value={district.name}>{district.name}</option>);
        
        setDistOpt(distOpt);
    }

  return (
      <div>
          <select name="country" className={className} id="" onChange={handleChange_area}>
              {countriesOpt}
          </select>
          <select name="district" className={className} id="" onChange={handleChange_area}>
              {distOpt}
          </select>
          <input type="text" className={className} name='location' onChange={handleChange_area}/>
    </div>
  )
}
