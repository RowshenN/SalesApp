import React, { useState,useEffect } from 'react'
import './CategoriesTop.css'
import CategoryBox from './CategoryBox'
import { axiosInstance } from '../../utils/axiosInstance';
const CategoriesTop = () => {
    useEffect(() => {
        getTopCategory()
      }, []);
    const [topCategory, setTopCategory] = useState([])
    const getTopCategory = () => {
        axiosInstance
          .get("api/ecom/pc-categories/")
          .then((res) => {
            // console.log(res.data);
            setTopCategory(res.data);
          })
          .catch((err) => { console.log(err) })
      };
    return (
        <div className='categories__top'>
            <div className="categories__top-inner">
                {topCategory.map((itemtopCategory)=>{return(
                <CategoryBox src={itemtopCategory.web_images.length > 0 && itemtopCategory.web_images ? itemtopCategory.web_images[0].src : []} header={itemtopCategory.name} id={itemtopCategory.id}/>
                )})}
            </div>
        </div>

    )
}

export default CategoriesTop
