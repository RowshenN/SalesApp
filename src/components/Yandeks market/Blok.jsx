import React from 'react'

import './Blok.css'

import arrow from '../../images/yandeks_button_right_arrow.svg'
import YandeksCard from './yandeks-card/YandeksCard'

const Blok = (props) => {
  return (
    <div className='yndeks_blok_container'>
      <div className="yandeks_blok_inner">
        <div className="ynadeks_blok_header_div">
            <div className="yandeks_blok_text_div">
                <p className='yandeks_blok_header_text'>Рекомендуем вам</p>
                <p className='yandeks_blok_header'>Привести авто в порядок</p>
            </div>
            <button className='yandeks_market_button'>Все <img src={arrow} alt="arrow" /></button>
        </div>

        <div className="yandeks_blok_cards_div">
          <YandeksCard price="45 332" valyuta="₽" oldprice="56 990" />
          <YandeksCard price="45 332" valyuta="₽" oldprice="56 990" />
          <YandeksCard price="45 332" valyuta="₽" oldprice="56 990" />
          <YandeksCard price="45 332" valyuta="₽" oldprice="56 990" />
        </div>
      </div>
    </div>
  )
}

export default Blok
