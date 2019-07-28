import { ICategorys, IProducts } from '../../public/Interfaces';

const initialState = {
    category: <ICategorys>[],
    products: <IProducts>[]
};

export function mainState(state = initialState, action:any){
    switch(action.type){
        case "SAVE_CATEGORY": return {
            ...state, category: action.payload
        };
        case "SAVE_PRODUCT":  return {
            ...state, products: action.payload
        };
        default: return state;
    }
}
