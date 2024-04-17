import React, {useState, useContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import './TabletMode.css'

import home_tablet from '../../images/home_tablet.svg'
import search_tablet from '../../images/search_tablet.svg'
import basket_tablet from '../../images/basket_tablet.svg'
import inactive_katalog from '../../images/inactive_katalog.svg'
import inactive_home from '../../images/inactive_home.svg'
import inactive_basket from '../../images/inactive_basket.svg'
import { CountContext } from '../../utils/utils'

const TabletMode = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {count, BasketProductCounter} = useContext(CountContext)
const ActiveNav = (e) =>{ 
    const parentElement = document.getElementById('tablet-mode-nav');
    Array.from(parentElement.children).forEach((childElement) => {
        childElement.classList.remove('active');
    });
    e.currentTarget.classList.add('active')
}

const [activeDiv, setActiveDiv] = useState(1);

  const handleDivClick = (divNumber) => {
    setActiveDiv(divNumber === activeDiv ? null : divNumber);
  };
    
  return (
    <div className="tabletmode_container">
        <div className="tabletmode_inner_div" id='tablet-mode-nav'>
        <div onClick={() => {
        handleDivClick(1);
        navigate('/');
        props.open(false);
        }} className={location.pathname === '/' && activeDiv === 1 ? "tabletmode_div active" : "tabletmode_div"}>
        <img id='div_img' src={location.pathname === '/' && activeDiv === 1 ? inactive_home : home_tablet} alt="home-tablet" />
        <p className="mode_inner_div_header">Главная</p>
        </div>
            {location.pathname === "/" ? 
            <div onClick={() => {handleDivClick(2); props.open()}} className={ activeDiv === 2 ? "tabletmode_div active" : "tabletmode_div"}>
                <img src={activeDiv === 2 ? search_tablet : inactive_katalog} alt="search-tablet" />
                <p className="tabletmode_inner_div_header">Каталог</p>
            </div> : null}
            <div onClick={(e) => {ActiveNav(e); navigate('/product-page');}}  className={location.pathname === '/product-page' ? "tabletmode_div active" : "tabletmode_div"}>
                <img src={location.pathname === '/product-page' ? inactive_basket :  basket_tablet} alt="basket-tablet" />
                <span className='basket-count'>145</span>
                <p className="tabletmode_inner_div_header">Корзина</p>
            </div>
        </div>
    </div>
  )
}

export default TabletMode
