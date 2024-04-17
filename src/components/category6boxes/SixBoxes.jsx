import React, { useState,useEffect } from 'react'
import './SixBoxes.css'
import CategorySixBox from './CategorySixBox'
import { axiosInstance } from '../../utils/axiosInstance';

const SixBoxes = () => {
    useEffect(() => {
        getSixBoxes()
      }, []);
    const [sixBoxes, setSixBoxes] = useState([])
    const getSixBoxes = () => {
        axiosInstance
          .get("api/ecom/sixb-categories/")
          .then((res) => {
            // console.log(res.data);
            setSixBoxes(res.data);
          })
          .catch((err) => { console.log(err) })
      };
    return (
        <div className='six_boxes_div'>
            {sixBoxes.map((itemSixBoxes)=>{return(
                <CategorySixBox item={itemSixBoxes} />
            )})}
            {/* <CategorySixBox />
            <CategorySixBox />
            <CategorySixBox />
            <CategorySixBox />
            <CategorySixBox /> */}
        </div>
    )
}

export default SixBoxes
