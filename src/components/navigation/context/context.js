import React ,{ useState, useEffect,createContext} from "react";

export const SebedimContext = createContext();

const SebedimContextProvider = (props)=>{
    
    
    let localData;
        const search =localStorage.getItem("search");
    if(search){
        localData = search;
    }
    else{
        localData = "";
    }
  
    const [searchInput,setSearchInput]=useState(localData);    

    
    const Remove = async()=>{ 
        setSearchInput("");
        localStorage.setItem("search","");

    }
    const onChange = async(data)=>{ 
        setSearchInput(data); 
    }
    useEffect(()=>{
        
            localStorage.setItem("search",searchInput);
        
    },[searchInput]);

  
   

    return(
        <SebedimContext.Provider value={{searchInput,onChange,Remove}}>
            {props.children}
        </SebedimContext.Provider>
    );
};

export default SebedimContextProvider;  