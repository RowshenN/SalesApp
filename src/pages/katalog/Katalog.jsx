import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import './Katalog.css'
import phone from '../../images/phone.svg'
import arrow from '../../images/active-narrow.svg'

import { axiosInstance } from '../../utils/axiosInstance';
import KatalogCategory from './categories/KatalogCategory';

const Katalog = () => {

    useEffect(() => {
        getKatalog()
      }, []);

  const pathN = useLocation()

// ---------------------- ---  States ------------------------------
    const [katalog, setKatalog] = useState([])
    const [katalog_id, setKatalogId] = useState([])
// -------------------------  Functions -----------------------------

      const getKatalog = async () => {
        try {
          const response = await axiosInstance.get(`api/ecom/categories/`);
            setKatalogId(response.data[0].id)
            setKatalog(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      const handlecategory = () => {
        document.getElementById("drawer_item").style.display = "none";
        document.getElementById("katalog_div").style.display = "flex";
      }

      const handleCancel = () => {
        document.getElementById("drawer_item").style.display = "flex";
        document.getElementById("katalog_div").style.display = "none";
      }

    return (
        <React.Fragment>
          <div className="category-wrapper-new">
              <div id='drawer_item' className="catalogs-list">
                  {katalog.map((itemKatalog, index) => {return (
                      <div className='drawer_item_container'>
                          <div onClick={() => {setKatalogId(itemKatalog.id); {window.innerWidth <= 530 && handlecategory()}}} className= {itemKatalog.id === katalog_id ?  'drawer_item_inner drawer_item_inner_active' : "drawer_item_inner"}>
                              <div className="drawer_item_inner_div">
                                  <img src={phone} alt="surat" className='drawer_item_image' />
                                  <p className=' drawer_item_name'>{itemKatalog.name}</p>
                              </div>
                              {window.innerWidth >= 531 && <img className={itemKatalog.id === katalog_id ? "active-arrow" : "katalog-arrow"} src={arrow} alt='arrow' />}
                          </div>
                      </div>
                  )})}
              </div>
              <div id='katalog_div' className="katalog_kategory_responisve_div">
                <KatalogCategory cancel = {handleCancel} katalogId = {katalog_id} isLoading = {true} />
              </div>
          </div>
        </React.Fragment>
    );
};

export default Katalog;
