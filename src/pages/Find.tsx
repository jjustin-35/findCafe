import React from 'react';
// @ts-expect-error TS(6142): Module '../context/GlobalProvider' was resolved to... Remove this comment to see the full error message
import { useGlobal } from '../context/GlobalProvider';
import { useState, useEffect } from 'react';
// @ts-expect-error TS(2792): Cannot find module 'react-hook-form'. Did you mean... Remove this comment to see the full error message
import { useForm, FormProvider } from 'react-hook-form';

// @ts-expect-error TS(6142): Module '../components/Address' was resolved to 'C:... Remove this comment to see the full error message
import { Address } from '../components/Address';
// @ts-expect-error TS(6142): Module '../components/Select' was resolved to 'C:/... Remove this comment to see the full error message
import { Select } from '../components/Select';
// @ts-expect-error TS(6142): Module '../components/Board' was resolved to 'C:/U... Remove this comment to see the full error message
import { Board } from '../components/Board';

export const Find = () => {
  document.title = '找找咖啡 | 搜尋';

  const mrtApi = 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Line/TRTC?%24format=JSON';
  const mrtStation = 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Line/TRTC?%24format=JSON';
  const tags = ['有wifi', '座位多', '環境安靜', '餐點好吃', '東西便宜', '音樂好聽'];
  const enTags = ['wifi', 'seat', 'quiet', 'tasty', 'cheap', 'music'];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ shouldUnregister: true });
  const methods = { register, handleSubmit, errors };
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { areas } = useGlobal().address;
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { setSearch } = useGlobal().searchState;
  const [line, setLine] = useState([]);
  const [station, setStation] = useState([]);
  const [pages, setPages] = useState(0);
  const [nowPage, setNowPage] = useState(0);
  const countries = areas.map((area: any) => area.name);
  countries.unshift('請選擇');

  useEffect(() => {
    (async () => {
      let mrtLine = await fetch(mrtApi);
      mrtLine = await mrtLine.json();

      // @ts-expect-error TS(2339): Property 'map' does not exist on type 'Response'.
      mrtLine = mrtLine.map((line: any) => {
        return {
          name: line.LineName.Zh_tw,
          id: line.LineID,
        };
      });

      // @ts-expect-error TS(2345): Argument of type 'Response' is not assignable to p... Remove this comment to see the full error message
      setLine(mrtLine);
    })();
  }, []);

  const getStation = async (e: any) => {
    if (e.target.value == null) {
      setStation([]);
      return null;
    }
    const theLine = `&%24filter=contains(LineID%2C%20'${e.target.value}')`;
    let stations = await fetch(
      `https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/StationOfLine/TRTC?%24format=JSON${theLine}`,
    );
    stations = await stations.json();

    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!stations[0]) {
      return setStation([]);
    }

    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    stations = stations[0].Stations;
    // @ts-expect-error TS(2339): Property 'map' does not exist on type 'Response'.
    stations = stations.map((station: any) => station.StationName.Zh_tw);

    // @ts-expect-error TS(2345): Argument of type 'Response' is not assignable to p... Remove this comment to see the full error message
    setStation(stations);

    line.forEach((elem) => {
      // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
      if (e.target.value === elem.id) {
        // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
        e.target.value = elem.name;
      }
    });
  };

  const onSubmit = (data: any) => {
    let querys = {};
    let { country, districts, location, station, mrtLine, other, keyword, ...datas } = data;
    console.log(data);
    // other
    if (other && keyword) {
      // @ts-expect-error TS(2339): Property 'keyword' does not exist on type '{}'.
      querys.keyword = keyword;
    }
    // address
    let address = { country, districts, location, mrt: station };
    for (let i in address) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!address[i] || address[i] === '請選擇') {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        delete address[i];
      }
    }
    // @ts-expect-error TS(2339): Property 'address' does not exist on type '{}'.
    querys.address = address;

    let stars: any = [];
    for (let prop in datas) {
      const star = prop.match('star');

      if (star) {
        if (datas[prop] && datas[prop].length !== 0) {
          stars = [...stars, Number(prop.replace(star[0], ''))];
        }
      } else if (datas[prop] && datas[prop].length !== 0) {
        for (let tag of enTags) {
          if (prop === tag) {
            datas[prop] = '$gte4';
          }
        }
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        querys[prop] = datas[prop];
      }
    }
    // @ts-expect-error TS(2339): Property 'star' does not exist on type '{}'.
    querys.star = stars;

    setSearch(querys);
    setNowPage(0);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="py-5 container position-relative">
      {/* <h2 className="fs-3 fw-bold mb-3 text-center text-primary">搜尋</h2> */}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="row">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="col-lg-3 mb-1-5 mb-md-0 d-none d-lg-block">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className=" text-primary border border-black bg-info rounded-3 accordion pb-1"
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="fs-1 accordion-item bg-info">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h3 className="accordion-header">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <button
                  className="accordion-button bg-info"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion1"
                  aria-expanded="true"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  地區
                </button>
              </h3>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className="accordion-collapse collapse show" id="accordion1">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="accordion-body">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <FormProvider {...methods}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Address getLocation={false} parentClass="w-100 mb-1 flex-xl-nowrap flex-wrap" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <fieldset className="w-100">
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <legend className="w-fit me-0-5 fs-1">捷運站: </legend>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <div className="d-flex flex-wrap">
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <Select
                          // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                          opt={['請選擇', ...line.map((elem) => elem.name)]}
                          // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                          optValue={[null, ...line.map((elem) => elem.id)]}
                          onChange={getStation}
                          name="mrtLine"
                        />
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <Select opt={['請選擇', ...station]} name="station" />
                      </div>
                    </fieldset>
                  </FormProvider>
                </div>
              </div>
            </div>

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="fs-1">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h3 className="accordion-header">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <button
                  className="accordion-button bg-info"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion2"
                  aria-expanded="true"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  評價
                </button>
              </h3>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className="accordion-collapse collapse show" id="accordion2">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="accordion-body bg-info d-flex justify-content-xl-between justify-content-lg-start justify-content-between flex-wrap">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="form-check me-0 me-lg-1 me-xl-0">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input id="star1" className="form-check-input" {...register('star1')} type="checkbox" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <label htmlFor="star1" className="form-check-label">
                      1星
                    </label>
                  </div>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="form-check me-0 me-lg-1 me-xl-0">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input id="star2" className="form-check-input" {...register('star2')} type="checkbox" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <label htmlFor="star2" className="form-check-label">
                      2星
                    </label>
                  </div>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="form-check me-0 me-lg-1 me-xl-0">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input id="star3" className="form-check-input" {...register('star3')} type="checkbox" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <label htmlFor="star3" className="form-check-label">
                      3星
                    </label>
                  </div>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="form-check me-0 me-lg-1 me-xl-0">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input id="star4" className="form-check-input" {...register('star4')} type="checkbox" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <label htmlFor="star4" className="form-check-label">
                      4星
                    </label>
                  </div>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="form-check me-0 me-lg-1 me-xl-0">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input id="star5" className="form-check-input" {...register('star5')} type="checkbox" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <label htmlFor="star5" className="form-check-label">
                      5星
                    </label>
                  </div>
                </div>
              </div>
            </div>

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="fs-1">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h3 className="accordion-header">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <button
                  className="accordion-button bg-info"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion3"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  進階
                </button>
              </h3>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className="accordion-collapse collapse show" id="accordion3">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="accordion-body bg-info">
                  {tags.map((tag, i) => {
                    return (
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <div className="form-check mb-1 me-lg-auto me-1" key={`${enTags[i]}${i}`}>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <input type="checkbox" id={enTags[i]} {...register(enTags[i])} className="form-check-input" />
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <label htmlFor={enTags[i]} className="form-check-label">
                          {tag}
                        </label>
                      </div>
                    );
                  })}
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="form-check">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input type="checkbox" {...register('other')} className="form-check-input" id="other" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <label htmlFor="other" className="form-check-label me-1">
                      其他
                    </label>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input type="text" className="form-control rounded-1" {...register('keyword')} />
                  </div>
                </div>
              </div>
            </div>

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button className="btn btn-primary btn-hover btn-hover-pill rounded-3 px-2 py-0-5 w-fit d-block mx-auto fs-1-5">
              搜尋
            </button>
          </form>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="col">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Board nowPage={nowPage} setNowPage={setNowPage} perpage={5} pages={pages} setPages={setPages} />
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <button
        className="btn btn-black rounded-start rounded-0 py-2 px-0-5 d-lg-none position-fixed top-15 end-0"
        data-bs-scroll="true"
        data-bs-toggle="offcanvas"
        data-bs-target="#condition"
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        篩<br />選
      </button>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div id="condition" className="offcanvas offcanvas-end bg-info border-0" tabindex="-1">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div class="offcanvas-header">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <h3 className="offcanvas-title" id="conditionLabel">
            篩選
          </h3>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" ariaLabel="Close"></button>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="offcanva-body overflow-scroll">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <form action="" onSubmit={handleSubmit(onSubmit)} className=" text-primary bg-info accordion pb-1">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="fs-1 accordion-item bg-info">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h3 className="accordion-header">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <button
                  className="accordion-button bg-info"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion1"
                  aria-expanded="true"
                >
                  地區
                </button>
              </h3>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className="accordion-collapse collapse show" id="accordion1">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="accordion-body">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <FormProvider {...methods}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Address getLocation={false} parentClass="w-100 mb-1" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <fieldset className="w-100">
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <legend className="w-fit me-0-5 fs-1">捷運站: </legend>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <div className="d-flex">
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <Select
                          // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                          opt={['請選擇', ...line.map((elem) => elem.name)]}
                          // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                          optValue={[0, ...line.map((elem) => elem.id)]}
                          onChange={getStation}
                          name="mrtLine"
                        />
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <Select opt={station} name="station" />
                      </div>
                    </fieldset>
                  </FormProvider>
                </div>
              </div>
            </div>

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="fs-1">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h3 className="accordion-header">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <button
                  className="accordion-button bg-info"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion2"
                  aria-expanded="true"
                >
                  評價
                </button>
              </h3>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className="accordion-collapse collapse show" id="accordion2">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="accordion-body bg-info d-flex justify-content-between flex-wrap">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="form-check">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input id="star1" className="form-check-input" {...register('star1')} type="checkbox" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <label htmlFor="star1" className="form-check-label">
                      1星
                    </label>
                  </div>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="form-check">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input id="star2" className="form-check-input" {...register('star2')} type="checkbox" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <label htmlFor="star2" className="form-check-label">
                      2星
                    </label>
                  </div>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="form-check">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input id="star3" className="form-check-input" {...register('star3')} type="checkbox" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <label htmlFor="star3" className="form-check-label">
                      3星
                    </label>
                  </div>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="form-check">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input id="star4" className="form-check-input" {...register('star4')} type="checkbox" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <label htmlFor="star4" className="form-check-label">
                      4星
                    </label>
                  </div>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="form-check">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input id="star5" className="form-check-input" {...register('star5')} type="checkbox" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <label htmlFor="star5" className="form-check-label">
                      5星
                    </label>
                  </div>
                </div>
              </div>
            </div>

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="fs-1">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h3 className="accordion-header">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <button className="accordion-button bg-info" data-bs-toggle="collapse" data-bs-target="#accordion3">
                  進階
                </button>
              </h3>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className="accordion-collapse collapse show" id="accordion3">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="accordion-body bg-info">
                  {tags.map((tag, i) => {
                    return (
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <div className="form-check mb-1 me-lg-auto me-1" key={`${enTags[i]}${i}`}>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <input type="checkbox" id={enTags[i]} {...register(enTags[i])} className="form-check-input" />
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <label htmlFor={enTags[i]} className="form-check-label">
                          {tag}
                        </label>
                      </div>
                    );
                  })}
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="form-check">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input type="checkbox" {...register('other')} className="form-check-input" id="other" />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <label htmlFor="other" className="form-check-label me-1">
                      其他
                    </label>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input type="text" className="form-control-inline rounded-1 w-100" {...register('otherInput')} />
                  </div>
                </div>
              </div>
            </div>

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button className="btn btn-primary btn-hover btn-hover-pill rounded-3 px-2 py-0-5 w-fit d-block mx-auto fs-1-5">
              搜尋
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
