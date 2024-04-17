import React from 'react'
import { useNavigate } from 'react-router-dom'

import './YandeksEmpty.css'

const YandeksEmpty = (props) => {

    const navigate = useNavigate()
  return (
    <div className='yandeksmarket_container'>
      <div className="yandeks_container_inner">
        <p className="yandeks_container_header">{props.header}</p>
        <p className="yandeks_container_text">А чтобы их найти, загляните в каталог или в раздел со скидками</p>
        <button onClick={() => navigate("/")} className="yandeks_container_button">На главную</button>
      </div>
    </div>
  )
}

export default YandeksEmpty
