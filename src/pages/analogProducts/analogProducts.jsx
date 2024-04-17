import React, { useState,useEffect } from 'react'
import { axiosInstance } from '../../utils/axiosInstance';
import './analogProducts.css'
import LittleCard from '../../components/productCard/LittleCard'

const AnalogProducts = (props) => {
    useEffect(() => {
        getAnalogProducts()
      }, []);
    const [analogProducts, setAnalogProducts] = useState([])
    const getAnalogProducts = () => {
        axiosInstance
          .get("api/ecom/new-products/")
          .then((res) => {
            setAnalogProducts(res.data);
          })
          .catch((err) => { console.log(err) })
      };
    return (
        <div className='little_cards_container'>
            {analogProducts.map((item)=>{return(
                <LittleCard img={item.web_images.length > 0 && item.web_images ? item.web_images[0].src : ""} price={`${item.main_price} ₽`} oldprice={`${item.price_before_discount} ₽`} discount="-12%" product_name={item.name} />
            )})}
        </div>
    )
}

export default AnalogProducts;
