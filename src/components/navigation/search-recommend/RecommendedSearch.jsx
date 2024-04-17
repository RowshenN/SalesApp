import React from 'react'

import './RecommendedSearch.css'

const RecommendedSearch = (props) => {
    return (
        <div className='recommend-container'>
            <div className="recommend-profile-div">

            </div>

            <div className="recommend-name-div">
                <p className='recommend-name'>{props.title}</p>
                <p className='recommend-location'>{props.location}</p>
            </div>
        </div>
    )
}

export default RecommendedSearch
