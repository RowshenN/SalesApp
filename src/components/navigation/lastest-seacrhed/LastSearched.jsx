import React from 'react'

import './LastSearched.css'
import searched_icon from '../../../images/last-seacrhed-icon.svg'

const LastSearched = (props) => {
    return (
        <div className='last_search_container'>
            <img src={searched_icon} alt="searched-icon" />
            <div className="search_name_div">
                <p className='searched_name'>{props.title}</p>
            </div>
        </div>
    )
}

export default LastSearched
