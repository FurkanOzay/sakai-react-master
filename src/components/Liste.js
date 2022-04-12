
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';

const DataTableSizeDemo = () => {
    const [sehirler, setSehirler] = useState(null);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setSehirler(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="card">
                <DataTable value={sehirler} header="Small Table" size="small" responsiveLayout="scroll">
                    <Column field="code" header="Code"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                </DataTable>
            </div>

            <div className="card">
                <DataTable value={sehirler} header="Normal Table" responsiveLayout="scroll">
                    <Column field="code" header="Code"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                </DataTable>
            </div>

            <div className="card">
                <DataTable value={sehirler} header="Large Table" size="large" responsiveLayout="scroll">
                    <Column field="ad" header="Code"></Column>
                    <Column field="nufus" header="Name"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                </DataTable>
            </div>
        </div>
    );
}
                
export default React.memo(DataTableSizeDemo);