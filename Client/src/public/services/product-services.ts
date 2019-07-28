import axios from 'axios';
import { productAction } from '../../store/actions';
import { IProduct } from '../../public/Interfaces';
import store from '../../store';

const createProduct = async (data: IProduct) => {
    try {
        const result =  await axios.post('/new/product', data);
        return result;
    } catch (e) {
        return e.response;
    }
};

const getProduct = async () => {
    const result = await axios.get('/products');
    store.dispatch(productAction(result.data.success));
};

const deleteProduct = async (id: string) => {
    await axios.delete(`/product/${id}`);
    await getProduct();
};

const editProduct = async (id:string, data: IProduct) => {
    try {
        const result =  await axios.put(`/edit/product/${id}`, data);
        return result;
    } catch (e) {
        return e.response;
    }
};

export {
    createProduct,
    getProduct,
    deleteProduct,
    editProduct
}
