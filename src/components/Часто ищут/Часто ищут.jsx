import React from 'react'

import './Часто ищут.css'

const Часто = (props) => {
  return (
    <div className='casto_container'>
        <p className="casto_header">{props.header}</p>
        <div className="casto_inner_container">
            <div className="casto_inner_divs">
                <p className="casto_inner_text">{props.inner_text}</p>
                <p className="casto_inner_text">{props.inner_text}</p>
                <p className="casto_inner_text">{props.inner_text}</p>
                <p className="casto_inner_text">{props.inner_text}</p>
                <p className="casto_inner_text">{props.inner_text}</p>
            </div>

            <div className="casto_inner_divs">
                <p className="casto_inner_text">{props.inner_text}</p>
                <p className="casto_inner_text">{props.inner_text}</p>
                <p className="casto_inner_text">{props.inner_text}</p>
                <p className="casto_inner_text">{props.inner_text}</p>
                <p className="casto_inner_text">{props.inner_text}</p>
            </div>

            <div className="casto_inner_divs">
                <p className="casto_inner_text">Электрочайники дёшово</p>
                <p className="casto_inner_text">Электрочайники дёшово</p>
                <p className="casto_inner_text">Электрочайники дёшово</p>
                <p className="casto_inner_text">Электрочайники дёшово</p>
                <p className="casto_inner_text">Электрочайники дёшово</p>
            </div>
        </div>
      
    </div>
  )
}

export default Часто
