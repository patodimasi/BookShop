import { useEffect, useState } from "react";

export const useAjax = (url) => {

    const [databook, setDataBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const postData = async (requestData) => {
      try {
        setLoading(true);
        console.log("esta es la url " + url);
        console.log("request data ", requestData);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        if (!response.ok) {
          throw new Error('Error en la solicitud al servidor');
        }
  
        const responseData = await response.json();
        setDataBook(responseData);
        return responseData;
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const putData = async (requestData) => {
      try {
        setLoading(true);
        console.log("esta es la url " + url);
        console.log("request data ", requestData);
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        if (!response.ok) {
          throw new Error('Error en la solicitud al servidor');
        }
  
        const responseData = await response.json();
       // return responseData;
        setDataBook(responseData);
        return responseData;
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const deleteData = async (requestData) => {
    try {
        setLoading(true);
        console.log("CLIENT: esta es la url " + url);
        console.log("CLIENT: request data: ", requestData);
        const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestData),
        });
  
        if (!response.ok) {
        	throw new Error('Error en la solicitud al servidor');
        }
  
        const responseData = await response.json();
        setDataBook(responseData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    return { databook, loading, error, postData, putData, deleteData };
};  
