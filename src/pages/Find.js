import React from 'react';
import { useGlobal } from '../context/GlobalProvider';
import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form'; 

import { Address } from '../components/Address';
import { Select } from '../components/Select';
import { Board } from '../components/Board';

export const Find = () => {
  document.title = "找找咖啡 | 搜尋"

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
  const [pages, setPages] = useState(0);
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
    })();
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
    let address = { country, districts, location, mrt: station }
    for (let i in address) {
      if (!address[i]) {
        delete address[i]
      }
    }
    querys.address = address;
    
    let stars = [];
    for (let prop in datas) {
      const star = prop.match("star");
      if (star) {
        if (datas[prop]) {
          stars = [...stars, Number(prop.replace(star[0], ""))]
        }
      } else if (datas[prop]) {
        for (let tag of enTags) {
          if (prop === tag) {
            datas[prop] = "$gte4";
          }
        }
        querys[prop] = datas[prop]
      }
    }
    querys.star = stars;

    setSearch(querys);
  }

    return (
      <div className='py-5 container position-relative'>
        <h2 className="fs-3 fw-bold mb-3 text-center text-primary">搜尋</h2>
        <div className="row">
          <div className="col-lg-3 mb-1-5 mb-md-0 d-none d-lg-block">
          <form action="" onSubmit={handleSubmit(onSubmit)} className=" text-primary border border-black bg-info rounded-3 accordion pb-1">
            <div className='fs-1 accordion-item bg-info'>
                <h3 className="accordion-header">
                  <button className="accordion-button bg-info" data-bs-toggle="collapse" data-bs-target="#accordion1" aria-expanded="true" onClick={(e)=>{e.preventDefault()}}>
                    地區
                  </button>
                </h3>
                <div className="accordion-collapse collapse show" id='accordion1'>
                  <div className="accordion-body">
                    <FormProvider {...methods}>
                      <Address getLocation={false} parentClass="w-100 mb-1"/>
                      <fieldset className='w-100'>
                        <legend className='w-fit me-0-5 fs-1'>捷運站: </legend>
                        <div className='d-flex'>
                          <Select opt={['請選擇', ...(line.map(elem => elem.name))]} optValue={[null, ...(line.map(elem => elem.id))]} onChange={getStation} name='mrtLine' />
                          <Select opt={station} name="station"/>
                        </div>
                      </fieldset>
                    </FormProvider>
                  </div>
              </div>
              
            </div>
            
            <div className='fs-1'>
                <h3 className="accordion-header">
                  <button className="accordion-button bg-info" data-bs-toggle="collapse" data-bs-target="#accordion2" aria-expanded="true" onClick={(e)=>{e.preventDefault()}}>評價</button>
                </h3>
                <div className='accordion-collapse collapse show' id='accordion2'>
                  <div className='accordion-body bg-info d-flex justify-content-between flex-wrap'>
                  <div className="form-check"><input id="star1" className="form-check-input" {...register('star1')} type="checkbox"/><label htmlFor="star1" className='form-check-label'>1星</label></div>
                    <div className="form-check"><input id="star2" className="form-check-input" {...register('star2')} type="checkbox"/><label htmlFor="star2" className='form-check-label'>2星</label></div>
                    <div className="form-check"><input id="star3" className="form-check-input" {...register('star3')} type="checkbox"/><label htmlFor="star3" className='form-check-label'>3星</label></div>
                    <div className="form-check"><input id="star4" className="form-check-input" {...register('star4')} type="checkbox"/><label htmlFor="star4" className='form-check-label'>4星</label></div>
                    <div className="form-check"><input id="star5" className="form-check-input" {...register('star5')} type="checkbox"/><label htmlFor="star5" className='form-check-label'>5星</label></div>
                  </div>
              </div>
            </div>

            <div className="fs-1">
                <h3 className="accordion-header">
                  <button className="accordion-button bg-info" data-bs-toggle="collapse" data-bs-target="#accordion3" onClick={(e)=>{e.preventDefault()}}>
                    進階
                  </button>
                </h3>
                <div className="accordion-collapse collapse show" id='accordion3'>
                  <div className="accordion-body bg-info">
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
                  <label htmlFor="other" className="form-check-label me-1">其他</label><input type="text" className="form-control-inline rounded-1" {...register("otherInput")} /></div>
                  </div>
              </div>
            </div>

            <button className="btn btn-primary btn-hover btn-hover-pill rounded-3 px-2 py-0-5 w-fit d-block mx-auto fs-1-5">搜尋</button>
          </form>
          </div>
          <div className='col'>
          <Board nowPage={nowPage} setNowPage={setNowPage} perpage={5} pages={ pages } setPages={setPages}/>
          </div>
        </div>
        <button className="btn btn-black rounded-start rounded-0 py-2 px-0-5 d-lg-none position-fixed top-15 end-0" data-bs-scroll="true" data-bs-toggle="offcanvas" data-bs-target="#condition">篩<br />選</button>
        <div id="condition" className="offcanvas offcanvas-end bg-info border-0" tabindex="-1">
        <div class="offcanvas-header">
          <h3 className="offcanvas-title" id="conditionLabel">篩選</h3>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" ariaLabel="Close"></button>
        </div>
          <div className="offcanva-body overflow-scroll">
          <form action="" onSubmit={handleSubmit(onSubmit)} className=" text-primary bg-info accordion pb-1">
            <div className='fs-1 accordion-item bg-info'>
                <h3 className="accordion-header">
                  <button className="accordion-button bg-info" data-bs-toggle="collapse" data-bs-target="#accordion1" aria-expanded="true">
                    地區
                  </button>
                </h3>
                <div className="accordion-collapse collapse show" id='accordion1'>
                  <div className="accordion-body">
                    <FormProvider {...methods}>
                      <Address getLocation={false} parentClass="w-100 mb-1"/>
                      <fieldset className='w-100'>
                        <legend className='w-fit me-0-5 fs-1'>捷運站: </legend>
                        <div className='d-flex'>
                        <Select opt={['請選擇', ...(line.map(elem => elem.name))]} optValue={[0, ...(line.map(elem => elem.id))]} onChange={getStation} name='mrtLine' />
                          <Select opt={station} name="station"/>
                        </div>
                      </fieldset>
                    </FormProvider>
                  </div>
              </div>
              
            </div>
            
            <div className='fs-1'>
                <h3 className="accordion-header">
                  <button className="accordion-button bg-info" data-bs-toggle="collapse" data-bs-target="#accordion2" aria-expanded="true">評價</button>
                </h3>
                <div className='accordion-collapse collapse show' id='accordion2'>
                  <div className='accordion-body bg-info d-flex justify-content-between flex-wrap'>
                  <div className="form-check"><input id="star1" className="form-check-input" {...register('star1')} type="checkbox"/><label htmlFor="star1" className='form-check-label'>1星</label></div>
                    <div className="form-check"><input id="star2" className="form-check-input" {...register('star2')} type="checkbox"/><label htmlFor="star2" className='form-check-label'>2星</label></div>
                    <div className="form-check"><input id="star3" className="form-check-input" {...register('star3')} type="checkbox"/><label htmlFor="star3" className='form-check-label'>3星</label></div>
                    <div className="form-check"><input id="star4" className="form-check-input" {...register('star4')} type="checkbox"/><label htmlFor="star4" className='form-check-label'>4星</label></div>
                    <div className="form-check"><input id="star5" className="form-check-input" {...register('star5')} type="checkbox"/><label htmlFor="star5" className='form-check-label'>5星</label></div>
                  </div>
              </div>
            </div>

            <div className="fs-1">
                <h3 className="accordion-header">
                  <button className="accordion-button bg-info" data-bs-toggle="collapse" data-bs-target="#accordion3">
                    進階
                  </button>
                </h3>
                <div className="accordion-collapse collapse show" id='accordion3'>
                  <div className="accordion-body bg-info">
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
                  <label htmlFor="other" className="form-check-label me-1">其他</label><input type="text" className="form-control-inline rounded-1" {...register("otherInput")} /></div>
                  </div>
              </div>
            </div>

            <button className="btn btn-primary btn-hover btn-hover-pill rounded-3 px-2 py-0-5 w-fit d-block mx-auto fs-1-5">搜尋</button>
          </form>
          </div>
        </div>
      </div>
      
  )
}
