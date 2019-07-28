import axios from 'axios';
import { IUser } from '../../public/Interfaces';

const isAuthorizated = (): boolean => {
    return !!localStorage.getItem('Token');
};

const loginServices = async (data: IUser) => {
    try {
        const result =  await axios.post('/login', data);
        return result;
    } catch (e) {
        return e.response;
    }
};

const saveTokenServices = (token: string) => {
    localStorage.setItem('Token', token);
};

export {
    isAuthorizated,
    loginServices,
    saveTokenServices
}
