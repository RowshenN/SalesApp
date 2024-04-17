import React, {useContext} from 'react'

import './ProductListCard.css'
import { CountContext } from '../../../utils/utils';


const ProductListCard = (props) => {

  const {BasketProductCounter, basket,setBasket} = useContext(CountContext);

    const AddBasket = () => {
        let existingProducts = basket || [];
        if (!Array.isArray(existingProducts)) {
          console.error('Existing products is not an array:', existingProducts);
          existingProducts = []; // reset to an empty array to prevent further errors
        }
        props.product.count = 1;
        let productExists = existingProducts.some(element => element.id === props.product.id);
        if (productExists) {
          existingProducts = existingProducts.map(element => {
            if (element.id === props.product.id) {
              return {
                ...element,
                count: element.count + props.product.count
              };
            }
            return element;
          });
        } else {
          existingProducts.push(props.product);
        }
        setBasket(existingProducts);
        BasketProductCounter();
      }
    return (
        <>
            <div className="productpage_card">
                <div className="productpage_card_image">

                </div>
                <div className="productpage_card_inner_content">
                    <div className="inner_content_inner">
                        <div className="inner_content_name_div">
                            <p className='inner_content_name'>{props.product.name}</p>
                        </div>
                        <div className="inner_content_price_div d-flex flex-wrap">
                            <p className="inner_content_price">{`${props.product.main_price} ₽`}</p>
                            {props.product.discount ? <p className="inner_content_discount">{`-${props.product.discount} %`}</p>: null}
                            {props.product.price_before_discount ? <p className="inner_content_old_price">/ без: {`${props.product.price_before_discount} ₽`}</p> : null}
                        </div>
                    </div>
                    <div className="inner_content_product_opisaniya">
                        <p className="inner_content_text">Диагональ экрана: <span className='inner_content_text_span'>16</span> </p>
                        <p className="inner_content_text">Разрешение экрана: <span className='inner_content_text_span'>3840x2400</span></p>
                        <p className="inner_content_text">Частота обновления экрана: <span className='inner_content_text_span'>60 Гц</span></p>
                        <p className="inner_content_text">Тип матрицы экрана: <span className='inner_content_text_span'>OLED</span></p>
                        <p className="inner_content_text">Процессор: <span className='inner_content_text_span'>Intel Core i7 1260P</span></p>
                    </div>
                    <div className="inner_content_button_div">
                        <button onClick={() => AddBasket()} className="inner_content_button">В корзину</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductListCard
