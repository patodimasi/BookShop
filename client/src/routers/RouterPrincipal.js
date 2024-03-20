import React from 'react';
import {Routes, Route, Link, BrowserRouter, Navigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Search } from '../components/Search';
import { Footer } from '../components/Footer';
import { Book } from '../components/Book';
import { Sales } from '../components/Sales';

export const RouterPrincipal = () =>{
    return(
        <BrowserRouter>
            <div>
                <Header></Header>
                <section className='mb-4'>
                    <Routes>
                        <Route path="/" element={<Search />} />
                        <Route path="/*" element={<Search />}>
                            <Route path="book" element={<Book />} />
                            <Route path="sales" element={<Sales />} />
                        </Route>
                    </Routes>    
                </section>
                <Footer></Footer>

            </div>
        </BrowserRouter>
    )
}