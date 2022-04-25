import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const DataTableSizeDemo = () => {
    const [selectedStudents, setSelectedStudents] = useState(null);
    const [selectedBooks, setSelectedBooks] = useState(null);

    const [ogrenciler, setOgrenciler] = useState([]);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    useEffect(() => {
        fetch("http://localhost:8080/apio/ogrencis")
            .then((response) => response.json())
            .then((response) => setOgrenciler(response));
        console.log(ogrenciler);
    }, []);
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

    const [ogr_ad_soyad, setOgrAdSoyad] = useState("");
    const [ogr_no, setOgrNo] = useState("");
    const [ogr_id, setOgrId] = useState("");
    const [ogr_sinif, setOgrSinif] = useState("");
    const [ogr_bolum, setOgrBolum] = useState("");

    const onCityChange = (e) => {
        setSelectedStudents(e.value);
        setOgrId(e.target.value.ogr_id);
        setOgrAdSoyad(e.target.value.ogr_ad_soyad)
        setOgrNo(e.target.value.ogr_no)
        setOgrSinif(e.target.value.ogr_sinif)
        setOgrBolum(e.target.value.ogr_bolum)
    }
    const onCityChange2 = (e) => {
        setSelectedBooks(e.value);
        setId(e.target.value.id);
        setKitapAdi(e.target.value.kitap_adi)
        setKitapKategori(e.target.value.kitap_kategori)
        setKitapAciklama(e.target.value.kitap_aciklama)
        setKitapResimUrl(e.target.value.kitap_resim_url)
        setKitapSayfa(e.target.value.kitap_sayfa)
        setYazar(e.target.value.yazar)
    }
    const [id, setId] = useState("")
    const [kitap_adi, setKitapAdi] = useState("");
    const [kitap_kategori, setKitapKategori] = useState("");
    const [kitap_aciklama, setKitapAciklama] = useState("");
    const [kitap_resim_url, setKitapResimUrl] = useState("");
    const [kitap_sayfa, setKitapSayfa] = useState("");
    const [yazar, setYazar] = useState("");
    const [kitap_sayisi, setKitapSayisi] = useState(0)

    const onClick = (kitap_sayisi) => {
        setKitapSayisi.value = 0;
        setKitapSayisi.value++;
       console.log(setKitapSayisi.value);
    };

    return (


        <div className="picklist-demo">
            <div className="col-12 flex">
                <div className="col-5">
                    <Dropdown style={{ width: '100%' }} value={selectedStudents} options={ogrenciler} onChange={onCityChange} optionLabel="ogr_ad_soyad" placeholder="Lütfen Bir Öğrenci Seçiniz" />
                </div>
                <div className="col-5">
                    <Dropdown style={{ width: '100%' }} value={selectedBooks} options={kitaplar} onChange={onCityChange2} optionLabel="kitap_adi" placeholder="Atamak İstediğiniz Kitabı Seçiniz" />
                </div>
                <div className="col-2">
                    <Button label="Kitabı Ata!" icon="pi pi-external-link" onClick={() => onClick("displayMaximizable")} />
                </div>
            </div>
            <div>
                {setKitapSayisi.value}
            </div>
        </div>


    );
};

export default React.memo(DataTableSizeDemo);
