import React from 'react'
import { useNavigate } from 'react-router-dom'

import './CategorySixBox.css'

const CategorySixBox = (props) => {

    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/product')} className='category_six_box'>
            <img src={props.item.web_images && props.item.web_images.length > 0 ? props.item.web_images[0].src : ""} alt="surat" />
        </div>
    )
}

export default CategorySixBox
