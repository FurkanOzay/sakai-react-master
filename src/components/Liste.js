import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

const DataTableSizeDemo = () => {
    const [kitaplar, setKitaplar] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/kitaps")
            .then((response) => response.json())
            .then((response) => setKitaplar(response));
    }, []);

    const cellEditor = (options) => {

        console.log("Options : ", options)

        if (options.field === 'price')
            return priceEditor(options);
        else
            return textEditor(options);
    }

    const priceEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />
    }

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
                <DataTable value={kitaplar}  size="small" editMode="cell" responsiveLayout="scroll" >
                    
                    <Column field="id" header="Kitap ID" editor={(options) => cellEditor(options)} ></Column>
                    <Column field="kitap_adi" header="Kitap Adı" editor={(options) => cellEditor(options)}  ></Column>
                    <Column field="kitap_sayfa" header="Sayfa Sayısı" editor={(options) => cellEditor(options)}></Column>
                    <Column field="kitap_kategori" header="Kategori" editor={(options) => cellEditor(options)}></Column>
                    <Column field="kitap_resim_url" header="Resim" editor={(options) => cellEditor(options)}></Column>
                    <Column field="yazar" header="Yazar" editor={(options) => cellEditor(options)}></Column>
                </DataTable>
            </div>

        </div>
    );
};

export default React.memo(DataTableSizeDemo);
