import React from 'react'
import { useNavigate } from 'react-router-dom'

import './CategoryFour.css'

const CategoryFour = (props) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('product')} className='category_four_container'>
            <div className="category_four_div">
                <img src={props.item.web_images && props.item.web_images.length > 0 ? props.item.web_images[0].src : ""} alt="suart" />
            </div>
        </div>
    )
}

export default CategoryFour
