import React, {useState, useEffect} from 'react'

import './MainPage.css'
import Navigation from '../../components/navigation/Navigation'
import MainFlyier from '../../components/reklama/MainFlyier'
import Header from '../../components/Navigator/Header'
import CategoriesTop from '../../components/category/CategoriesTop'
import Cardsconteiner from '../../components/cards/cardsconteiner'
import Miniflier from '../../components/reklama/miniflier/Miniflier'
import LittleCardsContainer from '../../components/cards/LittleCardsContainer'
import SixBoxes from '../../components/category6boxes/SixBoxes'
import Fourboxes from '../../components/category 4 block/Fourboxes'
import RandomProducts from '../randomProducts/randomProducts'
import TabletMode from '../../components/tablet_mode/TabletMode'
import Katalog from '../katalog/Katalog'
// import Blok from '../../components/Yandeks market/Blok'
// import Harakteristika from '../../components/harakteristika/Harakteristika'
// import Часто from '../../components/Часто ищут/Часто ищут'
// import DetailHeader from '../../components/productdetailheader/DetailHeader'
// import YandeksNav from '../../components/yandeks navigation/YandeksNav'

const MainPage = (props) => {
    const [openKatalog, setOpenKatalog] = useState(false)
    const open = () => setOpenKatalog(prevstate => !prevstate);
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <React.Fragment>
            <div className='mainpage_container'>
                <Navigation open={open} katalog = {openKatalog} />
                {/* <YandeksNav  open={open} katalog = {openKatalog}/> */}
                { openKatalog && 
                    <div id='katalog_main' className="mainpage_katalog_div">
                        <Katalog />
                    </div>
                }
                <MainFlyier />  
                <Header title="Категории товаров" />
                <CategoriesTop />
                <Miniflier />
                <Header title="Топ месяца" />
                <Cardsconteiner />
                <Header title="Наши новинки" />
                <LittleCardsContainer />
                <Header title="Пример блока 6 колонками" />
                <SixBoxes />
                <Header title="Пример блока 4 колонками" />
                <Fourboxes />
                <RandomProducts />
                {/* <Blok />
                <Harakteristika />
                <Часто header="Часто ищут" inner_text="Электрочайники дёшово" />
                <DetailHeader 
                    header="Рекомендуем бренд заглушка блока цилиндров! 02543, D=34mm\ MB W123/W124 <93/Vito/Viano/Vario 96>" 
                    inner_header="Коротко о товаре"
                /> */}
            </div>
            <TabletMode open = {open} />
        </React.Fragment>
    )
}

export default MainPage
