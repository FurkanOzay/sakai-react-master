import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

const DataTableSizeDemo = () => {
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
    }, []);



    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

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
               
                <DataTable value={ogrenciler} scrollable scrollHeight="400px" responsiveLayout="scroll">
                    <Column field="ogr_id"  header="ID" ></Column>
                    <Column field="ogr_no" header="Numara"></Column>
                    <Column field="ogr_ad_soyad" header="Ad Soyad"></Column>
                    <Column field="ogr_bolum" header="Bölüm"></Column>
                    <Column field="ogr_sinif" header="Sınıf"></Column>
                </DataTable>
            </div>

        </div>
    );
};

export default React.memo(DataTableSizeDemo);
