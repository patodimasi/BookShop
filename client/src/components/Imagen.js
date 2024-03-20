import React, { useRef, useState, forwardRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';

export const Imagen = forwardRef(function Imagen(props, ref) {
    const { fileProd } = props;
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const [text, setText] = useState('');
    
    useEffect(() => {
        if(fileProd != null){
            ref.current.setFiles([fileProd]);
        }

    }, []); 
    
    const fileUploadRef = useRef(null);
      //muestra el dialogo de validacion del archivo
    const [imageDialog, setImageDialog] = useState(false);
    
    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);


        let archivo = files[0].name;
        let archivo_split = archivo.split("\.");
        let extension = archivo_split[1];
       
        if (extension != "png" && extension != "jpg" &&
        extension != "jpeg" && extension != "gif") {
            setImageDialog(true);
            e.files.splice(0, 1);
        }
        else{
            console.log("El archivo es aceptado")
            setText(archivo);
            // Llamamos a la función de devolución de llamada pasada desde el padre
            props.onTextChange(archivo);
     
        }
    
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
      
        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
            </div>
        );
        
    };
  
    const itemTemplate = (file, props) => {     
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '70%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        <small><strong>Image name: {file.name}</strong></small>
                        <small><strong>Date: {new Date().toLocaleDateString()}</strong></small>
                    </span>
                </div>
                <Button type="button" icon="pi pi-times" style={{width:'47px'}} className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
          
        );
    };

    const onTemplateUpload = (e) => {
        let res = {};
        res.status = e.xhr.status;
        res.message = JSON.parse(e.xhr.response).message;
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const headerDialogImage = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-start">
            <i className="pi pi-times-circle"  style={{ fontSize: '1.5rem' ,color: 'red' }} />
            <span className="font-bold white-space-nowrap">Error loading image</span>
        </div>
    );

    return (
        <div>
            <Toast ref={toast}></Toast>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <FileUpload ref={ref}  name="file" onUpload={onTemplateUpload} url={process.env.REACT_APP_API + '/api/upload'} multiple accept="image/*" maxFileSize={1000000}
                onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
            />

            <Dialog header={headerDialogImage} visible={imageDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} onHide={() => setImageDialog(false)}>
                <div className="confirmation-content">
                    The image must be an image file with the following extensions (.jpg / .png / .gif / .jpeg)
                </div>   
            </Dialog>
        </div>
    )
});