import React from 'react'

import './DetailHeader.css'

const DetailHeader = (props) => {
  return (
    <div className='detailheader_container'>
      <p className="detailheder_header">{props.header}</p>
      <div className="detailheader_inner_container">
        <p className="detail_inner_header">{props.inner_header}</p>

        <div className="detail_inner_divs">
            <p className="detail_inner_text">Процессор</p>
            <div className="detail_inner_div"></div>
            <div className="detail_inner_text_div">
                <p className="detail_inner_text">Intel Core i3-1215U (1.2 ГГц)</p>
            </div>
        </div>

        <div className="detail_inner_divs">
            <p style={{whiteSpace: "nowrap"}} className="detail_inner_text">Оперативная память</p>
            <div className="detail_inner_div"></div>
            <p className="detail_inner_value_1">8 ГБ</p>
        </div>

        <div className="detail_inner_divs">
            <p style={{whiteSpace: "nowrap"}} className="detail_inner_text">Общий объем SSD, ГБ:</p>
            <div className="detail_inner_div"></div>
            <p className="detail_inner_value">256</p>
        </div>

        <p className="detail_inner_link">Подробнее</p>
      </div>
    </div>
  )
}


export default DetailHeader
