import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { ProductService } from "../service/ProductService";
import Add from "./Add";
import Liste from "./Liste";
import BookDelete from "./bookDelete";
import BookEdit from "./bookEdit";
import OgrenciListe from "./OgrenciListe";
import OgrenciAdd from "./OgrenciAdd";
import StudentEdit from "./StudentEdit";
import StudentsDelete from "./StudentsDelete";


const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: "#2f4860",
            borderColor: "#2f4860",
            tension: 0.4,
        },
        {
            label: "Second Dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
        },
    ],
};

const Dashboard = (props) => {
    const [products, setProducts] = useState(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState(null);

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#495057",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
                y: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#ebedef",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
                y: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        const productService = new ProductService();
        productService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        if (props.colorMode === "light") {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [props.colorMode]);

    const formatCurrency = (value) => {
        return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
    };
    const [kitaplar, setKitaplar] = useState([]);
    const [ogrenciler, setOgrenciler] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/kitaps")
            .then((response) => response.json())
            .then((response) => setKitaplar(response));
    }, []);
    useEffect(() => {
        fetch("http://localhost:8080/apio/ogrencis")
            .then((response) => response.json())
            .then((response) => setOgrenciler(response));
    }, []);

    const toast = useRef(null);

    const showConfirm = () => {
        toast.current.show({ severity: 'warn', sticky: true, content: (
            <div className="flex flex-column" style={{flex: '1'}}>
                <div className="text-center">
                    <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                    <h4>Are you sure?</h4>
                    <p>Confirm to proceed</p>
                </div>
                <div className="grid p-fluid">
                    <div className="col-6">
                        <Button type="button" label="Yes" className="p-button-success" />
                    </div>
                    <div className="col-6">
                        <Button type="button" label="No" className="p-button-secondary" />
                    </div>
                </div>
            </div>
        ) });
    }
    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-6">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Güncel Kitap Stoğu :</span>
                            <div className="text-900 font-medium text-xl">Kitap Adeti : {kitaplar.length}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-gray-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                            <i className="pi pi-bookmark-fill text-dark-500 text-xl" />
                        </div>
                    </div>
                    <div className="flex justify-content-space-around mb-3">
                        <div className="flex align-items-center ">
                            <Add />
                        </div>
                        <div className="flex align-items-center ml-2">
                            <BookEdit />
                        </div>
                        <div className="flex align-items-center ml-2">
                            <BookDelete />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 lg:col-6 xl:col-6">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Güncel Öğrenci Sayısı</span>
                            <div className="text-900 font-medium text-xl">Öğrenci Sayısı : {ogrenciler.length}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-user-minus text-orange-500 text-xl"/>
                        </div>
                    </div>
                    <div className="flex justify-content-space-around mb-3">
                        <div className="flex align-items-center ">
                            <OgrenciAdd />
                        </div>
                        <div className="flex align-items-center ml-2">
                            <StudentEdit />
                        </div>
                        <div className="flex align-items-center ml-2">
                            <StudentsDelete />
                        </div>

                    </div>
                </div>
                
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Son Kitap Kayıtları</h5>
                    <Liste />
                </div>
            </div>
            
            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Son Öğrenci Kayıtları</h5>
                    <OgrenciListe />
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode;
};

export default React.memo(Dashboard, comparisonFn);
