import { ICategorys, IProduct } from '../../public/Interfaces';

const categoryAction = (data: ICategorys) => {
    return {
        type: 'SAVE_CATEGORY',
        payload: data
    }
};

const productAction = (data: IProduct) => {
    return {
        type: 'SAVE_PRODUCT',
        payload: data
    }
};

export {
    categoryAction,
    productAction
}
