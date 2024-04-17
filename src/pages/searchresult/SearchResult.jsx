import React, { useState, useEffect } from "react";
import { Select } from "antd"; 

// import { useParams } from "react-router-dom";
import "./SearchResult.css";
import Navigation from "../../components/navigation/Navigation";
import ProductListCard from "../productlist/productlist-card/ProductListCard";
import arrow_up from "../../images/arrow-up.svg";
import down_arrow from "../../images/down-arrow_2.svg";
import check_svg from "../../images/check.svg";
import TabletMode from "../../components/tablet_mode/TabletMode";
import filter_btn from "../../images/filter_btn.png";
import { axiosInstance } from '../../utils/axiosInstance';
import { useLocation } from "react-router-dom";
import Katalog from '../katalog/Katalog'

const { Option } = Select;

const ProductList = (props) => {
  // const {categoryID} = useParams()
  const location = useLocation()
  const query = location.state;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // const handleChange = (value) => {
  //   setState(value);
  // };
  const getSearch = (query) => {
      axiosInstance
        .get(`api/ecom/products/?search=${query}`)
        .then((res) => {
          setProducts(res.data)
          const arr = []
          products.forEach(element => {
            arr.push(element.category)
          });
          const sortedUniqueArr = Array.from(new Set(arr)).sort((a, b) => a - b);
          setCategories(sortedUniqueArr)
        })
        .catch((err) => { console.log(err) })
    };
  useEffect(() => {
    getSearch(query);
    window.scroll(0, 0);
  }, [query]);

  const [openKatalog, setOpenKatalog] = useState(false)
  const open = () => setOpenKatalog(prevstate => !prevstate);

  return (
    <React.Fragment>
      <div className="productlist_oobsy_container">
      <Navigation open = {open} katalog = {openKatalog}/>
        {openKatalog && <div className="mainpage_katalog_div">
          <Katalog />
        </div>}
      <div className="productlist_container">
        <div className="productlist_navigator_div">
          {/* <p className="productlist_navigator">{category.name }</p> */}
        </div>

        <div className="productlist_category_name_div">
          {/* <p className="productlist_category_name">{category.name}</p> */}
        </div>

        <div className="productlist_inner_container">
          <div className="productlist_inner_div">
            <div className="productlist_categories_name_div">
              <p className="productlist_categories_name">Категории</p>
            </div>
            <div className="productlist_categoryList_div">
              <ul className="productlist_categories_lists">
                {
                <React.Fragment> 
                  <div className="productlist_categories_div">
                  {categories?.map((item) => {return ( <li key={item} className="productlist_categories">{item}</li>)})}
                  </div>
                 </React.Fragment>
                 }
              </ul>
            </div>
            <div className="productlist_rasprodaza_container">
              <p className="productlist_raprodaza_text">Распродажа</p>
              <div class="form-check form-switch">
                <input
                  style={{ cursor: "pointer" }}
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                />
              </div>
            </div>

            <div className="productlist_filters_div">
              <div className="productlist_filters_inner_div">
                <p className="productlist_filters_inner_header">
                  Характеристика
                </p>
                <ul className="productlist_filters_inner_lists">
                  <li className="productlist_filters_inner_list">
                    <div class="form-check">
                      <input
                        style={{ cursor: "pointer" }}
                        class="form-check-input"
                        type="radio"
                        id="12"
                      />
                    </div>
                    <label htmlFor="12">Значение 1</label>
                  </li>
                  <li className="productlist_filters_inner_list">
                    <div class="form-check">
                      <input
                        style={{ cursor: "pointer" }}
                        class="form-check-input"
                        type="radio"
                        id="11"
                      />
                    </div>
                    <label htmlFor="11">Значение 2</label>
                  </li>
                  <li className="productlist_filters_inner_list">
                    <div class="form-check">
                      <input
                        style={{ cursor: "pointer" }}
                        class="form-check-input"
                        type="radio"
                        id="10"
                      />
                    </div>
                    <label htmlFor="10">Значение 3</label>
                  </li>
                  <li className="productlist_filters_inner_list">
                    <div class="form-check">
                      <input
                        style={{ cursor: "pointer" }}
                        class="form-check-input"
                        type="radio"
                        id="9"
                      />
                    </div>
                    <label htmlFor="9">Значение 4</label>
                  </li>
                  <li className="productlist_filters_inner_list">
                    <div class="form-check">
                      <input
                        style={{ cursor: "pointer" }}
                        class="form-check-input"
                        type="radio"
                        id="8"
                      />
                    </div>
                    <label htmlFor="8">Значение 5</label>
                  </li>
                  <li className="productlist_filters_inner_list">
                    <div class="form-check">
                      <input
                        style={{ cursor: "pointer" }}
                        class="form-check-input"
                        type="radio"
                        id="7"
                      />
                    </div>
                    <label htmlFor="7">Значение 6</label>
                  </li>
                </ul>
              </div>

              <div className="productlist_filters_inner_div">
                <p className="productlist_filters_inner_header">
                  Характеристика
                </p>
                <ul className="productlist_filters_inner_lists">
                  <li className="productlist_filters_inner_list">
                    <div class="form-check">
                      <input
                        style={{ cursor: "pointer" }}
                        className="form-check-input"
                        type="checkbox"
                        id="1"
                      />
                    </div>
                    <label htmlFor="1">Значение 1</label>
                  </li>
                  <li className="productlist_filters_inner_list">
                    <div class="form-check">
                      <input
                        style={{ cursor: "pointer" }}
                        className="form-check-input"
                        type="checkbox"
                        id="2"
                      />
                    </div>
                    <label htmlFor="2">Значение 2</label>
                  </li>
                  <li className="productlist_filters_inner_list">
                    <div class="form-check">
                      <input
                        style={{ cursor: "pointer" }}
                        className="form-check-input"
                        type="checkbox"
                        id="3"
                      />
                    </div>
                    <label htmlFor="3">Значение 3</label>
                  </li>
                  <li className="productlist_filters_inner_list">
                    <div class="form-check">
                      <input
                        style={{ cursor: "pointer" }}
                        className="form-check-input"
                        type="checkbox"
                        id="4"
                      />
                    </div>
                    <label htmlFor="4">Значение 4</label>
                  </li>
                  <li className="productlist_filters_inner_list">
                    <div class="form-check">
                      <input
                        style={{ cursor: "pointer" }}
                        className="form-check-input"
                        type="checkbox"
                        id="5"
                      />
                    </div>
                    <label htmlFor="5">Значение 5</label>
                  </li>
                  <li className="productlist_filters_inner_list">
                    <div class="form-check">
                      <input
                        style={{ cursor: "pointer" }}
                        className="form-check-input"
                        type="checkbox"
                        id="6"
                      />
                    </div>
                    <label htmlFor="6">Значение 6</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="productlist_card_container">
            <div className="flex_filter_div">
              <div className="productlist_select_div">
                {/* <Select
                  className="custom_select"
                  defaultValue="Популярные"
                  menuItemSelectedIcon={
                    <img src={check_svg} alt="Arrow down" />
                  }
                  suffixIcon={<img src={down_arrow} alt="Arrow down" />}
                  onChange={handleChange}
                  style={{ width: 273 }}
                >
                  <Option value="Популярные">Популярные</Option>
                  <Option value="Сначала дешёвые">Сначала дешёвые</Option>
                  <Option value="Сначала дорогие">Сначала дорогие</Option>
                  <Option value="По размеру скидки">По размеру скидки</Option>
                  <Option value="Высокий рейтинг">Высокий рейтинг</Option>
                </Select> */}
              </div>
              <div className="filter_btn">
                <img src={filter_btn} alt="filter"></img>
              </div>
            </div>
            <div style={{marginBottom: '60px'}} className="prod_list_card_flex_div">
              {
                products?.map((Product) => {return (
                  <ProductListCard product={Product} />
                )})
              }
            </div>
          </div>
        </div>
      </div>
      </div>
      <TabletMode />
      </React.Fragment>
  );
};

export default ProductList;
