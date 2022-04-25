import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";



const DialogDemo = () => {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState("center");

    const dialogFuncMap = {
        displayBasic: setDisplayBasic,
        displayBasic2: setDisplayBasic2,
        displayModal: setDisplayModal,
        displayMaximizable: setDisplayMaximizable,
        displayPosition: setDisplayPosition,
        displayResponsive: setDisplayResponsive,
    };

    const onClick = (name, position) => {
        console.log("Açıldı");
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    };

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        console.log("Kapandı")
    };

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Vazgeç" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Ekle" icon="pi pi-check" onClick={() => add() + onHide(name)} autoFocus />
            </div>
        );
    };

    const toastRef = useRef();
    const [ogr_no, setOgrNo] = useState("");
    const [ogr_ad_soyad, setOgrAdSoyad] = useState("");
    const [ogr_bolum, setOgrBolum] = useState("");
    const [ogr_sinif, setOgrSinif] = useState("");

    const add = (e) => {
        const ogrenci = {ogr_no, ogr_ad_soyad,ogr_bolum, ogr_sinif};
        fetch('http://localhost:8080/apio/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(ogrenci)
        }).then(() => {
            if(ogr_ad_soyad) {
                toastRef.current.show({severity: 'info', summary: 'Başarılı', detail: ogr_ad_soyad + " eklendi"});
            }else{
                toastRef.current.show({severity: 'error', summary: 'Hata!', detail: "Ekleme işlemi başarısız"});
            }
        })
    };


    

    return (
        <div className="dialog-demo">
            <Toast ref={toastRef} />
            <Button label="Öğrenci Ekle" icon="pi pi-external-link" onClick={() => onClick("displayMaximizable")} />
            <Dialog visible={displayMaximizable} maximizable modal style={{ width: "50vw" }} footer={renderFooter("displayMaximizable")} onHide={() => onHide("displayMaximizable")}>
                <div className="col-12 md:col-12">
                    <div className="p-fluid">
                        <h5>Kitap Bilgileri</h5>

                        <div className="field">
                            <label htmlFor="ogr_no">Öğrenci Numarası</label>
                            <InputText id="ogr_no" type="text" value={ogr_no} onChange={(e) => setOgrNo(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="ogr_ad_soyad">Öğrenci Ad Soyad</label>
                            <InputText value={ogr_ad_soyad} onChange={(e) => setOgrAdSoyad(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="ogr_bolum">Öğrenci Bölüm</label>
                            <InputText id="ogr_bolum" type="text" value={ogr_bolum} onChange={(e) => setOgrBolum(e.target.value)} />
                        </div>
                        <div className="field">
                            <label>Öğrenci Sınıf</label>
                            <InputNumber value={ogr_sinif} onValueChange={(e) => setOgrSinif(e.value)} showButtons mode="decimal"></InputNumber>
                        </div>

                    </div>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(DialogDemo);
