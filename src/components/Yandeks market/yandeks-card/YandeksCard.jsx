import React from 'react'

import './YandeksCard.css'

const YandeksCard = (props) => {
  return (
    <div className='yandeks_card_container'>
        <div className="yandeks_card_img_div">
            <img src="" alt="" />
        </div>

        <div className="yandeks_card_price_div">
            <p className="yandeks_card_price">{props.price}<span>{props.valyuta}</span></p>
            <p className="yandeks_card_oldprice">{props.oldprice}<span>{props.valyuta}</span></p>
        </div>
    </div>
  )
}

export default YandeksCard
