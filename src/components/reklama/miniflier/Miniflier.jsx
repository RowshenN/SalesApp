import React, {useState, useEffect} from 'react';
import { Carousel } from 'antd';
import './Miniflier.css'
import { axiosInstance } from '../../../utils/axiosInstance';

// const contentStyle = {
//     height: '200px',
//     color: 'black',
//     lineHeight: '160px',
//     textAlign: 'center',
//     background: 'blue',
//     borderRadius:'12px'
//   };
  
const Miniflier = () => {
    useEffect(() => {
        getMiniFlyier()
      }, []);
    const [miniFlyier, setMiniFlyier] = useState([])
    const getMiniFlyier = () => {
        axiosInstance
          .get("api/ecom/small-adds/")
          .then((res) => {
            // console.log(res.data);
            setMiniFlyier(res.data);
          })
          .catch((err) => { console.log(err) })
      };
    return (
        <div style={{marginTop:"30px",marginBottom:window.innerWidth<= 700 ? "15px" : "60px"}}>
          <Carousel dots={window.innerWidth <= 735 ? false : true} speed={750} autoplaySpeed={4000} autoplay style={{ width:'100%', margin:'0 auto',borderRadius:"12px"}}>
            {miniFlyier.map((itemFlyier)=>{return(
              <div>
                <img style={{objectFit: 'contain', width: '100%'}} src={itemFlyier.web_images && itemFlyier.web_images.length > 0 ? itemFlyier.web_images[0].src : ""} alt={ itemFlyier.name } />
              </div>
            )})}
          </Carousel>
        </div>
    )
}

export default Miniflier
