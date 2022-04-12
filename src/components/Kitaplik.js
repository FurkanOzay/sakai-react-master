import { useRef } from 'react';
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { InputNumber } from "primereact/inputnumber";
import { Image } from "primereact/image";
import { FileUpload } from 'primereact/fileupload';


const FormLayoutDemo = () => {
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

    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }
    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Kitap Bilgileri</h5>

                    <div className="field">
                        <label htmlFor="kitapAdi">Kitap Adı</label>
                        <InputText id="kitapAdi" type="text" />
                    </div>

                    <div className="field">
                        <label>Kitap Kategorisi</label>
                        <SelectButton value={selectButtonValue1} onChange={(e) => setSelectButtonValue1(e.value)} options={selectButtonValues1} optionLabel="name" />
                    </div>

                    <div className="field">
                        <h5>Sayfa Sayısı</h5>
                        <InputNumber value={inputNumberValue} onValueChange={(e) => setInputNumberValue(e.value)} showButtons mode="decimal"></InputNumber>
                    </div>

                    <div className="field">
                        <label htmlFor="ozetMetin">Özet Metin</label>
                        <InputTextarea id="ozetMetin" autoResize rows="10" cols="0" />
                    </div>
                </div>
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
        
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};



export default React.memo(FormLayoutDemo, comparisonFn);
