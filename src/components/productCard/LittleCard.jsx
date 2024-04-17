import React from 'react'
import { useNavigate } from 'react-router-dom'

import './LittleCard.css'

const LittleCard = (props) => {

    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/product-detail')} className="little_card_container">
            <div className="little_card-picture-div">
                <img src={props.img} alt="surat" />
            </div>
            <div className="little_card_content_container">
                <div className="little_card_content_inner">
                    <p className='little_card_price'>{props.price}</p>
                    <p style={{display: props.oldprice === 'null' ? 'block' : 'none'}} className='little_card_discount'>{props?.oldprice}</p>
                    <p style={{display: props.discount ? 'block' : 'none'}} className='little_card_discount'>{props?.discount}</p>
                </div>
                <div className="little_card_product_name_div">
                    <p className='little_card_product_name'>{props.product_name}</p>
                </div>
            </div>
        </div>
    )
}

export default LittleCard
