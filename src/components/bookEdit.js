import React, { useEffect, useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const DialogDemo = () => {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState("center");

    const [products, setProducts] = useState([]);
    const [selectedProducts7, setSelectedProducts7] = useState(null);

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
                <Button label="Hayır" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Evet" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    };

    const toast = useRef(null);



    const [kitaplar, setKitaplar] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/kitaps")
            .then((response) => response.json())
            .then((response) => setKitaplar(response));
    }, []);


   
    return (
        <div className="dialog-demo">
            <Button style={{ backgroundColor: "orange" }} label="Kitap Düzenle" icon="pi pi-external-link" onClick={() => onClick("displayMaximizable")} />

            <Dialog header="Düzenle" visible={displayMaximizable} maximizable modal style={{ width: "50vw" }} footer={renderFooter("displayMaximizable")} onHide={() => onHide("displayMaximizable")}>
              
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(DialogDemo);
