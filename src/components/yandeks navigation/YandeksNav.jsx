import React, { useState,useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '../../images/Logo.svg'
import katalog_image from '../../images/yandeksKatalogimg.svg'
import search_icon from '../../images/search_icon.svg'
import Basket from '../../images/basket.svg'
import cancel from '../../images/cancel_svg.svg'
import './YandeksNav.css'
// import LastSearched from './lastest-seacrhed/LastSearched'
// import RecommendedSearch from './search-recommend/RecommendedSearch'
import { axiosInstance } from '../../utils/axiosInstance';
import close_icon from '../../images/close_icon.svg'
import { CountContext } from '../../utils/utils'

const YandeksNav = (props) => {
    // const [sticky, setSticky] = useState(false);

    const navigate = useNavigate();

    const [openSearch, setOpenSearch] = useState(false)
    const [headerCategory, setHeaderCategory] = useState([])
    const [openCategories, setOpenCategories] = useState(false)
    // const [openCategories,setOpenCategories] = useState(false)

    const handleOpenCategories = () => setOpenCategories(true);
    const handleCloseCategories = () => setOpenCategories(false);
    const {count, BasketProductCounter,basket} = useContext(CountContext)
    const SearchQuery = () => {
        const query = document.getElementById('SearchBox').value
        navigate('/search-result', {state : query })
    }

    useEffect(() => {
        getHeaderCategory();
        BasketProductCounter();
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
      }, []);
    
    const getHeaderCategory = () => {
        axiosInstance
          .get("api/ecom/hc-categories/")
          .then((res) => {   
            // console.log(res.data);
            setHeaderCategory(res.data);
          })
          .catch((err) => { console.log(err) })
      };

        const historyDivRef = useRef(null)
        const handleClick = (event) => {
        if (historyDivRef.current && !historyDivRef.current.contains(event.target)) {
            setOpenSearch(false);
            }
        };

    return (
        <React.Fragment>
            <div className="navigation_sticky_div">
            <div className="nav-container">
                <div style={{cursor: 'pointer'}} onClick={() => navigate('/')} className="nav-img-div">
                    <img src={logo} alt="logo" />
                </div>

                <div id='search_container' className="search_div_big_container">

                    <div ref={historyDivRef} className="search-div">
                        <div className="yandeks_search_div">
                            <button className='yandeks-katalog-button' onClick={() => props.open()} title='Katalog'><img src={props.katalog ? close_icon : katalog_image} alt="katalog" />  Каталог</button>
                            <div className="yandeks_search_input_div">
                                <input id='SearchBox' onKeyDown={(e) =>{if (e.key === 'Enter'){setOpenSearch(false);SearchQuery(); e.target.value = ''}}}  className='yandeks_search_input' type="search" placeholder= 'Найти товары' onClick={() => setOpenSearch(true)} />
                                <button onClick={ SearchQuery } className="yandeks_search_button">Найти</button>
                            </div>
                        </div>
                        
                        {openSearch && (<div className="search_container">
                            <div className="search_div_container">
                                {/* <div className="search_latest_searched">
                                    <LastSearched title="запчасть для бензоинструмента" />
                                    <LastSearched title="запчасть для бензоинструмента" />
                                    <LastSearched title="запчасть для бензоинструмента" />
                                </div> */}

                                {/* <div className="search-recommend-container">
                                    <RecommendedSearch title="Запчасти и аксессуары для инструмента" location="Строительство и ремонт / Запчасти и аксессуары для инструментов" />
                                    <RecommendedSearch title="Запчасти и аксессуары для инструмента" location="Строительство и ремонт / Запчасти и аксессуары для инструментов" />
                                </div> */}
                            </div>
                        </div>)}
                    </div>
                    <svg onClick={() => handleOpenCategories()} id='burgerbutton' className='burgerbutton' viewBox="0 0 100 80" width="30" height="40">
                        <rect y="5" width="100" height="10"></rect>
                        <rect y="35" width="100" height="10"></rect>
                        <rect y="65" width="100" height="10"></rect>
                    </svg>
                </div>

                <div onClick={() => count==0 ? navigate('/empty') : navigate('/product-page')} className="nav-icons">
                    <img src={Basket} alt="basket" className='nav-icon' />
                    <span className='basket-count'>{ count }</span>
                </div>
            </div>
            </div>
            <div className="auto_container">
                <div className="nav-list-container">
                    {headerCategory.map((itemHeaderCategory)=>{return(
                        <div onClick={() => navigate('/product', { state: itemHeaderCategory.id })} className="navItem">
                            {itemHeaderCategory.name}
                        </div>
                    )})}
                </div>

            {openCategories &&  <div className="kategories_mini_div">
                <div className="kategories_inner_div">
                    <p className="kategories_inner_header">Kategory</p>
                    <div onClick={() => handleCloseCategories()} className="cancel_div">
                        <img className='cancel_img' style={{width: '15px', height: '15px',}} src={cancel} alt="cancel" />
                    </div>
                    <div className="kategories_inner_content">
                        {headerCategory.map((itemHeaderCategory)=>{return(
                            <div onClick={() => navigate('/product', { state: itemHeaderCategory.id })} className="kategories_inner_content_inner">
                                <div className="kategories_inner_kategory_name">
                                    {itemHeaderCategory.name}
                                </div>
                                <input type="radio" name="" id="" />
                            </div>
                        )})}
                    </div>
                </div>
            </div>}

            </div>
        </React.Fragment>
    )
}

export default React.memo(YandeksNav)
