import React from 'react';
import { useGlobal } from '../context/GlobalProvider';
import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form'; 

import { Address } from '../components/Address';
import { Select } from '../components/Select';
import { Board } from '../components/Board';

export const Find = () => {
  const mrtApi = 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Line/TRTC?%24format=JSON';
  const mrtStation = 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Line/TRTC?%24format=JSON'
  const tags = ['有wifi', '座位多', '環境安靜', '餐點好吃', '東西便宜', '音樂好聽'];
  const enTags = ['wifi', 'seat', 'quiet', 'tasty', 'cheap', 'music'];

  const { register, handleSubmit, formState: { errors } } = useForm({shouldUnregister: true});
  const methods = { register, handleSubmit, errors };
  const { areas } = useGlobal().address;
  const { setSearch } = useGlobal().searchState;
  const [line, setLine] = useState([]);
  const [station, setStation] = useState([]);
  const [pages, setPages] = useState(1);
  const [nowPage, setNowPage] = useState(0);
  const countries = areas.map((area) => area.name);
  countries.unshift('請選擇');

  useEffect(() => {
    (async () => {
      let mrtLine = await fetch(mrtApi);
      mrtLine = await mrtLine.json();

      mrtLine = mrtLine.map((line) => {
        return {
          name: line.LineName.Zh_tw,
          id: line.LineID
        }
      })

      setLine(mrtLine);
    })()
  }, []);

  const getStation = async (e) => {
    if (e.target.value == null) {
      setStation([]);
      return null
    };
    const theLine =`&%24filter=contains(LineID%2C%20'${e.target.value}')`;
    let stations = await fetch(`https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/StationOfLine/TRTC?%24format=JSON${theLine}`);
    stations = await stations.json();

    stations = stations[0].Stations;
    stations = stations.map((station) => station.StationName.Zh_tw);

    setStation(stations);
  }

  const onSubmit = (data) => {
    let querys = {};
    let { country, districts, location, station, mrtLine, ...datas } = data;
    querys.address = { country, districts, location, mrt: station };

    for (let i in datas) {
      if (data[i]) {
        querys[i] = data[i];
      }
    }

    setSearch(querys);
  }

    return (
      <div className='py-5'>
        <div className="container w-lg-60 w-md-80 mx-auto text-primary pb-5">
          <h2 className="fs-3 fw-bold text-center mb-3">搜尋</h2>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className='fs-1-5'>
              <h3 className="fs-2 border-bottom border-primary pb-0-5">地區</h3>
              <div className="px-2 py-1 d-flex justify-content-between flex-wrap flex-lg-nowrap">
                <FormProvider {...methods}>
                  <Address getLocation={false} parentClass="w-100 mb-1"/>
                  <fieldset className='w-100 d-flex justify-content-lg-end align-items-center flex-wrap flex-md-nowrap'>
                    <legend className='w-fit me-0-5'>捷運站: </legend>
                    <div className='d-flex'>
                    <Select opt={['請選擇', ...(line.map(elem => elem.name))]} optValue={[0, ...(line.map(elem => elem.id))]} onChange={getStation} name='mrtLine' />
                      <Select opt={station} name="station"/>
                    </div>
                  </fieldset>
                </FormProvider>
              </div>
              
            </div>
            
            <div className='fs-1-5'>
              <h3 className="fs-2 border-bottom border-primary pb-0-5">評價</h3>
              <div className='px-2 py-1 d-flex justify-content-between flex-wrap flex-md-nowrap'>
                <div className="form-check"><input id="star1" className="form-check-input" {...register('star1')} type="checkbox"/><label htmlFor="star1" className='form-check-label'>1星</label></div>
                <div className="form-check"><input id="star2" className="form-check-input" {...register('star2')} type="checkbox"/><label htmlFor="star2" className='form-check-label'>2星</label></div>
                <div className="form-check"><input id="star3" className="form-check-input" {...register('star3')} type="checkbox"/><label htmlFor="star3" className='form-check-label'>3星</label></div>
                <div className="form-check"><input id="star4" className="form-check-input" {...register('star4')} type="checkbox"/><label htmlFor="star4" className='form-check-label'>4星</label></div>
                <div className="form-check"><input id="star5" className="form-check-input" {...register('star5')} type="checkbox"/><label htmlFor="star5" className='form-check-label'>5星</label></div>
              </div>
            </div>

            <div className="fs-1-5 mb-1-5">
              <h3 className="fs-2 border-bottom border-primary pb-0-5">進階</h3>
              <div className="px-2 py-1 d-flex justify-content-lg-between justify-content-start flex-wrap">
                {tags.map((tag, i) => {
                  return (
                    <div className='form-check mb-1 me-lg-auto me-1' key={`${enTags[i]}${i}`}>
                      <input type="checkbox" id={enTags[i]} {...register(enTags[i])}  className="form-check-input" />
                      <label htmlFor={enTags[i]} className="form-check-label">{ tag }</label>
                    </div>
                  )
                })}
                <div className="form-check">
                  <input type="checkbox" {...register("other")} className="form-check-input" id="other" />
                  <label htmlFor="other" className="form-check-label me-1">其他</label><input type="text" className="form-control-inline" {...register("otherInput")} /></div>
              </div>
            </div>

            <button className="btn btn-primary rounded-pill px-2 py-0-5 w-fit d-block mx-auto fs-1-5">搜尋</button>
          </form>
        </div>
        <div>
          <h2 className="fs-3 fw-bold text-primary text-center mb-3">搜尋結果</h2>
          <Board nowPage={nowPage} setNowPage={setNowPage} perpage={15} pages={ pages } setPages={setPages} />
        </div>
        
      </div>
      
  )
}
