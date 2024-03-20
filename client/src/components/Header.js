import React from 'react'

export const Header = () => {
    return(
        <>
           <header className="header">  
                <div style={{ marginLeft: '10px' }}>    
                    <img src={require('../images/book.png')} className='libroimg' alt='logoboook' />
                    <h1 className="title">Book Shop</h1>
                </div>
            </header>   
        </>
    )
}