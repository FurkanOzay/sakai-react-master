import React, { useEffect, useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { InputTextarea } from 'primereact/inputtextarea';


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
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    };

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    };

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Vazgeç" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Güncelle " icon="pi pi-check" onClick={() => update() + onHide(name)} autoFocus />
            </div>
        );
    };

    


    const [ogrenciler, setOgrenciler] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/apio/ogrencis", {
            method: 'GET',
            header: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then((response) => response.json())
            .then((response) => setOgrenciler(response));
    }, []);

    const [ogr_id, setOgrId] = useState("")
    const [ogr_no, setOgrNo] = useState("");
    const [ogr_ad_soyad, setOgrAdSoyad] = useState("");
    const [ogr_bolum, setOgrBolum] = useState("");
    const [ogr_sinif, setOgrSinif] = useState("");

    
    const [selectedStudents, setSelectedStudents] = useState(null);

    
    const onCityChange = (e) => {
        setSelectedStudents(e.value);
        setOgrId(e.target.value.ogr_id);
        setOgrNo(e.target.value.ogr_no)
        setOgrAdSoyad(e.target.value.ogr_ad_soyad)
        setOgrBolum(e.target.value.ogr_bolum)
        setOgrSinif(e.target.value.ogr_sinif)
    }

const update = (e) => {
        const ogrenci = {ogr_id, ogr_no, ogr_ad_soyad,ogr_bolum,ogr_sinif};
        fetch(`http://localhost:8080/apio/update/`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(ogrenci)
        }).then(() => {
            if(ogr_id) {
                toastRef.current.show({severity: 'info', summary: 'Başarılı', detail: ogr_ad_soyad + " güncellendi"});
            }else{
                toastRef.current.show({severity: 'error', summary: 'Hata!', detail: "Güncelleme işlemi başarısız"});
            }
        }).then(() => {
           
        })

    };
    
const toastRef = useRef();




    return (
        <div className="dialog-demo">
            <Toast ref={toastRef} />
            <Button style={{ backgroundColor: "orange" }} label="Öğrenci Düzenle" icon="pi pi-external-link" onClick={() => onClick("displayMaximizable")} />
            <Dialog header="Düzenle" visible={displayMaximizable} maximizable modal style={{ width: "50vw" }} footer={renderFooter("displayMaximizable")} onHide={() => onHide("displayMaximizable")}>
                <Dropdown style={{width:'100%'}}  value={selectedStudents} options={ogrenciler}  onChange={onCityChange} optionLabel="ogr_ad_soyad" placeholder="Lütfen Bir Öğrenci Seçiniz" />
                <div className="col-12 md:col-12">
                    <div className="p-fluid">
                        <h5>Kitap Bilgileri</h5>


                        <div className="field">
                            <label htmlFor="id">ID</label>
                            <InputText id="ogr_id" type="text" value={ogr_id} onChange={(e) => setOgrId(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="ogr_no">Öğrenci Numarası</label>
                            <InputText id="ogr_no" type="text" value={ogr_no} onChange={(e) => setOgrNo(e.target.value)} />
                        </div>

                        <div className="field">
                            <label htmlFor="ogr_ad_soyad">Öğrenci Ad Soyad</label>
                            <InputText id="ogr_ad_soyad" type="text" value={ogr_ad_soyad} onChange={(e) => setOgrAdSoyad(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="ogr_bolum">Öğrenci Bölüm</label>
                            <InputText  value={ogr_bolum} onChange={(e) => setOgrBolum(e.target.value)}  />
                        </div>
                        <div className="field">
                            <label htmlFor="ogr_sinif">Öğrenci Sınıf</label>
                            <InputText id="ogr_sinif" type="text" value={ogr_sinif} onChange={(e) => setOgrSinif(e.target.value)} />
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
