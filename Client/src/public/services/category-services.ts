import axios from 'axios';
import { categoryAction } from '../../store/actions';
import store from '../../store';

const createCategory = async (data: string) => {
    try {
        const result =  await axios.post('/new/category', {Category: data});
        return result;
    } catch (e) {
        return e.response;
    }
};

const getCategory = async () => {
    const result = await axios.get('/category');
    store.dispatch(categoryAction(result.data.success));
};

const deleteCategory = (id: string, category: string) => {
    return axios.delete(`/category/${id}`, {params: {Category: category}});
};

const editCategory = async (id: string, {Category, oldCategory}: any) => {
    try {
        const result =  await axios.put(`/edit/category/${id}`, {Category, oldCategory});
        return result;
    } catch (e) {
        return e.response;
    }
};

export {
    createCategory,
    getCategory,
    deleteCategory,
    editCategory
}
