import React, {useEffect, useState} from "react";
import "./EmptyBasket.css";
import Navigation from "../../components/navigation/Navigation";
import Cardsconteiner from "../../components/cards/cardsconteiner";
import TabletMode from "../../components/tablet_mode/TabletMode";
import Katalog from "../katalog/Katalog";
import Section from "./emty section/Section";
import YandeksEmpty from "./yandeks market/YandeksEmpty";

const EmptyBasket = () => {

  const [openKatalog, setOpenKatalog] = useState(false)
  const open = () => setOpenKatalog(prevstate => !prevstate);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
    window.scroll(0, 0);
  }, [])
  return (
    <React.Fragment>
      <Navigation open={open} katalog={openKatalog} />
        {openKatalog && (
          <div className="mainpage_katalog_div">
            <Katalog />
          </div>
        )}
        {isLoading ? <div className="loading"><p>Loading...</p></div> : <>
          {/* <Section header="Корзина пуста" /> */}
          <YandeksEmpty header="Сложите в корзину нужные товары" />
          <div className="empty_basket_conatiner">
            <section id="recommendation">
              <div className="container-fluid">
                <h4 className="txt-recommendation">Рекомендации</h4>
                <Cardsconteiner />
              </div>
            </section>
          </div>
        </>}
        
      <TabletMode open={open} />
    </React.Fragment>
  );
};

export default EmptyBasket;
