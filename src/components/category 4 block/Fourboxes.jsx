import React, { useState,useEffect } from 'react'
import './Fourboxes.css'
import CategoryFour from './CategoryFour'
import { axiosInstance } from '../../utils/axiosInstance';

const Fourboxes = () => {
    useEffect(() => {
        getFourBoxes()
      }, []);
    const [fourBoxes, setFourBoxes] = useState([])
    const getFourBoxes = () => {
        axiosInstance
          .get("api/ecom/fourb-categories/")
          .then((res) => {
            // console.log(res.data);
            setFourBoxes(res.data);
          })
          .catch((err) => { console.log(err) })
      };
    return (
        <div className='four_boxes'>
            {fourBoxes.map((itemFourBoxes)=>{return(
                <CategoryFour item = {itemFourBoxes} />
            )})}

            {/* <CategoryFour />
            <CategoryFour />
            <CategoryFour /> */}
        </div>
    )
}

export default Fourboxes
