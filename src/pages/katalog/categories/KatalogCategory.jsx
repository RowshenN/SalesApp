import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import './KatalogCategory.css'
import down_arrow from '../../../images/down-arrow.svg'
import up_arrow from '../../../images/up-arrow.svg'
import { axiosInstance } from '../../../utils/axiosInstance';
import cancel from '../../../images/cancel_svg.svg'
import { Spin } from 'antd';

const KatalogCategory = (props) => {
    const [isLoading, setIsLoading] = useState(props.isLoading);
    const [katalogChildren, setKatalogChildren] = useState([]);
    
    function isActive(id) {       
        const element = document.getElementById(id);
        element.classList.toggle('active');
        const more = document.getElementById(`open-subc-${id}`).querySelector('p')
        const img = document.getElementById(`open-subc-${id}`).querySelector('img')
        more.innerHTML = textOpen ? 'Свернуть': 'Ещё'
        img.src = textOpen ? up_arrow : down_arrow
        setTextOpen(prevState => !prevState)
    }

    const getKatalog = async () => {
        try {
          const response = await axiosInstance.get(`api/ecom/categories/`);
            getKatalogChildren(response.data[0].id);
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
        if (props.katalogId.length > 0) {
            getKatalogChildren(props.katalogId);
        }else{
            getKatalog()
        }
    }, [props.katalogId]);
    
    const navigate = useNavigate()
    const [textOpen, setTextOpen] = useState(true);
    // const [katalogChildren, setKatalogChildren] = useState([])

    const getKatalogChildren = (id) => {
        setIsLoading(true)
        axiosInstance
          .get(`api/ecom/categories/${id}/`)
          .then((res) => {
            setKatalogChildren(res.data);
            setIsLoading(false)
          })
          .catch((err) => { console.log(err); setIsLoading(false) })
      };
    return (
        <div className="active-katalog">
            <h4 className='active-katalog-name'>{katalogChildren?.name}</h4>
            <div className='category-list'  id='ParentElement' style={{marginTop:"86px"}}>
                <div onClick={() => props.cancel()} id='cancel' className="katalogkategory_canlce_img_div">
                    <img src={cancel} alt="cancel" style={{width: "12px", height: "12px"}} />
                </div>
                {isLoading ? <div className='loading'><Spin size="large" /></div> : katalogChildren?.children?.length !== 0 ? katalogChildren.children?.map((item, index) => {return (
                     <div className='scrolbar'>
                        <div className='category-container-new katalog-container-name'>
                            <p className='katalog_subcategory_name'>{item.name}</p>
                        </div>
                        <div id={ item.id } className="category-container-new"style={{paddingBottom:"10px"}}>
                            {item.children.map((subcategory) => { return (
                            <div className="katalog_subcategory_categories_div">
                                <p onClick={() => navigate('/product', { state: katalogChildren.id })} className="katalog_subcategory_categories">{subcategory.name}</p>
                            </div>
                            )})}    
                        </div>
                        <div className="katalog_subcategory_more_div">
                            <div onClick={() => isActive(item?.id)} id={`open-subc-${item.id}`} className="katalogCategory_more_div">
                                <p className="katalogCategory_more">Ещё</p>
                                <img src={down_arrow} alt="down-arrow" className='kategory_down_arrow_icon' />
                            </div>
                        </div>
                    </div>
                )}):<div id='category-container-new' className="category-container-new">
                        <h1 className='not_found_category'>Not Found</h1>
                    </div>}
                        
            </div>

                
            
        </div>

    )
}

export default KatalogCategory
