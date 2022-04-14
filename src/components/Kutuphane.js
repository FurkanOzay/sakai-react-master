import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useRef } from 'react';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { InputNumber } from "primereact/inputnumber";
import { Image } from "primereact/image";
import { FileUpload } from 'primereact/fileupload';

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

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Hayır" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Evet" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }

   

    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }

    const [selectButtonValue1, setSelectButtonValue1] = useState(null);
    const [selectButtonValue2, setSelectButtonValue2] = useState(null);
    const [inputNumberValue, setInputNumberValue] = useState(null);

    const selectButtonValues1 = [
        { name: "Roman", code: "O1" },
        { name: "Felsefe", code: "O2" },
        { name: "Sanat", code: "O3" },
        { name: "Din", code: "O3" },
        { name: "Bilim", code: "O3" },
    ];

    const [kitapAdi, setkitapAdi] = useState("");
    const [kitapSayfa, setkitapSayfa] = useState("");
    const [yazar, setYazar] = useState("");

    

    const add = () => {

    }

    return (
        <div className="dialog-demo">
                <Button label="Kitap Ekle" icon="pi pi-external-link" onClick={() => onClick('displayMaximizable')} />
                
                <Dialog header="Header" visible={displayMaximizable} maximizable modal style={{ width: '50vw' }} footer={renderFooter('displayMaximizable')} onHide={() => onHide('displayMaximizable')}>
                    
                <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Kitap Bilgileri</h5>

                    <div className="field">
                        <label htmlFor="kitapAdi">Kitap Adı</label>
                        <InputText id="kitapAdi" type="text" value={kitapAdi} onChange={e => setkitapAdi(e.target.value)}/>
                    </div>

                    <div className="field">
                        <label>Kitap Kategorisi</label>
                        <SelectButton value={selectButtonValue1} onChange={(e) => setSelectButtonValue1(e.value)} options={selectButtonValues1} optionLabel="name" />
                    </div>

                    <div className="field">
                        <label>Sayfa Sayısı</label>
                        <InputNumber value={inputNumberValue} onValueChange={(e) => setInputNumberValue(e.value)} showButtons mode="decimal"></InputNumber>
                    </div>

                    <div className="field">
                        <label>Yazar</label>
                        <InputText id="yazar" type="text" value={yazar} onChange={e => setYazar(e.target.value)}/>
                    </div>

                    

                </div>
                <Button  label="Ekle" icon="pi pi-check" />
            </div>

            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Resim Yükle</h5>
                    <div className="flex justify-content-center">
                        <Image className='mb-5' src="https://via.placeholder.com/250" alt="galleria" width={250} preview />
                    </div>
                    <FileUpload name="demo[]" url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} chooseLabel="Seç" uploadLabel='Yükle' cancelLabel='Vazgeç' />
                </div>   
            </div>
        </div>

                </Dialog>

            </div>
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(DialogDemo);