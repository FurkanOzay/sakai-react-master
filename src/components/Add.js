import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from "primereact/toast";
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';


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
    const [id, setId] = useState("");
    const [kitap_adi, setkitapAdi] = useState("");
    const [kitap_kategori, setKitapKategori] = useState("");
    const [kitap_aciklama, setKitapAciklama] = useState("");
    const [kitap_resim_url, SetKitap_resim_url] = useState("");
    const [kitap_sayfa, setkitapSayfa] = useState("");
    const [yazar, setYazar] = useState("");

    const add = (e) => {
        const kitap = {id, kitap_adi, kitap_kategori,kitap_aciklama, kitap_resim_url, kitap_sayfa, yazar};
        fetch('http://localhost:8080/api/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(kitap)
        }).then(() => {
            if(kitap_adi) {
                toastRef.current.show({severity: 'info', summary: 'Başarılı', detail: kitap_adi + " eklendi"});
            }else{
                toastRef.current.show({severity: 'error', summary: 'Hata!', detail: "Ekleme işlemi başarısız"});
            }
        })
    };


    

    return (
        <div className="dialog-demo">
            <Toast ref={toastRef} />
            <Button label="Kitap Ekle" icon="pi pi-external-link" onClick={() => onClick("displayMaximizable")} />
            <Dialog visible={displayMaximizable} maximizable modal style={{ width: "50vw" }} footer={renderFooter("displayMaximizable")} onHide={() => onHide("displayMaximizable")}>
                <div className="col-12 md:col-12">
                    <div className="p-fluid">
                        <h5>Kitap Bilgileri</h5>
                        <div className="field">
                            <label htmlFor="kitap_adi">Kitap Adı</label>
                            <InputText id="kitap_adi" type="text" value={kitap_adi}  onChange={(e) => setkitapAdi(e.target.value)} />
                        </div>

                        <div className="field">
                            <label htmlFor="kitap_kategori">Kitap Kategorisi</label>
                            <InputText id="kitap_kategori" type="text" value={kitap_kategori} onChange={(e) => setKitapKategori(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="kitap_aciklama">Kitap Özet/Açıklama</label>
                            <InputTextarea  value={kitap_aciklama} onChange={(e) => setKitapAciklama(e.target.value)}  rows={5} cols={30}  />
                        </div>
                        <div className="field">
                            <label htmlFor="kitap_resim_url">Kitap Resim Yolu</label>
                            <InputText id="kitap_resim_url" type="text" value={kitap_resim_url} onChange={(e) => SetKitap_resim_url(e.target.value)} />
                        </div>
                        <div className="field">
                            <label>Sayfa Sayısı</label>
                            <InputNumber value={kitap_sayfa} onValueChange={(e) => setkitapSayfa(e.value)} showButtons mode="decimal"></InputNumber>
                        </div>

                        <div className="field">
                            <label>Yazar</label>
                            <InputText id="yazar" type="text" value={yazar} onChange={(e) => setYazar(e.target.value)} />
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
