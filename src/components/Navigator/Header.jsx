import React from 'react'

import './Header.css'
import right_arrow from '../../images/right-arrow.svg'

const Header = (props) => {
    return (
        <div className='navigator-header-div'>
            <h1 className='navigator-header'>{props.title}</h1>
            <img src={right_arrow} alt="right-arrow" />
        </div>
    )
}

export default Header
