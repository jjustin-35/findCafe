import React from 'react';
import { useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import TwCitySelector from 'tw-city-selector';

// components
import { Message } from '../components/Message';
import { Address } from '../components/Address';

// Select component
const Select = (props) => {
    let { opt, name, id, onChange } = props;
    if (!id) {
        id = '';
    }

    return (
        <select name={name} id={id} onChange={onChange}>
            {opt.map(element => {
                return (
                    <option value={element} key={uuidv4()}>{ element }</option>
                )
            })}
        </select>
    )
}

export const AddCafe = (props) => {
    // api url
    const apiUrl = 'http://localhost:3600/add_cafe';

    // init the tw city selector
    const tcs = new TwCitySelector(
        {
            el: '#address',
            elCounty: '#county', 
            elDistrict: '#district', 
        }
    );


    // err
    const { err, setErr } = props;

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

    const hours = [];
    for (let i = 1; i <= 12; i++){
        let uuid = uuidv4();
        hours.push(i < 10 ? <option value={`0${i}:00`} key={uuid}>{`0${i}:00`}</option> : <option value={`${i}:00`} key={uuid}>{`${i}:00`}</option>);
    }

    // time
    // onchange
    function timeInput(e) {
        let { id, value } = e.target;
        let newTime = timeHook;
        newTime[id] = value;

        setTimeHook(newTime);
    }

    // add btn
    function addTime(e) {
        e.preventDefault();
        // get time hook
        const timeAdded = {...timeHook};
        const { weekday, timezone1, timezone2, open, close } = timeAdded;

        for (let element of timeArray) {
            if (element.weekday === weekday) {
                setErr({
                    boolean: true,
                    msg: 'Weekday should not repeat.'
                });

                return;
            } else {
                setErr({
                    boolean: false,
                    msg: ''
                })
            }
        }

        setTimeArray(timeArray => [...timeArray, timeAdded]);

        let timeDisplay = document.querySelector('.timeDisplay');

        let p = document.createElement('p');
        p.innerHTML = `${weekday}　${timezone1, open} ～ ${timezone2, close}`;
        timeDisplay.appendChild(p);
    }
    
    function submit(e) {
        e.preventDefault();
        const form = document.querySelector('.addCafe');

        // get the data
        let cafeForm = new FormData(form);
        let cafeObj = {};

        // deal with time obj
        let time = timeArray.map(element => {
            // 取出除了timezone以外的其他做為新物件(刪除timezone)
            let { timezone1, timezone2, ...newElement } = element;

            const { open, close } = newElement;

            newElement.open = timezone1 + open;
            newElement.close = timezone2 + close;

            return newElement;
        });
        cafeObj.time = time;

        // deal with the address
        let address = {};
        let addressItem = ['country', 'district', 'location'];
        addressItem.forEach(item => {
            address[item] = cafeForm.get(item);
        })
        cafeObj.address = address;

        // deal with others
        let items = ['name', 'branch', 'tel', 'price'];
        items.forEach(item => {
            cafeObj[item] = cafeForm.get(item);
        });
        
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(cafeObj),
        }).then(() => {
            console.log('Data has been upload.')
        })
    }

  return (
      <div className='container wrap'>
          <h2 className="title">新增咖啡廳</h2>
          <form action={apiUrl} className="addCafe block" method='POST'>
              <div className="addCafe__name">
                  <label htmlFor="">
                  咖啡店名: 
                  <input type="text" className="addCafe__item" name='name'/>
                </label>
                <label htmlFor="">
                  分店: 
                  <input type="text" className="addCafe__item" name='branch'/>
                </label>
              </div>
              
              <label htmlFor="">電話: 
                  <input type="text" className="addCafe__item" name='tel'/>
              </label>
              <label htmlFor="">
                  地址:
              </label>
              <label htmlFor="">
                  營業時間: 
                  <span className='addCafe__item'>
                      <Select opt={['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']} name='weekday' id="weekday" onChange={timeInput} />
                      
                      <Select opt={['AM', 'PM']} name='timezone1' id="timezone1" onChange={timeInput} />
                      
                      <select name='open' id="open" onChange={timeInput}>
                      {hours}
                      </select>
                      
                      <span> ～ </span>

                      <Select opt={['AM', 'PM']} name='timezone2' id="timezone2" onChange={timeInput} />
                      
                      <select name='close' id="close" onChange={timeInput}>
                          {hours}
                      </select>
                      
                      <button onClick={addTime}>add</button>
                  </span>
              </label>
              <Message err={err} setErr={ setErr } />
              <div className="timeDisplay"></div>

              <label htmlFor="">
                  平均價格: 
                  <select name="price" id="" className='addCafe__item'>
                      <option value="100">0~100</option>
                      <option value="200">100~200</option>
                      <option value="300">200~300</option>
                      <option value="400">300~400</option>
                      <option value="500">400~500</option>
                      <option value="500up">500以上</option>
                  </select>
              </label>
              <label htmlFor="">
                  菜單
                  <input type="file" className="addCafe__item" name=''/>
              </label>
              <div className="displayPics"></div>
              <label htmlFor="">
                  照片
                  <input type="file" className="addCafe__item" />
              </label>
              <div className="displayPics"></div>

              <button className="submit" onClick={submit}>提交</button>
          </form>
    </div>
  )
}
