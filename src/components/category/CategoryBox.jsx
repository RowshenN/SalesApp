import React from 'react'
import { useNavigate } from 'react-router-dom'

import './CategoryBox.css'

const CategoryBox = (props) => {
    const navigate = useNavigate()
    
    const handleClick = () => {
        navigate('/product/', {state : props.id})
        // console.log(props.id)
    }
    return (
        <div onClick={handleClick} className="box-container">
            <div className="header_div">
                <h1 className='box-header'>{props.header}</h1>
            </div>
            <div className="categorybox_img_div">
                    <img src={props.src} alt="surat" />
            </div>
        </div>
    )
}

export default CategoryBox
