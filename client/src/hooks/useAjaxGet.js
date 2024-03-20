import { useState, useEffect } from "react";

export const useAjaxGet = (url,filtro) =>{
   

    const [getData, setGetData] = useState([]);
    
    useEffect(() => {
        if (filtro != ''){
           get();
        }
   
    }, [url,filtro]);

    const get = async() =>{
        const objetoCodificado = encodeURIComponent(JSON.stringify(filtro));
        const peticion = await fetch(url + objetoCodificado, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        const data = await peticion.json();
        console.log("Respuesta del servidor:", data);
        setGetData(data);
    }
    
    return {getData, get};

}

export default useAjaxGet;