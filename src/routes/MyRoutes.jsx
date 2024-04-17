import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Katalog from '../pages/katalog/Katalog'
import MainPage from '../pages/mainpage/MainPage'
import ProductList from '../pages/productlist/ProductList'
import EmptyBasket from '../pages/emptybasket/EmptyBasket'
import ProductPage from '../pages/productpage/ProductPage'
import ProductDetail from '../pages/productdetails/ProductDetail'
import Oformleniye from '../pages/oformleniye/Oformleniye'

const MyRoutes = () => {
    useEffect(() =>{
        window.scroll(0,0)
    });
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/katalog' element={<Katalog />} />
                <Route path='/product' element={<ProductList />} />
                <Route path='/empty' element={<EmptyBasket />} />
                <Route path='/product-page' element={<ProductPage />} />
                <Route path='/product-detail' element={<ProductDetail />} />
                <Route path='/placing-an-order' element={<Oformleniye />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes
