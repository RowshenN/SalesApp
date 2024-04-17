import React, { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import "./ProductDetail.css";
import Navigation from "../../components/navigation/Navigation";
import { useLocation } from "react-router-dom";
import RandomProducts from "../randomProducts/randomProducts";
import AnalogProducts from "../analogProducts/analogProducts";
import TabletMode from "../../components/tablet_mode/TabletMode";
import Katalog from '../katalog/Katalog'
import { CountContext } from '../../utils/utils'
import { Spin } from 'antd';

const ProductDetail = (props) => {
  const location = useLocation();
  const id = location.state;
  const [ProductDetail, setProductDetail] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const {BasketProductCounter, basket, setBasket} = useContext(CountContext);

  useEffect(() => {
    window.scroll(0,0)
    getProductDetail();
  }, []);

  const getProductDetail = () => {
    axiosInstance
      .get(`api/ecom/products/${id}`)
      .then((res) => {
        setProductDetail(res.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [sticky, setSticky] = useState(false);
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 350 || window.innerWidth <= 1100) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  });

  const [openKatalog, setOpenKatalog] = useState(false)
  const open = () => setOpenKatalog(prevstate => !prevstate);

  const AddBasket = () => {
    let existingProducts = basket;
    if (!Array.isArray(existingProducts)) {
      console.error('Existing products is not an array:', existingProducts);
      existingProducts = []; // reset to an empty array to prevent further errors
    }
    ProductDetail.count = 1;
    let productExists = existingProducts.some(element => element.id === ProductDetail.id);
    if (productExists) {
      existingProducts = existingProducts.map(element => {
        if (element.id === ProductDetail.id) {
          return {
            ...element,
            count: element.count + ProductDetail.count
          };
        }
        return element;
      });
    } else {
      existingProducts.push(ProductDetail);
    }
    setBasket(existingProducts);
    BasketProductCounter();
  }
  return (
    <React.Fragment>
      <div className="productdetail_ooobsy_container">
      <Navigation open = {open} katalog = {openKatalog}/>
        {openKatalog && <div className="mainpage_katalog_div">
          <Katalog />
        </div>}
      {sticky && (
        <div className="productdetail_sticky_div">
          <div className="productdetail_sticky_inner">
            <img src="" alt="" />
            <p className="productdetail_sticky_inner_header">
              {ProductDetail.name}
            </p>
          </div>

          <div className="productdetail_sticky_inner_prices">
            <p className="productdetail_sticky_price">
              {ProductDetail.main_price}
              <span class="v-rouble"> ₽</span>
            </p>
            <p className="productdetail_sticky_discount">
              {ProductDetail.price_before_discount}
              <span class="g-rouble"> ₽</span>
            </p>
          </div>

          <button className="productdetail_sticky_button" onClick={AddBasket}>
            Добавить в корзину
          </button>
        </div>
      )}
      {isloading ? <div className="loading"><Spin size="large" /></div> :
      <div className="product_details_container_big">
        <section id="details">
          <div class="container-fluid">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">??????</li>
                <li class="breadcrumb-item">
                  Ноутбуки, планшеты и электронные книги ?????
                </li>
                <li class="breadcrumb-item">{ProductDetail.category}</li>
                {/* <li
                  class="breadcrumb-item active"
                  aria-current="page"
                  style={{ background: "#fff", color: "#1A73E9" }}
                >
                  F+
                </li> */}
              </ol>
            </nav>
            <p class="product-title">{ProductDetail.name}</p>
            <p class="txt-kod-tovara">
              код товара: {ProductDetail.product_code}
            </p>
            <hr />

            <div class="prod-flex">
              <div class="productdetail_image_opisaniya_div">
                <div class="d-flex">
                  <div class="small-img-group">
                  {ProductDetail.web_images?.length > 0 ? ProductDetail.web_images.map((item) => {
                    return (
                      <React.Fragment>
                    <img
                      src={item.web_images?.length > 0 ? item.web_images[0].src : []}
                      alt="img"
                      className="small-img"
                    />
                    </React.Fragment>
                  )}) : []}
                  </div>
                  <div class="main-img-product">
                    <img
                      src={ProductDetail.web_images?.length > 0 ? ProductDetail.web_images[0].src : []}
                      alt="img"
                      class="img-fluid"
                      id="MainImg"
                    />
                  </div>
                </div>
              </div>

              <div class="productdetail_opisaniya_div">
                <div class="d-flex brand-div">
                  <div class="img-brand"></div>
                  <div class="txt-brand ps-3 align-self-center">
                    <p>{ProductDetail.brand}</p>
                  </div>
                </div>
                <div class="txt-model">
                  <p>Модель процессора: </p>
                </div>
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="tab-link active"
                      id="pills-first-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-first"
                      type="button"
                      role="tab"
                      aria-controls="pills-first"
                      aria-selected="true"
                    >
                      Intel Core i3
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="tab-link ms-2"
                      id="pills-second-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-second"
                      type="button"
                      role="tab"
                      aria-controls="pills-second"
                      aria-selected="false"
                    >
                      Intel Core i5
                    </button>
                  </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    style={{ background: "#fff" }}
                    class="tab-pane fade show active"
                    id="pills-first"
                    role="tabpanel"
                    aria-labelledby="pills-first-tab"
                    tabindex="0"
                  >
                    <div class="txt-leftside">
                      <p>Общий объем SSD, ГБ:</p>
                    </div>
                    <ul
                      class="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li class="nav-item" role="presentation">
                        <button
                          class="tab-link active"
                          id="pills-home-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          256
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="tab-link ms-2"
                          id="pills-profile-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-profile"
                          type="button"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                        >
                          512
                        </button>
                      </li>
                    </ul>
                    <div class="d-flex info-flex">
                      <div class="txt-leftside">
                        <p>Процессор</p>
                      </div>
                      <div class="txt-rightside">
                        <p>Intel Core i3-1215U (1.2 ГГц)</p>
                      </div>
                    </div>
                    <div class="d-flex info-flex">
                      <div class="txt-leftside">
                        <p>Оперативная память</p>
                      </div>
                      <div class="txt-rightside">8 ГБ</div>
                    </div>
                    <div class="d-flex info-flex">
                      <div class="txt-leftside">
                        <p>Общий объем SSD, ГБ:</p>
                      </div>
                      <div class="txt-rightside">
                        <p>256</p>
                      </div>
                    </div>
                    <div class="d-flex info-flex">
                      <div class="txt-leftside">
                        <p>Видеокарта</p>
                      </div>
                      Intel UHD Graphics
                    </div>
                    <div class="d-flex info-flex">
                      <div class="txt-leftside">
                        <p>Операционная система</p>
                      </div>
                      Windows Home
                    </div>
                    <div class="d-flex info-flex">
                      <div class="txt-leftside">
                        <p>Диагональ экрана, дюймы</p>
                      </div>
                      <div class="txt-rightside">
                        <p>15.6</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-second"
                    role="tabpanel"
                    aria-labelledby="pills-second-tab"
                    tabindex="0"
                  >
                    ...
                  </div>
                </div>
              </div>
              <div class="dobawit_vkorzinu_div">
                {/* <!-- Dobavit v korzinu container start --> */}
                <div class="add-tocart-container">
                  <div class="d-flex align-items-center">
                    <div class="total-price">
                      <p>
                        {ProductDetail.main_price}
                        <span class="v-rouble"> ₽</span>
                      </p>
                    </div>
                    <div class="price-strikethrough ms-3">
                      <p>
                        {ProductDetail.price_before_discount}
                        <span class="g-rouble"> ₽</span>
                      </p>
                    </div>
                    <div class="p-discount ms-3">
                      <p>-12%</p>
                    </div>
                  </div>
                  <div class="btn-add-tocart">
                    <button type="button" onClick={AddBasket}>Добавить в корзину</button>
                  </div>
                </div>
                {/* <!-- Dobavit v korzinu container end --> */}
              </div>
            </div>
          </div>
        </section>

        <section id="analogi-section">
          <div class="container-fluid">
            <h4 class="txt-analogi">Аналоги</h4>
          </div>
          <AnalogProducts />
        </section>

        <section id="description-section">
          <div class="container-fluid">
            <h4 class="txt-opisanie">Описание</h4>
            <p class="txt-description-itself">
              {ProductDetail.description}
            </p>
            <p class="txt-komplektasiya">Комплектация</p>
            <ul class="komplektasiya-itself">
              <li>Ноутбук</li>
              <li>Сетевое зарядное устройство</li>
            </ul>
            <p class="txt-harakteristiki">Характеристики</p>
            <p class="txt-interfeysy">Интерфейсы и разъемы</p>
            <div class="d-md-flex">
              <div class="leftflex">
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Интерфейсы и разъемы</p>
                  </div>
                  3.5 мм, HDML, USB Type-C, USB 3.2
                </div>
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Картридер</p>
                  </div>
                  microSD
                </div>
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Число портов DisplayPort</p>
                  </div>
                  <div class="txt-rightside">
                    <p>1</p>
                  </div>
                </div>
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Число портов HDML</p>
                  </div>
                  <div class="txt-rightside">
                    <p>1</p>
                  </div>
                </div>
              </div>
              <div class="rightflex ms-md-5">
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Число портов USB 3/2 Gen 1</p>
                  </div>
                  <div class="txt-rightside">
                    <p>1</p>
                  </div>
                </div>
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Число портов USB 3/2 Gen 1</p>
                  </div>
                  <div class="txt-rightside">
                    <p>1</p>
                  </div>
                </div>
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Число портов USB 3/2 Gen 1</p>
                  </div>
                  <div class="txt-rightside">
                    <p>1</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="txt-osnovnye">
              <p>Основные</p>
            </div>
            <div class="d-flex">
              <div class="leftflex">
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Операционная система</p>
                  </div>
                  Windows Home
                </div>
              </div>
            </div>
            <div class="txt-operativnaya">
              <p>Оперативная память</p>
            </div>
            <div class="d-flex detail_flex_div">
              <div class="leftflex">
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Оперативная память</p>
                  </div>
                  8 ГБ
                </div>
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Тип памяти</p>
                  </div>
                  <div class="txt-rightside">
                    <p>DDR</p>
                  </div>
                </div>
              </div>
              <div class="rightflex ms-md-5">
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Возможность расширения RAM, до</p>
                  </div>
                  <div class="txt-rightside">
                    <p>32 ГБ</p>
                  </div>
                </div>
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Фарм-фактор RAM</p>
                  </div>
                  <div class="txt-rightside">
                    <p>SO-DIMM</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="txt-dopolnitelnye">
              <p>Дополнительные</p>
            </div>
            <div class="d-flex detail_flex_div">
              <div class="leftflex">
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Чипсет</p>
                  </div>
                  <div class="txt-rightside">
                    <p>Intel</p>
                  </div>
                </div>
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Бренд</p>
                  </div>
                  VaiTord
                </div>
              </div>
              <div class="rightflex ms-md-5">
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Страна изготовитель</p>
                  </div>
                  <div class="txt-rightside">
                    <p>Турция</p>
                  </div>
                </div>
                <div class="d-flex info-flex">
                  <div class="txt-leftside">
                    <p>Цвет</p>
                  </div>
                  <div class="txt-rightside">
                    <p>Белый</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {/* <div class="sm-txt-under-desc">
              <p>
                Информация о технических характеристиках, комплекте поставки,
                стране изготовления, внешнем виде и цвете товара носит
                справочный характер и основывается на последних доступных
                к моменту публикации сведениях
              </p>
            </div> */}
          </div>
        </section>

        <section id="recommend-section" class="pb-5">
          <div class="container-fluid">
            <h4 class="txt-rekomenduem">Рекомендуем</h4>
          </div>
          <RandomProducts />
        </section>
      </div>}
      </div>
      <TabletMode open={open} />
    </React.Fragment>
  );
};

export default ProductDetail;
