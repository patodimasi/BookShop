import React from 'react'

export const CheckboxInput = ({ name, inputs, handleInputChange }) =>{

    return(
        <>
            <div className="col-md-4">
                <div className="checkbox">
                    <label className="custom-label"><input type="checkbox" value=""    checked={inputs[name] !== ''} readOnly></input> <strong>{name.charAt(0).toUpperCase() + name.slice(1)}</strong></label>
                    {
                        name === 'stock' ? 
                        (
                            <select name={name} style={{ width: '168px' }} value={inputs[name]} onChange={handleInputChange}>
                                 <option value=""></option>
                                <option value="IN STOCK">IN STOCK</option>
                                <option value="LOW STOCK">LOW STOCK</option>
                                <option value="OUT OF STOCK">OUT OF STOCK</option>
                            </select>
                        ):
                        (
                            <input type="text"   name={name}   value={inputs[name]} onChange={handleInputChange}></input>   
                        )
                    }
                </div>
            </div>   
        </>
    )
}