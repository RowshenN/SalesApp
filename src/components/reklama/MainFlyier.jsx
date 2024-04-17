import React, {useState, useEffect} from 'react';
import './MainFlyier.css'
import { Carousel } from 'antd';
import { axiosInstance } from '../../utils/axiosInstance';
// import adds from "../../images/add/image 248.png"
// const contentStyle = {
//     height: '300px',
//     color: 'black',
//     lineHeight: '160px',
//     textAlign: 'center',
//     background: 'blue',
//     borderRadius:'12px'
// };

  const MainFlyier = () => {

    useEffect(() => {
        getMainFlyier()
      }, []);
    const [mainFlyier, setMainFlyier] = useState([])
    const getMainFlyier = () => {
        axiosInstance
          .get("api/ecom/main-adds/")
          .then((res) => {
            setMainFlyier(res.data);
          })
          .catch((err) => { console.log(err) })
      };
    return(
        <div style={{borderRadius:"12px",marginTop:window.innerWidth <= 700 ? "15px" : "30px",marginBottom: window.innerWidth <= 700 ? "30px" : "60px"}}>
            <Carousel dots={window.innerWidth <= 735 ? false : true} easing='ease-in-out' speed={750} autoplaySpeed={4000} className='main' autoplay style={{ width:'100%' ,margin:'0 auto',borderRadius:"12px"}}>
            {mainFlyier.map((itemFlyier)=>{return(
                <div style={{width: '100%'}}>
                    <img style={{objectFit: 'contain', width: '100%'}} src={itemFlyier.web_images && itemFlyier.web_images.length > 0 ? itemFlyier.web_images[0].src : ""} alt={ itemFlyier.name } />
                    {/* <div style={contentStyle} key={itemFlyier.id}>{itemFlyier.name}</div> */}
                </div>
            )})}
            </Carousel>
            
        </div>
    )
};
export default MainFlyier;
