import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";


const DataTableSizeDemo = () => {
    const [kitaplar, setKitaplar] = useState([]);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    useEffect(() => {
        fetch("http://localhost:8080/api/kitaps")
            .then((response) => response.json())
            .then((response) => setKitaplar(response));
    }, []);
    const isPositiveInteger = (val) => {
        let str = String(val);
        str = str.trim();
        if (!str) {
            return false;
        }
        str = str.replace(/^0+/, "") || "0";
        let n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }

    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        switch (field) {
            case 'quantity':
            case 'price':
                if (isPositiveInteger(newValue))
                    rowData[field] = newValue;
                else
                    event.preventDefault();
                break;

            default:
                if (newValue.trim().length > 0)
                    rowData[field] = newValue;
                else
                    event.preventDefault();
                break;
        }
    }


    /* const [id, setId] = useState(null);

    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Hooks POST Request Example' })
        };
        fetch('http://localhost:8080/api/add', requestOptions)
            .then(response => response.json())
            .then(response => setId(response.id));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []); */


    return (


        <div>

            <div className="card">
               
                <DataTable value={kitaplar} scrollable scrollHeight="400px" responsiveLayout="scroll">
                    <Column field="id"  header="ID" ></Column>
                    <Column field="kitap_adi" header="Kitap Adı"></Column>
                    <Column field="kitap_sayfa" header="Sayfa Sayısı"></Column>
                    <Column field="kitap_kategori" header="Kategori"></Column>
                    <Column field="yazar" header="Yazar"></Column>
                    <Column field="kitap_adeti" header="Adet"></Column>
                    <Column field="mevcut_kitap" header="Mevcut"></Column>
                </DataTable>
            </div>

        </div>
    );
};

export default React.memo(DataTableSizeDemo);
