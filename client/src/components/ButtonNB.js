import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';

export const ButtonNB = (props) => {

    const handleClick = () => {
        props.cambiarContenido(props.nombre);
    };

    return (
        <>
            <Link to={props.nombre}>
                <button type="button" >  
                    <img src={require('../images/' + props.img_url)} alt={props.nombre}  className="each_imagen_nav"></img>
                </button>
            </Link>
            <p><strong>{props.alt}</strong></p>
        </>
    )
}