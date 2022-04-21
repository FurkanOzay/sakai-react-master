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

    


    const [kitaplar, setKitaplar] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/kitaps", {
            method: 'GET',
            header: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then((response) => response.json())
            .then((response) => setKitaplar(response));
    }, []);

    const [id, setId] = useState("")
    const [kitap_adi, setKitapAdi] = useState("");
    const [kitap_kategori, setKitapKategori] = useState("");
    const [kitap_aciklama, setKitapAciklama] = useState("");
    const [kitap_resim_url, setKitapResimUrl] = useState("");
    const [kitap_sayfa, setKitapSayfa] = useState("");
    const [yazar, setYazar] = useState("");

    
    const [selectedBooks, setSelectedBooks] = useState(null);

    
    const onCityChange = (e) => {
        setSelectedBooks(e.value);
        setId(e.target.value.id);
        setKitapAdi(e.target.value.kitap_adi)
        setKitapKategori(e.target.value.kitap_kategori)
        setKitapAciklama(e.target.value.kitap_aciklama)
        setKitapResimUrl(e.target.value.kitap_resim_url)
        setKitapSayfa(e.target.value.kitap_sayfa)
        setYazar(e.target.value.yazar)
    }

const update = (e) => {
        const kitap = {id, kitap_adi, kitap_kategori,kitap_aciklama, kitap_resim_url, kitap_sayfa, yazar};
        console.warn("kitap", kitap)
        fetch(`http://localhost:8080/api/update/`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(kitap)
        }).then(() => {
            if(id) {
                toastRef.current.show({severity: 'info', summary: 'Başarılı', detail: kitap_adi + " güncellendi"});
            }else{
                toastRef.current.show({severity: 'error', summary: 'Hata!', detail: "Güncelleme işlemi başarısız"});
            }
        }).then(() => {
            console.log(kitap, "Kapanma İşlemi Başladı");
           
        })

    };
    
const toastRef = useRef();




    return (
        <div className="dialog-demo">
            <Toast ref={toastRef} />
            <Button style={{ backgroundColor: "orange" }} label="Kitap Düzenle" icon="pi pi-external-link" onClick={() => onClick("displayMaximizable")} />
            <Dialog header="Düzenle" visible={displayMaximizable} maximizable modal style={{ width: "50vw" }} footer={renderFooter("displayMaximizable")} onHide={() => onHide("displayMaximizable")}>
                <Dropdown style={{width:'100%'}}  value={selectedBooks} options={kitaplar}  onChange={onCityChange} optionLabel="kitap_adi" placeholder="Lütfen Bir Kitap Seçiniz" />
                <div className="col-12 md:col-12">
                    <div className="p-fluid">
                        <h5>Kitap Bilgileri</h5>


                        <div className="field">
                            <label htmlFor="id">ID</label>
                            <InputText id="id" type="text" value={id} onChange={(e) => setId(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="kitap_adi">Kitap Adı</label>
                            <InputText id="kitap_adi" type="text" value={kitap_adi} onChange={(e) => setKitapAdi(e.target.value)} />
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
                            <label htmlFor="kitap_aciklama">Kitap Resim Yolu</label>
                            <InputText id="kitap_aciklama" type="text" value={kitap_resim_url} onChange={(e) => setKitapResimUrl(e.target.value)} />
                        </div>
                        <div className="field">
                            <label>Sayfa Sayısı</label>
                            <InputNumber value={kitap_sayfa} onValueChange={(e) => setKitapSayfa(e.value)} showButtons mode="decimal"></InputNumber>
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
