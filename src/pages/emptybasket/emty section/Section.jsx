import React from 'react'

import './Section.css'

const Section = (props) => {
  return (
    <section id="empty-cart" className="p-1 p-sm-4 text-center text-sm-start">
            <div className="emptypage_inner_div">
              <p className="txt-cart-isempty">{props.header}</p>
              <p className="txt-under-empty">
                Воспользуйтесь поиском, чтобы найти все, что нужно. <br />
                Если в корзине были товары — войдите, чтобы посмотреть список.
              </p>
            </div>
    </section>
  )
}

export default Section
