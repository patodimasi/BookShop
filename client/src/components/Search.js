import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { ButtonNB } from './ButtonNB';

export const Search = () => {
    return(
        <>
            <div className="panel-body">
                <div className="tab-content">
                    <div className="tab-pane fade active in" id="home">
                        <div className="imagen_nav">
                            <div className="center_image">
                                <ButtonNB img_url="books.png" alt="Book" nombre="book"/>
                            </div>
                            <div className="center_image">
                                <ButtonNB img_url="sale.png" alt="Sales" nombre="sales"/>
                            </div>      
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Outlet></Outlet>
            </div> 
        </>
    )
}