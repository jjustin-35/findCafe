import React from 'react';
import { useState, useContext } from 'react';
import { MyContext } from '../App';

// components
import { Message } from '../components/Message';
import { Address } from '../components/Address';
import { Select } from '../components/Select';

export const AddCafe = () => {
    // api url
    const api = process.env.REACT_APP_API_URL;
    const apiUrl = `${api}/cafe/add`;

    // err
    const { err, setErr } = useContext(MyContext).errState;

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
    let [menu, setMenu] = useState([]);
    let [pics, setPics] = useState([]);

    const hours = [];
    for (let i = 1; i <= 12; i++){
        hours.push(i < 10 ? <option value={`0${i}:00`} key={`${i}:00`}>{`0${i}:00`}</option> : <option value={`${i}:00`} key={`${i}:00`}>{`${i}:00`}</option>);
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

    // file
    function getArrayBuffer(file) {
        return new Promise((resolve, reject) => {
          // STEP 3: 轉成 ArrayBuffer, i.e., reader.result
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            resolve(reader.result);
          });
          reader.readAsArrayBuffer(file);
        })
    }

    async function getFile(e) {
        let { name, files } = e.target;
        let newFiles = [];

        for (let file of files) {
            let arrayBuffer = await getArrayBuffer(file);
            file = Array.from(new Uint8Array(arrayBuffer));
            newFiles = [...newFiles, ...file];
        }
        
        if (name === 'menu') {
            setMenu([...menu, ...newFiles]);
        } else if (name === 'pics') {
            setPics([...pics, ...newFiles])
        }
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
        for (let item of ['country', 'districts', 'location']) {
            if (cafeForm.get(item) == "null") {
                setErr({
                    boolean: true,
                    msg: 'Please choose a country/district.'
                })
                return "";
            } else {
                setErr({
                    boolean: false,
                    msg: ""
                })
            }
            address[item] = cafeForm.get(item);
        }
        cafeObj.address = address;

        // deal with the file
        cafeObj.menu = [ ...menu ];
        cafeObj.pics = [ ...pics ];

        // deal with others
        let items = ['name', 'branch', 'tel', 'price'];
        items.forEach(item => {
            cafeObj[item] = cafeForm.get(item);
        });

        // user
        cafeObj.user = {email: 'test6@email.com'}

        // send data
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExODIwMDcxODU3NzgwMTM1Njg3OCIsImVtYWlsIjoiMTA2MjA2MDAyQGcubmNjdS5lZHUudHciLCJpYXQiOjE2NjA2NjIyMDMsImV4cCI6MTY2MDc0ODYwM30.nhClcfhH_DtQ0P8qeh5inDq9ClrmILafeZP6-nGUGrM'
            },
            mode: 'cors',
            body: JSON.stringify(cafeObj),
        }).then(() => {
            console.log('Data has been upload.')
        })

        window.location.reload();
    }

  return (
      <div className='container py-3'>
          <h2 className="fs-3 text-primary fw-bold text-center mb-3">新增咖啡廳</h2>
          <form action={apiUrl} className="form-control" method='POST'>
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
                  <Address className={'addCafe__item'} />
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
                  <input
                      type="file"
                      multiple='mutiple'
                      accept='image/*'
                      className="addCafe__item" name='menu' />
              </label>
              <div className="displayPics displayPics--menu"></div>
              <label htmlFor="">
                  照片
                  <input
                      type="file"
                      multiple='mutiple'
                      accept="image/png, image/jpeg"
                      className="addCafe__item"
                      name='pics'
                      onChange={getFile}
                  />
              </label>
              <div className="displayPics displayPics--pics"></div>

              <Message err={err} setErr={ setErr } />
              <button className="submit" onClick={submit}>提交</button>
          </form>
    </div>
  )
}
