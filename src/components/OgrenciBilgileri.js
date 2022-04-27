
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';


const DataTableCrudDemo = () => {


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    useEffect(() => {
        fetch("http://localhost:8080/apio/ogrencis")
            .then((response) => response.json())
            .then((response) => setOgrenciler(response));
    }, []);

    let emptyOgrenci = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };
    const [ogrenciler, setOgrenciler] = useState([]);
    const [ogrenciDialog, setOgrenciDialog] = useState(false);
    const [deleteOgrenciDialog, setDeleteOgrenciDialog] = useState(false);
    const [deleteOgrencilerDialog, setDeleteOgrencilerDialog] = useState(false);
    const [ogrenci, setOgrenci] = useState(emptyOgrenci);
    const [selectedOgrenciler, setSelectedOgrenciler] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);


    const openNew = () => {
        setOgrenci(emptyOgrenci);
        setSubmitted(false);
        setOgrenciDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setOgrenciDialog(false);
    }

    const hideDeleteOgrenciDialog = () => {
        setDeleteOgrenciDialog(false);
    }

    const hideDeleteOgrencilerDialog = () => {
        setDeleteOgrencilerDialog(false);
    }


    const confirmDeleteOgrenci = (ogrenci) => {
        setOgrenci(ogrenci);
        setDeleteOgrenciDialog(true);
    }

    const deleteOgrenci = () => {
        let _ogrenciler = ogrenciler.filter(val => val.id !== ogrenci.ogr_id);
        setOgrenciler(_ogrenciler);
        setDeleteOgrenciDialog(false);
        setOgrenci(emptyOgrenci);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < ogrenciler.length; i++) {
            if (ogrenciler[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }


    const confirmDeleteSelected = () => {
        setDeleteOgrencilerDialog(true);
    }

    const deleteSelectedOgrenciler = () => {
        let _ogrenciler = ogrenciler.filter(val => !selectedOgrenciler.includes(val));
        setOgrenciler(_ogrenciler);
        setDeleteOgrencilerDialog(false);
        setSelectedOgrenciler(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _ogrenci = {...ogrenciler};
        _ogrenci['category'] = e.value;
        setOgrenci(_ogrenci);
    }

    const onInputChange = (e, ogr_ad_soyad) => {
        const val = (e.target && e.target.value) || '';
        let _ogrenci = {...ogrenci};
        _ogrenci[`${ogr_ad_soyad}`] = val;

        setOgrenci(_ogrenci);
    }

    const onInputNumberChange = (e, ogr_ad_soyad) => {
        const val = e.value || 0;
        let _ogrenci = {...ogrenci};
        _ogrenci[`${ogr_ad_soyad}`] = val;

        setOgrenci(_ogrenci);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedOgrenciler || !selectedOgrenciler.length} />
            </React.Fragment>
        )
    }




    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }



    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Öğrenci Yönetimi</h5>
            <br/>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Arama..." />
            </span>
        </div>
    );
    const ogrenciDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            {/* <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveOgrenci} /> */}
        </React.Fragment>
    );
    const deleteOgrenciDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteOgrenciDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteOgrenci} />
        </React.Fragment>
    );
    const deleteOgrencilerDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteOgrencilerDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedOgrenciler} />
        </React.Fragment>
    );

    const editOgrenci = (ogrenci) => {
        setOgrenci({...ogrenci});
        setOgrenciDialog(true);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editOgrenci(rowData)} />
            </React.Fragment>
        );
    }

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">

                <DataTable ref={dt} value={ogrenciler} selection={selectedOgrenciler} onSelectionChange={(e) => setSelectedOgrenciler(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="{totalRecords} öğrenciden {first} ile {last} arasındakiler gösteriliyor"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column  headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="ogr_id" header="ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="ogr_no" header="Numara" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="ogr_ad_soyad" header="Ad Soyad" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="ogr_bolum" header="Bölüm" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="ogr_sinif" header="Sınıf" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="kitap_sayisi" header="Kitap Sayısı" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={ogrenciDialog} style={{ width: '450px' }} header="Kayıtlı Kitaplar" modal className="p-fluid" footer={ogrenciDialogFooter} onHide={hideDialog}>
                <div className="formgrid">
                    <div className="field">
                            <label htmlFor="ogr_ad_soyad">Ad Soyad</label>
                            <InputText id="kitap_resim_url" type="text" value={ogrenci.ogr_ad_soyad} onChange={(e) => onInputChange(e, 'description')} />
                    </div>
                    <div className="field">
                            <label htmlFor="ogr_ad_soyad">Kitaplar</label>
                            {/* <InputText id="kitap_resim_url" type="text" value={ogrenci.ogr_ad_soyad} onChange={(e) => onInputChange(e, 'description')} /> */}
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteOgrenciDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteOgrenciDialogFooter} onHide={hideDeleteOgrenciDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {ogrenci && <span>Are you sure you want to delete <b>{ogrenci.ogr_ad_soyad}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteOgrencilerDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteOgrencilerDialogFooter} onHide={hideDeleteOgrencilerDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {ogrenci && <span>Silmek istediğinizden emin misiniz?</span>}
                </div>
            </Dialog>
        </div>
    );
}
                 
export default React.memo(DataTableCrudDemo);
