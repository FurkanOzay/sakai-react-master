import axios from 'axios';

export class ProductService {

    getProductsSmall() {
        return axios.get('http://localhost:8080/api/sehirs').then(res => res.data.data);
    }

    getProducts() {
        return axios.get('http://localhost:8080/api/sehirs').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('http://localhost:8080/api/sehirs').then(res => res.data.data);
    }
}