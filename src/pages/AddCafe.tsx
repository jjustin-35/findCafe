import React from 'react';
import { useState } from 'react';
// @ts-expect-error TS(6142): Module '../context/GlobalProvider' was resolved to... Remove this comment to see the full error message
import { useGlobal } from '../context/GlobalProvider';

// components
// @ts-expect-error TS(6142): Module '../components/Message' was resolved to 'C:... Remove this comment to see the full error message
import { Message } from '../components/Message';
// @ts-expect-error TS(6142): Module '../components/Address' was resolved to 'C:... Remove this comment to see the full error message
import { Address } from '../components/Address';
// @ts-expect-error TS(6142): Module '../components/Select' was resolved to 'C:/... Remove this comment to see the full error message
import { Select } from '../components/Select';

export const AddCafe = () => {
  // api url
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  const api = process.env.REACT_APP_API_URL;
  const apiUrl = `${api}/cafe/add`;

  // err
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { err, setErr } = useGlobal().errState;

  // hook
  let [timeHook, setTimeHook] = useState({
    weekday: '星期一',
    timezone1: 'am',
    open: '01:00',
    timezone2: 'am',
    close: '01:00',
  });
  // set time array
  let [timeArray, setTimeArray] = useState([]);
  let [timeDisplay, setTimeDisplay] = useState([]);
  let [menu, setMenu] = useState([]);
  let [pics, setPics] = useState([]);

  const hours = [];
  for (let i = 1; i <= 12; i++) {
    hours.push(
      i < 10 ? (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <option value={`0${i}:00`} key={`${i}:00`}>{`0${i}:00`}</option>
      ) : (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <option value={`${i}:00`} key={`${i}:00`}>{`${i}:00`}</option>
      ),
    );
  }

  // time
  // onchange
  function timeInput(e: any) {
    let { id, value } = e.target;
    let newTime = timeHook;
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    newTime[id] = value;

    setTimeHook(newTime);
  }
  // add btn
  function addTime(e: any) {
    e.preventDefault();
    // get time hook
    const timeAdded = { ...timeHook };
    const { weekday, timezone1, timezone2, open, close } = timeAdded;

    for (let element of timeArray) {
      // @ts-expect-error TS(2339): Property 'weekday' does not exist on type 'never'.
      if (element.weekday === weekday) {
        setErr('Weekday should not repeat.');

        return;
      } else {
        setErr(null);
      }
    }

    // @ts-expect-error TS(2345): Argument of type '(timeArray: never[]) => { weekda... Remove this comment to see the full error message
    setTimeArray((timeArray) => [...timeArray, timeAdded]);

    // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'never'.
    setTimeDisplay([...timeDisplay, `${weekday} ${(timezone1, open)} ~ ${(timezone2, close)}`]);
  }

  // file
  function getBase64(file: any) {
    return new Promise((resolve) => {
      // STEP 3: 轉成base64 ,reader.result
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }

  async function getFile(e: any) {
    let { name, files } = e.target;
    let newFiles: any = [];

    for (let file of files) {
      let base64 = await getBase64(file);
      newFiles = [...newFiles, base64];
    }

    if (name === 'menu') {
      // @ts-expect-error TS(2345): Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
      setMenu([...menu, ...newFiles]);
    } else if (name === 'pics') {
      // @ts-expect-error TS(2345): Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
      setPics([...pics, ...newFiles]);
    }
  }

  function submit(e: any) {
    e.preventDefault();
    const form = document.querySelector('#addCafe');

    // get the data
    // @ts-expect-error TS(2345): Argument of type 'Element | null' is not assignabl... Remove this comment to see the full error message
    let cafeForm = new FormData(form);
    let cafeObj = {};

    // deal with time obj
    let time = timeArray.map((element) => {
      // 取出除了timezone以外的其他做為新物件(刪除timezone)
      // @ts-expect-error TS(2700): Rest types may only be created from object types.
      let { timezone1, timezone2, ...newElement } = element;

      const { open, close } = newElement;

      newElement.open = timezone1 + open;
      newElement.close = timezone2 + close;

      return newElement;
    });
    // @ts-expect-error TS(2339): Property 'time' does not exist on type '{}'.
    cafeObj.time = time;

    // deal with the address
    let address = {};
    for (let item of ['country', 'districts', 'location']) {
      if (cafeForm.get(item) == 'null') {
        setErr('Please choose a country/district.');
        return '';
      } else {
        setErr(null);
      }
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      address[item] = cafeForm.get(item);
    }
    // @ts-expect-error TS(2339): Property 'address' does not exist on type '{}'.
    cafeObj.address = address;

    // deal with the file
    // @ts-expect-error TS(2339): Property 'menu' does not exist on type '{}'.
    cafeObj.menu = [...menu];
    // @ts-expect-error TS(2339): Property 'pics' does not exist on type '{}'.
    cafeObj.pics = [...pics];

    // deal with others
    let items = ['name', 'branch', 'tel', 'price'];
    items.forEach((item) => {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      cafeObj[item] = cafeForm.get(item);
    });

    // user
    // cafeObj.append('user', cafeForm.get('user'));

    // send data
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlZWM2NGVkLTAwM2ItNDU5ZS04MDYyLTJlNDY4ZDlhZTI1YSIsImVtYWlsIjoidGVzdDZAZW1haWwuY29tIiwiaWF0IjoxNjYxNjgzNzU1LCJleHAiOjE2NjE3NzAxNTV9.ANzRUYTEx7LlXnld0albu0VNX_8yTFc-TfM1ejXJdtY',
      },
      mode: 'cors',
      body: JSON.stringify(cafeObj),
    }).then(() => {
      console.log('Data has been upload.');
    });

    // reload the page
    // window.location.reload();
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="container py-3">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <h2 className="fs-3 text-primary fw-bold text-center mb-3">新增咖啡廳</h2>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <form action={apiUrl} method="POST" id="addCafe">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="addCafe__name">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <label htmlFor="">
            咖啡店名:
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <input type="text" className="addCafe__item" name="name" />
          </label>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <label htmlFor="">
            分店:
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <input type="text" className="addCafe__item" name="branch" />
          </label>
        </div>

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <label htmlFor="">
          電話:
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <input type="text" className="addCafe__item" name="tel" />
        </label>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <label htmlFor="">
          地址:
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Address className={'addCafe__item'} />
        </label>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <label htmlFor="">
          營業時間:
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className="addCafe__item">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Select
              opt={['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']}
              name="weekday"
              id="weekday"
              onChange={timeInput}
            />

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Select opt={['AM', 'PM']} name="timezone1" id="timezone1" onChange={timeInput} />

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <select name="open" id="open" onChange={timeInput}>
              {hours}
            </select>

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span> ～ </span>

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Select opt={['AM', 'PM']} name="timezone2" id="timezone2" onChange={timeInput} />

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <select name="close" id="close" onChange={timeInput}>
              {hours}
            </select>

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button onClick={addTime}>add</button>
          </span>
        </label>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="timeDisplay">
          // @ts-expect-error TS(2367): This condition will always return 'true' since the... Remove this comment to see the full error message
          {timeDisplay !== 0 && timeDisplay.map((time, idx) => <p key={idx}>{time}</p>)}
        </div>

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <label htmlFor="">
          平均價格:
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <select name="price" id="" className="addCafe__item">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <option value="100">0~100</option>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <option value="200">100~200</option>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <option value="300">200~300</option>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <option value="400">300~400</option>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <option value="500">400~500</option>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <option value="500up">500以上</option>
          </select>
        </label>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <label htmlFor="">
          菜單
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <input
            type="file"
            // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'boolean |... Remove this comment to see the full error message
            multiple="mutiple"
            accept="image/*"
            className="addCafe__item"
            name="menu"
            onChange={getFile}
          />
        </label>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="displayPics displayPics--menu"></div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <label htmlFor="">
          照片
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <input
            type="file"
            // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'boolean |... Remove this comment to see the full error message
            multiple="mutiple"
            accept="image/png, image/jpeg"
            className="addCafe__item"
            name="pics"
            onChange={getFile}
          />
        </label>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="displayPics displayPics--pics"></div>

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Message err={err} setErr={setErr} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <button className="submit" onClick={submit}>
          提交
        </button>
      </form>
    </div>
  );
};
