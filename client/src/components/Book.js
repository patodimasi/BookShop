import React from 'react'
import { FileTable } from './FileTable';
import { useState } from "react";
import { CheckboxInput } from './CheckboxInput';
import { Button } from 'primereact/button';
import { useAjaxGet } from '../hooks/useAjaxGet';

export const Book = () => {
    const [ajaxUrl, SetAjaxUrl] = useState(process.env.REACT_APP_API + "/search-books/");

    const [books, setBooks] = useState('');

    const {getData, get} = useAjaxGet(ajaxUrl,books);

    const [getResultSearch, setResultSearch] = useState([]);

    const [inputs, setInputs] = useState({
        title: '',
        author: '',
        stock: '',
        isbn: '',
    });

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const conseguirDatosFormulario = async (e) => {
        e.preventDefault();
        let datos = e.target;
    
        let books = {
            title: datos.title.value,
            isbn: datos.isbn.value,
            authors: datos.author.value,
            stock: datos.stock.value
        }

        setBooks(books);
    
    }
    return (
        
        <div className="row g-3">
            <div className="col-md-12">
                <div className="panel panel-info">
                    <div className="panel-heading"><strong>Filters</strong></div>
                    <form onSubmit={conseguirDatosFormulario}>
                        <div style={{ display: 'flex' }} >
                            <div className="panel-body" style={{ width: '87%' }}>

                                <div className="row g-3 text-left">
                                    <CheckboxInput name="title" inputs={inputs} handleInputChange={handleInputChange} />
                                    <CheckboxInput name="author" inputs={inputs} handleInputChange={handleInputChange} />
                                </div>

                                <div className="row g-3 text-left">
                                    <CheckboxInput name="isbn" inputs={inputs} handleInputChange={handleInputChange} />
                                    <CheckboxInput name="stock" inputs={inputs} handleInputChange={handleInputChange} />
                                </div>

                            </div>
                            <div className="panel-body" style={{ width: '10%' }}>

                                <Button type="submit" label="Search"  icon="pi pi-search" style={{ marginTop: '10px' }} text raised />

                            </div>
                        </div>
                    </form>

                </div>

                <div>
                   <FileTable data={getData} />
                </div>
            </div>
        </div>
        
    )
       
    
}