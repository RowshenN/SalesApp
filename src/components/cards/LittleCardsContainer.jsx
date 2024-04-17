import React, { useState,useEffect } from 'react'
import { axiosInstance } from '../../utils/axiosInstance';
import './LittleCardsContainer.css'
import LittleCard from '../productCard/LittleCard'

const LittleCardsContainer = (props) => {
    useEffect(() => {
        getNewProducts()
      }, []);
    const [newProducts, setNewProducts] = useState([])
    const getNewProducts = () => {
        axiosInstance
          .get("api/ecom/new-products/")
          .then((res) => {
            setNewProducts(res.data);
          })
          .catch((err) => { console.log(err) })
      };
    return (
        <div className='little_cards_container'>
            {newProducts.map((item)=>{return(
                <LittleCard img={item.web_images?.length > 0 ? item.web_images[0].src : []} price={`${item.main_price} ₽`} oldprice={`${item?.price_before_discount} ₽`} discount={item?.discount} product_name={item.name} />
            )})}
        </div>
    )
}

export default LittleCardsContainer
