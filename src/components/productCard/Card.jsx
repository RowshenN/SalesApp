import React from 'react'
import { useNavigate } from 'react-router-dom'

import './Card.css'

const Card = (props) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/product-detail", { state: props.id });
        console.log(props.id);
      };

    return (
        <div onClick={handleClick} className="card_container">
            <div className="card-picture-div">
                <img src={props.image} alt='surat'/>
            </div>
            <div className="card_content_container">
                <div className="card_content_inner">
                    <p className='card_price'>{props.price}</p>
                    <div className="old_price_div">
                        <p className='card_old_price'>{props.oldprice}</p>
                        <p className='card_discount'>{props?.discount}</p>
                    </div>
                </div>
                <div className="card_product_name_div">
                    <p className='card_product_name'>{props.product_name}</p>
                </div>
            </div>
        </div>
    )
}

export default Card




// const handleRating = useCallback(() => {
//     const stars = [];

//     for (let i = 0; i < 5; i++) {
//         if (i < rating) {
//             stars.push(<img className='card-raiting-icon' src={FullStar} alt="Full Star" />)
//         } else {
//             stars.push(<img className='card-raiting-icon' src={EmptyStar} alt="Empty Star" />)
//         }
//     }

//     return stars;
// }, [rating])