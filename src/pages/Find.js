import React from 'react';
import { useGlobal } from '../context/GlobalProvider';
import { useState } from 'react';
import { useForm } from 'react-hook-form'; 

import { Address } from '../components/Address';
import { Select } from '../components/Select';
import { Board } from '../components/Board';

export const Find = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { areas } = useGlobal().address;
  const { setSearch } = useGlobal().searchState;
  const countries = areas.map((area) => area.name);
  countries.unshift('請選擇');

  const tags = ['有wifi', '座位多', '環境安靜', '餐點好吃', '東西便宜', '音樂好聽'];
  const enTags = ['wifi', 'seat', 'quiet', 'tasty', 'cheap', 'music'];

  const onSubmit = () => {
    
  }
    return (
      <div className='py-5'>
        <div className="container w-md-60 mx-auto text-primary pb-5">
          <h2 className="fs-3 fw-bold text-center mb-3">搜尋</h2>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className='fs-1-5'>
              <h3 className="fs-2 border-bottom border-primary pb-0-5">地區</h3>
              <div className="px-2 py-1">
                <Address getLocation={false}/>
              </div>
              
            </div>
            
            <div className='fs-1-5'>
              <h3 className="fs-2 border-bottom border-primary pb-0-5">評價</h3>
              <div className='px-2 py-1 d-flex justify-content-between'>
                <div className="form-check"><input id="star1" className="form-check-input" name="star1" type="checkbox"/><label htmlFor="star1" className='form-check-label'>1星</label></div>
                <div className="form-check"><input id="star2" className="form-check-input" name="star2" type="checkbox"/><label htmlFor="star2" className='form-check-label'>2星</label></div>
                <div className="form-check"><input id="star3" className="form-check-input" name="star3" type="checkbox"/><label htmlFor="star3" className='form-check-label'>3星</label></div>
                <div className="form-check"><input id="star4" className="form-check-input" name="star4" type="checkbox"/><label htmlFor="star4" className='form-check-label'>4星</label></div>
                <div className="form-check"><input id="star5" className="form-check-input" name="star5" type="checkbox"/><label htmlFor="star5" className='form-check-label'>5星</label></div>
              </div>
            </div>

            <div className="fs-1-5 mb-1-5">
              <h3 className="fs-2 border-bottom border-primary pb-0-5">進階</h3>
              <div className="px-2 py-1 d-flex justify-content-md-between justify-content-start flex-wrap">
                {tags.map((tag, i) => {
                  return (
                    <div className='form-check mb-1 me-md-auto me-1' key={`${enTags[i]}${i}`}>
                      <input type="checkbox" id={enTags[i]} name={enTags[i]} className="form-check-input" />
                      <label htmlFor={enTags[i]} className="form-check-label">{ tag }</label>
                    </div>
                  )
                })}
                <div className="form-check">
                  <input type="checkbox" name="other" className="form-check-input" id="other" />
                  <label htmlFor="other" className="form-check-label me-1">其他</label><input type="text" className="form-control-inline" /></div>
              </div>
            </div>

            <button className="btn btn-primary rounded-pill px-2 py-0-5 w-fit d-block mx-auto fs-1-5">搜尋</button>
          </form>
        </div>
        <div>
          <h2 className="fs-3 fw-bold text-primary text-center mb-3">搜尋結果</h2>
          <Board page={0} perpage={15} />
        </div>
        
      </div>
      
  )
}
