import React, { useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { useAjax } from '../hooks/useAjax';
import { Dropdown } from 'primereact/dropdown';
import { Imagen } from './Imagen';
import { DialogMsj } from './DialogMsj';
import uuid from 'react-uuid'

export const FileTable = ( data ) => {
    let emptyProduct = {
       _id: '',
       title: '',
       isbn: '',
       pageCount: 0,
       publishedDate: new Date().toLocaleDateString('en-US'),
       shortDescription: '',
       authors: [],
       categories: '' ,
       rating: 0,
       stock: 0,
       price: 0,
       imagen: ''

    };

    let emptyErrorInput = {
        title: false,
        isbn: {
            vacio: false,
            existe: false,
        }
    }
    const categoryProduct = [
        "Programming",
        "Novel",
        "Travel",
        "Cook",
        "Education",
        "Health",
        "Terror",
        "Miscellaneous"
    ];

    const [ajaxUrl, SetAjaxUrl] = useState('');
    const { databook , loading, error, postData, putData, deleteData } = useAjax(ajaxUrl);

    const initialData = data.data;
   
    const [products, setProducts] = useState(initialData);

    const [expandedRows, setExpandedRows] = useState(null);

    const [product, setProduct] = useState(emptyProduct);

    const [productDialog, setProductDialog] = useState(false);

    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [isbnProductDialog, setIsbnProductDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
  
    const [dialogType, setDialogType] = useState(null);
    const [modifiedProduct, setModifiedProduct] = useState({})

    const [modifyProductDialog, setmodifyProductDialog] = useState(false);

   
    const [errorInputs, setErrorInputs] = useState(emptyErrorInput);
    const [productIsbn, setProductIsbn] = useState();

    // Estado para pasar nombre del archivo
    const [fileImagen, setFileImagen] = useState('');

    const toast = useRef(null);
    const dt = useRef(null);
    const ref = useRef(null);

    useEffect(() => {
        setProducts(initialData);
        setSelectedProducts(null);
    }, [initialData]); 

    const allowExpansion = () => {
        return true;
    };

    const crearArchivo = (name) =>{
        let archObj = {};

        if ( name != '' ){
            archObj = {
                objectURL: process.env.REACT_APP_API + "/images/" + name,
                name: name,
            }
        }
        else{
            archObj = null;
        }
        return archObj;
    } 

    const handleChildTextChange = (newText) => {    
        console.log("ontext change de la imagen, argumento: ", newText);
        if(dialogType == 'add'){
            let _product = { ...product };
            _product.imagen = newText;
            console.log("_product" , _product)
            setProduct(_product);
        }
        else{
            let _modifiedProduct = {...modifiedProduct};
            _modifiedProduct.imagen = newText;
            setModifiedProduct(_modifiedProduct);
        }
    
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div>
                <ul>
                    <li>
                        <strong>Short Description :</strong>  {data.shortDescription}
                    </li>
                    <li>
                        <strong>Page Count :</strong>  {data.pageCount}
                    </li>
                    <li>
                        <strong>Categories :</strong>  {data.categories}
                    </li>
                    <li>
                        <strong>Published :</strong>  {(new Date(data.publishedDate)).toLocaleDateString('en-US')}
                    </li>
                    <li>
                        <strong>Price :</strong>  {data.price}
                    </li>
                </ul>    
            </div>
        );
    };

    const authorsBodyTemplate = (data) => {
        return data.authors.join(', ');
    };

    const ratingBodyTemplate = (data) => {
        return <Rating value={data.rating} readOnly cancel={false} />;
    };

    const stockConvert = (value) => {
        let stockObj = {};
        if (value >= 50){
            stockObj.valueStr = "IN STOCK";
            stockObj.severity = "success";
        }
        else if(value >= 1){
            stockObj.valueStr = "LOW STOCK";
            stockObj.severity = "warning";
        }
        else{
            stockObj.valueStr = "OUT OF STOCK";
            stockObj.severity = "danger"
        }
        return stockObj; 
    }

    const stockBodyTemplate = (data) => {
        let {valueStr, severity} = stockConvert(data.stock);
        return <Tag value={valueStr} severity={severity}></Tag>;
    }

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
        setDialogType('add');
        SetAjaxUrl(process.env.REACT_APP_API + '/add-book');
    };

    const modifySelected = () =>{
        if (selectedProducts.length > 1){
            setmodifyProductDialog(true);
        }
        else{
            setProductDialog(true); 
            setDialogType('modify');
            setModifiedProduct(selectedProducts[0]);
            SetAjaxUrl(process.env.REACT_APP_API + "/edit-book");
        }
    }

    const hideModifyProductsDialog = () => {
        setmodifyProductDialog(false);
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
        SetAjaxUrl(process.env.REACT_APP_API + "/delete-books");
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
                <Button label="Update" icon="pi pi-refresh" severity="info" onClick={modifySelected} disabled={!selectedProducts || !selectedProducts.length}/>
            </div>
        );
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const hideDialog = () => {
        setErrorInputs(emptyErrorInput);
        setSubmitted(false);
        setProductDialog(false);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';

        if (dialogType === 'modify'){
            let _modifiedProduct = { ...modifiedProduct };
            _modifiedProduct[`${name}`] = val;

            setModifiedProduct(_modifiedProduct);

            setErrorInputs({
                ...errorInputs,
                [name]: false,
           })
        
        }
        else{
           setErrorInputs({
                ...errorInputs,
                [name]: false,
           })
           
            let _product = { ...product };

            _product[`${name}`] = val;

            setProduct(_product);
        }
     
    };

    const onInputArrayChange = (e, name) => {
        const val = (e.target && e.target.value) || '';

        if(dialogType === 'modify'){
            let _modifiedProduct = {...modifiedProduct};

            _modifiedProduct[name] = val.split(',');

            setModifiedProduct(_modifiedProduct);
        }
        else{
          
            let _product = { ...product };

            _product[name] = val.split(',');
        
            setProduct(_product);
        }
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
    
        if(dialogType === 'modify'){
            let _modifiedProduct = { ...modifiedProduct };

            _modifiedProduct[`${name}`] = val;

            setModifiedProduct(_modifiedProduct);
        }
        else{
            let _product = { ...product };

            _product[`${name}`] = val;

            setProduct(_product);
        }
    };

    const onDateChange = (e, name) => {
        const val = e.value;
        if(dialogType === 'modify'){
            let _modifiedProduct = { ...modifiedProduct };

            _modifiedProduct[`${name}`] = val;
            console.log("valor calendario " , val);

            setModifiedProduct(_modifiedProduct);
        }
        else{

            let _product = { ...product };

            _product[`${name}`] = val;

            setProduct(_product);
        }
    };

    const validarCamposVacios = (_product) => {
       
        if((_product.title === '')){
            setErrorInputs(prevState => ({
                ...prevState,
                title: true,
            })); 
        }

        if((_product.isbn === '')){
            setErrorInputs(prevState => ({
                ...prevState,
                isbn: {
                    ...prevState.isbn,
                    vacio: true,
                },
            }));
        }

        if((_product.title === '') || (_product.isbn === '') ){
            return false;
        }
        else {
            return true;
        }

    }

    const saveProduct = async(operacion) => {
        setSubmitted(true);
        let result = false;
        let _products = [...products];
        let _product = { ...product };
        if (operacion === 'add'){
            const newProdUuid = uuid();
            _product._id = newProdUuid;
        
            result = validarCamposVacios(_product);
            
            if (result){
                _products.push(_product);
                 ref.current.upload();   
                let resultadoPost = await postData(_product);
                if(resultadoPost.message == 'SERVER: Repetido'){
                    setIsbnProductDialog(true);
                    setProductIsbn(resultadoPost.objetoResult);
                }
                else{
                    setProducts(_products);
                    setProductDialog(false);
                    setProduct(emptyProduct);
                    setSelectedProducts(null);
                }
            }
        }else
        {
            result = validarCamposVacios(modifiedProduct);
            if(result){
                let resultadoPut = await putData(modifiedProduct);
               
                if(resultadoPut.message == 'SERVER: Repetido'){
                    console.log("Esta repetido");
                    setIsbnProductDialog(true);
                    console.log("RESULTADO", resultadoPut.objetoResult)
                    setProductIsbn(resultadoPut.objetoResult);
                }
                else{
                 
                    setProducts((_products) => _products.map(obj => (obj._id === modifiedProduct._id ? modifiedProduct : obj)));   
                    setProductDialog(false);
                    setProduct(emptyProduct);
                    setSelectedProducts(null);
                }   
            } 
        }
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const deleteSelectedProducts = async () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));

        await deleteData(selectedProducts);
        
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        if(!loading){
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Erased Book', life: 3000 });
        }   
    };

    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    const productDialogFooter = (       
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save"  icon="pi pi-check" onClick={() => saveProduct(dialogType)} />

        </React.Fragment>
    );

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Table Books</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const headerDialogDelete = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-start">
            <i className="pi pi-exclamation-triangle mr-3"  style={{ fontSize: '1.5rem' }} />
            <span className="font-bold white-space-nowrap">Confirm Delete</span>
        </div>
    );


    function convertirFormatoFecha(fechaISO) {
        const fecha = new Date(fechaISO);
        return fecha;
    }
 
    const footer = `In total there are ${products ? products.length : 0} products.`;
    return (
        <div>
            <Toast ref={toast} />
           
            <div className="card">
           
            <Toolbar className="mb-3" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
          
                <DataTable ref={dt} value={products} emptyMessage=' ' editMode="cell" selectionMode="single" footer={footer} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    showGridlines paginator rows={5} scrollable scrollHeight="400px" rowsPerPageOptions={[5, 10, 25, 50]}
                    expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}
                    globalFilter={globalFilter} header={header}
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column expander={allowExpansion} style={{ width: '5rem' }} />
                    <Column field="title" header="Title" sortable filter filterPlaceholder="Search" style={{ width: '30rem' }}></Column>
                    <Column field="isbn" header="ISBN" ></Column>
                    <Column field="authors" header="Authors" body={authorsBodyTemplate} ></Column>
                    <Column field="stock" header="Stock" body={stockBodyTemplate} ></Column>
                    <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
                </DataTable>
             
            </div>

            <Dialog visible={productDialog} style={{ width: '42rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Book Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="title" className="font-bold">
                            Title
                        </label>

                        <InputText id="title" required className={errorInputs.title ? 'input-error' : ''} value = {(dialogType === 'add') ? product.title : modifiedProduct.title}  placeholder='Title' onChange={(e) => onInputChange(e, 'title')} />
                        {errorInputs.title && <div className="error-message">This field can not be blank</div>}
                    </div>
                    <div className="field col">
                        <label htmlFor="isbn" className="font-bold">
                            ISBN
                        </label>
                        <InputText id="isbn" required value = {(dialogType === 'add') ? product.isbn : modifiedProduct.isbn} placeholder= 'ISBN' onChange={(e) => onInputChange(e, 'isbn')} />
                        {errorInputs.isbn.vacio && (
                        <div className="error-message">This field cannot be blank</div>
                        )}

                        {errorInputs.isbn.existe && (
                        <div className="error-message">This field {product.isbn} already exists</div>
                        )}
                       
                    </div>
                    <div className="field col">
                        <label htmlFor="author"  className="font-bold">
                            Author
                        </label>
                        <InputText id="author" value = {(dialogType === 'add') ? product.authors : modifiedProduct.authors} placeholder= 'Authors 1, Authors 2' onChange={(e) => onInputArrayChange(e, 'authors')} />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="stock" className="font-bold">
                            Stock
                        </label>
                        <InputNumber id="stock"  value = {(dialogType === 'add') ? product.stock : modifiedProduct.stock} onValueChange={(e) => onInputNumberChange(e, 'stock')} min={0} mode="decimal" />
                    </div>
                    <div className="field col">
                        <label htmlFor="pages" className="font-bold">
                            Pages
                        </label>
                        <InputNumber id="pages" value = {(dialogType === 'add') ? product.pageCount : modifiedProduct.pageCount} onValueChange={(e) => onInputNumberChange(e, 'pageCount')} min={1}/>
                    </div>
                    <div className="field col">
                        <label  className="font-bold block mb-2">
                            Published
                        </label>
                        <Calendar id="buttondisplay" value = {(dialogType === 'add') ? (product.publishedDate) : convertirFormatoFecha(modifiedProduct.publishedDate)} onChange={(e) => onDateChange(e, 'publishedDate')} showIcon />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label  className="font-bold">
                            Category
                        </label>
                        <Dropdown id="categories" value={(dialogType === 'add') ? (product.categories) : (modifiedProduct.categories)} onChange={(e) => onInputChange(e, 'categories')} options={categoryProduct} 
                        placeholder= "Select a Category" />
                    </div>
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" min={0} value = {(dialogType === 'add') ? product.price : modifiedProduct.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="decimal" />
                    </div>
                    <div className="field col">
                        <label htmlFor="rating" className="font-bold">
                            Rating
                        </label>
                        <InputNumber id="rating"  value = {(dialogType === 'add') ? product.rating : modifiedProduct.rating} onValueChange={(e) => onInputNumberChange(e, 'rating')} min={0} max={5} placeholder='1-5'  mode="decimal" />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Short Description
                    </label>
                    <InputTextarea id="description"  value = {(dialogType === 'add') ? product.shortDescription : modifiedProduct.shortDescription} placeholder= "Short Description" onChange={(e) => onInputChange(e, 'shortDescription')} required rows={3} cols={20} />
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label  className="font-bold">
                            Image
                        </label>
                           <Imagen ref={ref} onTextChange={handleChildTextChange} fileProd = {(dialogType === 'add') ? null : crearArchivo(modifiedProduct.imagen)}  />
                    </div>
                </div> 

            </Dialog>

            <Dialog visible={modifyProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Error" modal onHide={hideModifyProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                           You can not edit more than one product at a time. 
                        </span>
                    )}
                </div>
            </Dialog>

            <DialogMsj isbnProductDialog = {isbnProductDialog} setIsbnProductDialog = {setIsbnProductDialog} setProductIsbn = {setProductIsbn} productIsbn={productIsbn} />


            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header={headerDialogDelete} modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                   {deleteProductsDialog && <span>Are you sure you want to delete the folowwing {selectedProducts.length}  {selectedProducts.length > 1 ? ('products') : ('product')} :</span>}
                   <p></p>
                   {deleteProductsDialog && 
                   (
                        <ul className='text-left'>
                        {
                            selectedProducts.map((proditem, index) => (
                            <li key={index}>{proditem.title}</li>
                            ))
                        }
                        </ul>
                    )}
                </div>
            </Dialog>
                    
        </div>
    );
}
        