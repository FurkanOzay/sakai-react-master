import React, { useEffect, useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { InputNumber } from "primereact/inputnumber";
import { Image } from "primereact/image";
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { Toast } from 'primereact/toast';


const DialogDemo = () => {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');


    const [products, setProducts] = useState([]);
    const [selectedProducts7, setSelectedProducts7] = useState(null);


    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
        'displayModal': setDisplayModal,
        'displayMaximizable': setDisplayMaximizable,
        'displayPosition': setDisplayPosition,
        'displayResponsive': setDisplayResponsive
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button style={{backgroundColor:'blue', color:'white'}} label="Vazgeç" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button style={{backgroundColor:'red', color:'white'}} label="Sil" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }
    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }

    const [kitaplar, setKitaplar] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/kitaps")
            .then((response) => response.json())
            .then((response) => setKitaplar(response));
    }, []);

    

    const add = () => {

    }

    return (
        <div className="dialog-demo">
                <Button style={{backgroundColor:'red'}} label="Kitap Sil" icon="pi pi-external-link" onClick={() => onClick('displayMaximizable')} />
                
                <Dialog header="Düzenle" visible={displayMaximizable} maximizable modal style={{ width: '50vw' }} footer={renderFooter('displayMaximizable')} onHide={() => onHide('displayMaximizable')}>
                    
                <div>
                <h6>Silmek İstediğiniz Kitabı Seçiniz</h6>
                <DataTable value={kitaplar} selection={selectedProducts7} onSelectionChange={e => setSelectedProducts7(e.value)} dataKey="id" responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
                    <Column field="id" header="ID"></Column>
                    <Column field="kitap_adi" header="Kitap Adı"></Column>
                    <Column field="kitap_sayfa" header="Sayfa Sayısı"></Column>
                    <Column field="kitap_kategori" header="Kategori"></Column>
                    <Column field="kitap_resim_url" header="Resim"></Column>
                    <Column field="yazar" header="Yazar"></Column>
                </DataTable>
            </div>

                </Dialog>

            </div>
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(DialogDemo);