import React from 'react'
import { Dialog } from 'primereact/dialog';

export const DialogMsj = ({isbnProductDialog, setIsbnProductDialog, setProductIsbn, productIsbn}) => {

    const hideIsbnProductsDialog = () => {
        setIsbnProductDialog(false);
        setProductIsbn();
    };
    const headerDialogIsbn = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-start">
            <i className="pi pi-exclamation-triangle mr-3"  style={{ fontSize: '1.5rem' }} />
            <span className="font-bold white-space-nowrap">Warning!</span>
        </div>
    );

   return(
    <>
  
        <Dialog visible={isbnProductDialog}  style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header={headerDialogIsbn} modal onHide={hideIsbnProductsDialog} >
            <div className="confirmation-content">
                <strong>The isbn already exists:</strong>
                <p></p>
                    {isbnProductDialog && 
                        <ul className='text-left'>
                            {
                                productIsbn.map((proditem, index) => (
                                    <li key={index}>{proditem.title} {proditem.isbn}</li>
                                ))
                                
                            }
                        </ul>   
                    }
            </div>    
        </Dialog>
    </>
   )
}
