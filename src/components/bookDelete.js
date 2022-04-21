import React, { useEffect, useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from "primereact/toast";


const DialogDemo = () => {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');

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



    const toCapitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const isSelectable = (value, field) => {
        let isSelectable = true;
        switch (field) {
            case 'quantity':
                isSelectable = value > 10;
                break;
            case 'name':
            case 'category':
                isSelectable = value.startsWith('B') || value.startsWith('A');
                break;

            default:
                break;
        }
        return isSelectable;
    }

    const isRowSelectable = (event) => {
        const data = event.data;
        return isSelectable(data.quantity, 'quantity');
    }

    const isCellSelectable = (event) => {
        const data = event.data;
        return isSelectable(data.value, data.field);
    }

    const rowClassName = (data) => {
        return isSelectable(data.quantity, 'quantity') ? '' : 'p-disabled';
    }

    const cellClassName = (value, options) => {
        const { field } = options.column.props;
        return isSelectable(value, field) ? '' : 'p-disabled';
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button style={{ backgroundColor: 'blue', color: 'white' }} label="Vazgeç" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button style={{ backgroundColor: 'red', color: 'white' }} label="Sil" onClick={() => click(selectedBooks) + onHide(name)} icon="pi pi-check" autoFocus />
            </div>
        );
    }

    const [selectedBooks, setSelectedBooks] = useState(null);
    const toastRef = useRef();
    const [kitaplar, setKitaplar] = useState([]);


    useEffect(() => {
        fetch("http://localhost:8080/api/kitaps")
            .then((response) => response.json())
            .then((response) => setKitaplar(response));
    }, []);

    const click = (selectedBooks) => {
        
       console.log("Kitap Id: " , selectedBooks.id);
        
       fetch('http://localhost:8080/api/delete', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(selectedBooks)
    }).then(() => {
        if(selectedBooks.id) {
            toastRef.current.show({severity: 'info', summary: 'Başarılı', detail: selectedBooks.id + " silindi"});
        }else{
            toastRef.current.show({severity: 'error', summary: 'Hata!', detail: "Silinme işlemi başarısız"});
        }
    })


    }   
    return (
        
        <div className="dialog-demo">
            <Toast ref={toastRef} />
            <Button style={{ backgroundColor: 'red' }} label="Kitap Sil" icon="pi pi-external-link" onClick={() => onClick('displayMaximizable')} />

            <Dialog header="Düzenle" visible={displayMaximizable} maximizable modal style={{ width: '50vw' }} footer={renderFooter('displayMaximizable')} onHide={() => onHide('displayMaximizable')}>

                <div>
                <h6>RadioButton-Only Selection</h6>
                <DataTable value={kitaplar} selectionMode="radiobutton" selection={selectedBooks} onSelectionChange={e => setSelectedBooks(e.value)} dataKey="id" responsiveLayout="scroll">
                    <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
                    <Column field="id" header="Id"></Column>
                    <Column field="kitap_adi" header="Kitap Adı"></Column>
                    <Column field="kitap_kategori" header="Kategori"></Column>
                    <Column field="kitap_sayfa" header="Sayfa"></Column>
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