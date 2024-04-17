import React, { useState,useEffect } from 'react'
import { axiosInstance } from '../../utils/axiosInstance';
import './cardsconteiner.css'
import Card from '../productCard/Card'

const Cardsconteiner = (props) => {
    useEffect(() => {
        getTopMonthProducts()
      }, []);
    const [topMonthProducts, setTopMonthProducts] = useState([])
    const getTopMonthProducts = () => {
        axiosInstance
          .get("api/ecom/top-products/")
          .then((res) => {
            // console.log(res.data);
            setTopMonthProducts(res.data);
          })
          .catch((err) => { console.log(err) })
      };
      
    return (
        <div className='cards-div'>
            <div className="cards-div-inner">
                {topMonthProducts.map((item)=>{return(
                    <Card id={item.id} image={item.web_images.length > 0 && item.web_images ? item.web_images[0].src : []} price={`${item.main_price} ₽`} oldprice={`${item.price_before_discount} ₽`} discount="-12%" product_name={item.name} />
                )})}
            </div>

        </div>

    )
}

export default Cardsconteiner
