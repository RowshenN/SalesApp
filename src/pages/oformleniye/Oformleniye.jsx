import React, {useState, useContext,useEffect} from "react";
import { useNavigate } from "react-router-dom";

import "./Oformleniye.css";
import Navigation from "../../components/navigation/Navigation";
import check_png from "../../images/Check.png";
import TabletMode from "../../components/tablet_mode/TabletMode";
import Katalog from '../katalog/Katalog'  
import { axiosInstance } from '../../utils/axiosInstance';
import { CountContext } from '../../utils/utils'

const Oformleniye = () => {
  const [openKatalog, setOpenKatalog] = useState(false)
  const open = () => setOpenKatalog(prevstate => !prevstate);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { postingProducts, ProductsForPost } = useContext(CountContext)
  const {count, price, weight, discount} = useContext(CountContext)

  const handleInputChange = (e, setInput) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    window.scroll(0, 0);
  })

  // Function to check input values and toggle button state
  const toggleButton = () => {
    if (name !== '' && phone !== '' && address !== '') {
      setIsButtonDisabled(false); // Enable the button
    } else {
      setIsButtonDisabled(true); // Disable the button
    }
  };

  const navigate = useNavigate()

  const postOrder = (e) => {
    e.preventDefault()
    ProductsForPost()
    const data  = {
      "name" : name,
      "phone" : phone,
      "delivery_address" : address,
      "payment_method" : "Credit Card",
      "cart_data" : postingProducts
    }
    console.log('--->',data)
    axiosInstance.post('/api/cart/place_order/', data)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }
  const PaymentType = (v) => {
    setPayment(v)
    console.log((payment));
  }

  return (
    <React.Fragment>
      <div className="oformlenye_container">
        <Navigation open = {open} katalog = {openKatalog}/>
        {openKatalog && <div className="mainpage_katalog_div">
          <Katalog />
        </div>}
      <div className="oformleniye_container_big">
          <section
            id="ordering"
            style={{ background: "#FBF8FD", width: "100%" }}
          >
            <div class="ordering-container">
              <div class="col-xl-8 justify-content-between ">
                <div class="txt-ordering">
                  <h4>Оформление заказа</h4>
                </div>
                <div class="order-box-container">
                  <form action="" id="myForm1">
                    <div class="d-md-flex form-flex">
                      <div class="form-group w-90">
                        <label class="form-control-label" for="fname" id="name">
                          Имя и фамилия
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="name"
                          id="name"
                          placeholder="Кирилл Филиппов"
                          required
                          value={name}
                          onChange={(e) => {
                            handleInputChange(e, setName);
                            toggleButton();
                            
                          }}
                        />
                        <img src={check_png} class="success-icon" alt="sdvsd" />
                      </div>
                      <div class="form-group w-90 ms-xl-5 ms-md-3">
                        <label
                          class="form-control-label"
                          for="number"
                          id="number"
                        >
                          Телефон
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          name="telephone_number"
                          id="number"
                          placeholder="+7 999 137 87 23"
                          required
                          value={phone}
                          onChange={(e) => {
                            handleInputChange(e, setPhone);
                            toggleButton();
                            
                          }}
                        />
                        <img
                          src={check_png}
                          class="success-icon"
                          alt="ascaedf"
                        />
                      </div>
                    </div>

                    <div class="row mt40">
                      <div class="col-md-6">
                        <div class="txt-delivery">
                          <p>Доставка</p>
                        </div>
                        <div class="form-group address-input">
                          <label
                            class="form-control-label"
                            for="address"
                            id="address"
                            name="address"
                          >
                            Адрес
                          </label>
                          <input
                            type="text"
                            class="form-control address-input"
                            name="address"
                            id="address"
                            placeholder=""
                            required
                            value={address}
                            onChange={(e) => {
                              handleInputChange(e, setAddress);
                              toggleButton();
                            }}
                          />
                          <img
                            src={check_png}
                            class="success-icon"
                            alt="aedfsd"
                          />
                        </div>
                      </div>
                      <div class="col-md-6 ps-4">
                        <div class="txt-payment-types">
                          <p>Способы оплаты</p>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="payment_type"
                            checked
                            onClick = {() => PaymentType("Naliciy")}
                          />
                          <label
                            class="form-check-label"
                            for="radioPaymentCache"
                          >
                            Наличными
                          </label>
                        </div>
                        <div class="form-check mt-3">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="payment_type"
                            onClick={() => PaymentType("Kartdan")}
                          />
                          <label
                            class="form-check-label"
                            for="radioPaymentOnline"
                          >
                            Оплата картой
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <div className="oformlenye_kartocka_oobsy_div"> */}
            <div id="oformlenye_kartocka" className="oformlenye_kartocka">
              <div className="oformlenye_kartocka_inner_button_div">
                <button onClick={postOrder} disabled={isButtonDisabled} className={isButtonDisabled ? "kartocka_button " : "kartocka_button button_active"}>
                  <span className={isButtonDisabled ? "span" : "span span_active"}>Подтвердить заказ</span>
                </button>
                <p className="kartocka_button_div_text">
                  Заполните все поля, для перехода на экран оплаты
                </p>
              </div>

              <div className="kartocka_content_div">
                <p className="content_div_header">Ваша корзина</p>
                <div className="content_div_opisaniye_div">
                  <p className="content_div_sany">
                    <span>Всего:</span> {count} товаров
                  </p>
                  <div></div>
                  <p className="content_div_agramy">
                    <span>Вес: </span>{weight} кг
                  </p>
                </div>

                <div className="content_prices_div">
                  <p className="content_div_price_name">Итоговая стоимость</p>
                  <p className="content_div_price">
                    {price} <span>₽</span>
                  </p>
                </div>

                <div className="content_prices_div">
                  <p className="content_div_price_name">Ваша скидка:</p>
                  <p className="content_div_discount">
                    {discount} <span>₽</span>
                  </p>
                </div>
              </div>
            </div>
            {/* </div> */}
          </section>
        </div>
    </div>
    <TabletMode open={open}/>
    </React.Fragment>
  );
};

export default Oformleniye;
