import React, { useState, useEffect } from "react";
import { PickList } from 'primereact/picklist';


const DataTableSizeDemo = () => {
/*     const [kitaplar, setKitaplar] = useState([]);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    useEffect(() => {
        fetch("http://localhost:8080/api/kitaps")
            .then((response) => response.json())
            .then((response) => setKitaplar(response));
    }, []); */



    return (


        <div className="picklist-demo">
            <p>Bu alana kitap atama componenti gelecek</p>
        </div>

        
    );
};

export default React.memo(DataTableSizeDemo);
