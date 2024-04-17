import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./ProductPage.css";
import Navigation from "../../components/navigation/Navigation";
import Cardsconteiner from "../../components/cards/cardsconteiner";
import cancel from "../../images/cancel_korzina.svg"
import TabletMode from "../../components/tablet_mode/TabletMode";
import Katalog from '../katalog/Katalog'
import { CountContext } from '../../utils/utils'

const ProductPage = () => {
  // const [amount, setAmount] = useState(1);
  const [sticky, setSticky] = useState(false);
  // const [isSelected, setIsSelected] = useState(false);
  // const [Basket, setBasket] = useState([]);
  const {count, BasketProductCounter, AddProductCount, SubProductCount, price, SumPrice, NoProductCount, weight, SumWeight,discount,SumDiscount, basket, setBasket} = useContext(CountContext)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [openKatalog, setOpenKatalog] = useState(false)
  const open = () => setOpenKatalog(prevstate => !prevstate);
  const [selectedProducts, setSelectedProducts] = useState(basket || {});
  const [inputTrue, setInputTrue] = useState(false);
  
  const addition = (id) => {
    const card =  document.getElementById(id);
    let existingProducts = basket || [];
    existingProducts.forEach(element => {
      if (element.id == id) {
        card.classList.add('card_active');
        console.log(element.count);
      }
    });
    AddProductCount(id)
    BasketProductCounter();
    SumPrice()
    SumWeight();
    SumDiscount();
    console.log("------- additionnnn---");
    setBasket(existingProducts)
  };

  const subtraction = (id) => {
    const card = document.getElementById(id);
    let exitingProducts = basket || [];
    exitingProducts.forEach(element => {
      if(id === element.id) {
        SubProductCount(id);
        BasketProductCounter();
        SumWeight();
        SumDiscount();
        SumPrice()
        console.log(element.count);
        if(element.count == 1) {
          card.classList.remove('card_active')
        }else {
          card.classList.add('card_active')
        }
        if(element.count === 0) {
          NoProductCount(id)
        }
      }
    })
    setBasket(exitingProducts)
  };

  const CancelProduct = (id) => {
    NoProductCount(id)
    let exitingProducts = basket || [];
    if (exitingProducts.length <= 0) {
      BasketProductCounter();
      SumPrice()
      SumWeight();
      SumDiscount();
      navigate('/empty')
      setBasket(exitingProducts)
    }else{
      BasketProductCounter();
      SumWeight();
      SumDiscount();
      SumPrice()
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 500) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
    let exitingProducts = basket || []
    setBasket(exitingProducts)
    BasketProductCounter();
    SumPrice()
    setIsLoading(false);
    SumWeight();
    SumDiscount();
  }, [count,price,weight,discount]);

  const selectAllProducts = () => {
    const allSelected = basket.reduce((any, product) => {
      any[product.id] = true;
      return any;
    }, {});
    setSelectedProducts(allSelected);
    setInputTrue(true);
    // localStorage.setItem('MyBasket', JSON.stringify(allSelected));
    setBasket(selectedProducts);
    BasketProductCounter();
    SumPrice();
    SumWeight();
    SumDiscount();
  };
  
  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) => ({
      ...prevSelected,
      [productId]: !prevSelected[productId],
    }));
    localStorage.setItem('MyBasket', JSON.stringify(selectedProducts));
    // setBasket(selectedProducts)
  };
  
  const deleteSelectedProducts = () => {
    let exitingProducts = basket || [];
    const updatedProducts = exitingProducts.filter(
      (product) => !selectedProducts[product.id]
    );
    setSelectedProducts({});
    setInputTrue(false);
    if (exitingProducts.length <= 0) {
      BasketProductCounter();
      SumPrice()
      SumWeight();
      SumDiscount();
      navigate('/empty')
    }else{
      BasketProductCounter();
      SumWeight();
      SumDiscount();
      SumPrice()
    }
    setBasket(updatedProducts);
  }
  return (
    <React.Fragment>
        <Navigation open={open} katalog={openKatalog} />
        {openKatalog && (
          <div className="mainpage_katalog_div">
            <Katalog />
          </div>
        )}
      <div className="productpage_oobsy_container">
        <div className="productpage_oobsy_inner">
        {sticky && (
          <div className="productdetail_sticky_div">
            <div className="productdetail_sticky_inner">
              <img src="" alt="" />
              <p className="productdetail_sticky_inner_header">Всего: {count} товаров</p>
            </div>

            <div className="productdetail_sticky_inner_prices">
              <p className="productdetail_sticky_price">
              {price}<span class="v-rouble"> ₽</span>
              </p>
              <p className="productdetail_sticky_discount">
                {discount}<span class="g-rouble"> ₽</span>
              </p>
            </div>

            <div class="btn-confirm-order">
              <button
                className="productpage_sticky_button"
                onClick={() => navigate("/placing-an-order")}
                type="submit"
              >
                Перейти к оформлению
              </button>
            </div>
          </div>
        )}
            {isLoading ? <div className="loading"><p>Loading...</p></div> : <div className="productpage_container">
            <h1 className="productpage_header">Корзина</h1>
              <div className="productpage_inner_container">
                <div className="productpage_inner_card_container">
                    <div className="productpage_inner_div">
                      <div className="productpage_slect_div">
                        <div  onClick={selectAllProducts} style={{cursor: "pointer"}} className="select_all">
                          <input checked={inputTrue ? true : false} type="checkbox"  />
                          <p className="select_text">Выбрать все</p>
                        </div>
                        <p onClick={deleteSelectedProducts} style={{cursor: "pointer"}} className="delete_text">Удалить выбранные</p>
                      </div>
                      <hr />
                      {Array.from(basket).map(item => 
                      <div className="productpage_card_div" id={item.id} style={{ position:"relative"}}>
                        <div className="inner_card_div">
                          <div className="inner_card_img_div">
                            <input type="checkbox" 
                              checked={!!selectedProducts[item.id]}
                              onChange={() => toggleProductSelection(item.id)}
                             />
                            <div className="card_inner_img_div">
                              <img src="" alt="" />
                            </div>
                          </div>
                          <div className="card_inner_content">
                            <p className="card_inner_name">{ item.name}</p>
                            <div className="card_inner_content_div">
                              <p className="card_inner_sany_weight"><span>Вес: </span>{ item.weight_with_package } кг</p>
                              <p className="card_inner_sany_weight"><span>Кол-во: </span>{item.count}</p>
                              <img className="cancel_svg_productpage" onClick={() => CancelProduct(item.id)} src={cancel} alt="cancel" />
                            </div>
                          </div>
                        </div>

                        <div className="obbsyy_minus_plus_div">
                          <div id={item.id} className="card_inner_minus_plus_div">
                            <div className="minus_plus_div">
                              <button className="card_inner_minus_plus_button" onClick={() => subtraction(item.id)}>&#8722;</button>
                              <p className="minus_plus_div_text">{item.count}</p>
                              <button  onClick={() => addition(item.id)} className="card_inner_minus_plus_button">&#x2b;</button>
                            </div>
                            <div id="addition_div" className="productpage_addition_div">
                              <div onClick={() => subtraction(item.id)}  className="add_div">
                                <button class="addition_btn">&#8722;</button>
                              </div>
                              <p>{item.count}</p>
                              <div onClick={() => addition(item.id)} className="add_div">
                                <button class="addition_btn">&#x2b;</button>
                              </div>
                            </div>
                          </div>

                          <div className="card_inner_prices_container" style={{width : "100%"}}>
                            <div className="card_inner_prices_div">
                              <p className="card_inner_price">{item.main_price}<span>₽</span></p>
                              <p className="card_inner_discount"><del>без: {item.discount} ₽</del></p>
                            </div>
                          </div>
                        </div>

                      </div>
                      )}
                    </div>
                 </div>

                    <div id="kartocka" className="productpage_kartocka_container">
                      <div className="kartocka_inner_div">
                        <div className="kartocka_inner_button_div">
                          <button onClick={() => navigate("/placing-an-order")}><span>Перейти к оформлению</span></button>
                          <p className="kartocka_inner_button_text">Адрес доставки и способ платы, вы сможете выбрать после нажатия на кнопку</p>
                        </div>

                        <div className="kartocka_inner_opisanye_div">
                          <p className="kartocka_inner_header">Ваша корзина</p>

                          <div className="kartocka_inner_sany_weight_div">
                            <p className="kartocka_inner_sany_weight"><span>Всего:</span> {count} товаров</p>
                            <div className="kartocka_inner_dot_div"></div>
                            <p className="kartocka_inner_sany_weight"><span>Вес: </span>{weight} кг</p>
                          </div>

                          <div className="kartocka_inner_price_div">
                            <p className="kartocka_inner_price_text">Итоговая стоимость</p>
                            <p className="kartocka_inner_price">{price}<span>₽</span></p>
                          </div>

                          <div className="kartocka_inner_price_div">
                            <p className="kartocka_inner_price_text">Ваша скидка:</p>
                            <p className="kartocka_inner_discount">{discount}<span>₽</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
              </div>
            
            </div>}
        <section style={{backgroundColor: "white", width: "100%", marginTop: "40px"}} id="recommends-section">
          <div style={{maxWidth: "90rem", width: "100%", margin: "0 auto", padding: "20px"}} className="rec-container">
            <div className="txt-rekommendasii">
              <p>Рекомендации</p>
            </div>
            <Cardsconteiner />
          </div>
        </section>
        </div>
        </div>
        
      <TabletMode open={open} />
    </React.Fragment>
  );
};

export default ProductPage;
