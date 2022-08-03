import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AddCafe = () => {
    // api url
    const apiUrl = 'http://localhost:3600/add_cafe';

    // hook
    let [timeHook, setTimeHook] = useState({
        weekday: '星期一',
        timezone1: 'am',
        open: '01:00',
        timezone2: 'am',
        close: '01:00',
    });

    const hours = [];
    for (let i = 1; i <= 12; i++){
        let uuid = uuidv4();
        hours.push(i < 10 ? <option value={`0${i}:00`} key={uuid}>{`0${i}:00`}</option> : <option value={`${i}:00`} key={uuid}>{`${i}:00`}</option>);
    }

    // time

    function weekdayTrans(weekday) {
        switch (weekday) {
            case 'monday':
                weekday = '星期一';
            case 'tuesday':
                weekday = '星期二';
            case 'wednesday':
                weekday = '星期三';
            case 'thirsday':
                weekday = '星期四';
            case 'friday':
                weekday = '星期五';
            case 'saturday':
                weekday = '星期六';
            case 'sunday':
                weekday = '星期日';
        }

        return weekday;
    }
    // set time id for each open time
    let timeId = 1;

    // onchange
    function timeInput(e) {
        let timeElement = e.target;

        timeHook[timeElement.id] = timeElement.value;

        setTimeHook(timeHook);
    }

    function addTime(e) {
        e.preventDefault()
        // get time hook
        const { weekday, timezone1, timezone2, open, close } = timeHook;

        let label = e.target.parentElement.parentElement;
        let timeDisplay = label.querySelector('.timeDisplay');

        let p = document.createElement('p');
        p.innerHTML = `${weekdayTrans(weekday)}　${timezone1, open} ～ ${timezone2, close}`;
        timeDisplay.appendChild(p);
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
                  <input type="text" className="addCafe__item" name='' />
              </label>
              <label htmlFor="">
                  營業時間: 
                  <span className='addCafe__item'>
                  <select name={`time[${timeId}][weekday]`} id="weekday" onChange={timeInput}>
                      <option value="monday">星期一</option>
                      <option value="tuesday">星期二</option>
                      <option value="wednesday">星期三</option>
                      <option value="thirsday">星期四</option>
                      <option value="friday">星期五</option>
                      <option value="saturday">星期六</option>
                      <option value="sunday">星期日</option>
                  </select>
                  <select name={`time[${timeId}][timezone1]`} id="timezone1" onChange={timeInput}>
                      <option value="am">上午</option>
                      <option value="pm">下午</option>
                  </select>
                  <select name={`time[${timeId}][open]`} id="open" onChange={timeInput}>
                      {hours}
                  </select>
                  <span> ～ </span>
                  <select name={`time[${timeId}][timezone2]`} id="timezone2" onChange={timeInput}>
                      <option value="am">上午</option>
                      <option value="pm">下午</option>
                  </select>
                  <select name={`time[${timeId}][close]`} id="close" onChange={timeInput}>
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
                  <input type="file" className="addCafe__item" name=''/>
              </label>
              <div className="displayPics"></div>
              <label htmlFor="">
                  照片
                  <input type="file" className="addCafe__item" />
              </label>
              <div className="displayPics"></div>

              <button className="submit">提交</button>
          </form>
    </div>
  )
}
