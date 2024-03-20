import React, { useState, useEffect }  from 'react'
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { DataView} from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useAjax } from '../hooks/useAjax';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useAjaxGet } from '../hooks/useAjaxGet';

export const Sales = () => {

    const [ajaxUrl, SetAjaxUrl] = useState(process.env.REACT_APP_API + "/search-books");
    const { databook , loading, error, postData, putData, deleteData } = useAjax(ajaxUrl);

    const [products, setProducts] = useState({});

    const {getData, get} = useAjaxGet(ajaxUrl + "/",products);

   
    const [filtro, setFiltro] = useState('');
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const [sortKey, setSortKey] = useState('');
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
    ];

    useEffect(() => {
        if (getData != null){
            // Lógica para filtrar productos cuando cambia el filtro.
            let regex = new RegExp(`^${filtro}`, 'i');
            let approved = getData.filter(product => regex.test(product.title));
            setProductosFiltrados(approved);
        }
    }, [filtro, getData]); 

    const stockConvert = (value) => {
        let stockObj = {};
        if (value >= 50){
            stockObj.valueStr = "IN STOCK";
            stockObj.severity = "success";
        }
        else if(value > 1){
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

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const headerT = (options) => {
        const className = `${options.className} justify-content-space-between`;
        return (
            <div className={className} >
                <div className="flex align-items-center gap-2">
                        <Dropdown options={sortOptions} value={sortKey}   optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="flex justify-start w-full sm:w-14rem" />             
                    <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                        <InputText type="search"  onChange={(e) => setFiltro(e.target.value)}  placeholder="Search Title..." />
                    </span>
                </div>
            </div>
        )
    };

    const cargarImagAlternativa = (product) => {
        let imagen;
    
        if (!product.categories && !product.imagen) {
            imagen = require('../images/noimage.png');
        } else {
            imagen = product.categories 
                ? (product.imagen 
                    ? process.env.REACT_APP_API + "/images/" + product.imagen 
                    : require('../images/' + product.categories + '.png'))
                : process.env.REACT_APP_API + "/images/" + product.imagen;
        }
    
        return imagen;
    
       }

    const itemTemplate = (product) => {
        return(
            <>     
                <div className="col-12">
                    <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img 
                        className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" 
                        src={cargarImagAlternativa(product)}
                    />
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{product.title}</div>
                                <Rating value={product.rating} readOnly cancel={false}></Rating>
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <i className="pi pi-tag"></i>
                                        <span className="font-semibold">{product.categories}</span>
                                    </span>
                                    {stockBodyTemplate(product)}
                                </div>
                            </div>
                
                        </div>
                    </div>
                </div>
                
            </>
        )
    }

    return(
        <div>
        <Panel headerTemplate={headerT}>
            <div className='grid'>
                <div className="col-12" >
                    <DataView value={productosFiltrados} itemTemplate={itemTemplate} paginator rows={3} sortField={sortField} sortOrder={sortOrder}/>
                </div>
            </div>
        </Panel>
    </div>
    )
}