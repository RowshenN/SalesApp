import React, { useState,useEffect } from 'react'
import { axiosInstance } from '../../utils/axiosInstance';
import './randomProducts.css'
import Card from '../../components/productCard/Card'

const RandomProducts = (props) => {
    useEffect(() => {
        getRandomProducts()
      }, []);
    const [randomProducts, setRandomProducts] = useState([])
    const getRandomProducts = () => {
        axiosInstance
          .get("api/ecom/top-products/")
          .then((res) => {
            // console.log(res.data);
            setRandomProducts(res.data);
          })
          .catch((err) => { console.log(err) })
      };
    
    return (
        <div className='cards-div'>
            <div className="cards-div-inner">
                {randomProducts.map((item)=>{return(
                    <Card image={item.web_images.length > 0 && item.web_images ? item.web_images[0].src : ""} id={item.id} price={`${item.main_price} ₽`} oldprice={`${item.price_before_discount} ₽`} discount="-12%" product_name={item.name} />
                )})}
            </div>

        </div>

    )
}

export default RandomProducts;
