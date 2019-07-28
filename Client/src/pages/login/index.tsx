import * as React from 'react';
import { useState } from 'react';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import { navigate } from '@reach/router';
import { loginServices, saveTokenServices } from '../../public/services/login-services';
import { IUser } from '../../public/Interfaces';
import { useSnackbar } from 'notistack';

const LoginPage = (path: any) => {
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState<IUser>({Email: 'Avelix@gmail.ru', Password: '123456'});
    const [loading, setLoading] = useState<boolean>(false);

    const changeInputs = (e: any) => {
        const { name, value } = e.currentTarget;
        setUser({...user, [name]: value});
    };

    const submit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const res = await loginServices(user);
        if (res){
            setLoading(false)
            if (res.data.errors){
                res.data.errors.forEach((item: any) => enqueueSnackbar(item.msg));
            } else {
                saveTokenServices(res.data.success);
                navigate('/');
            }
        }
    }

    return(
        <div className="login">
            <form onSubmit={submit}>
                <TextField
                    id="filled-name"
                    label="Email"
                    name="Email"
                    value={user.Email}
                    onChange={changeInputs}
                    margin="normal"
                    variant="filled"
                    type="email"
                />
                <TextField
                    id="filled-name"
                    label="Password"
                    name="Password"
                    type="password"
                    margin="normal"
                    variant="filled"
                    value={user.Password}
                    onChange={changeInputs}
                />
                {loading ? <CircularProgress /> :
                    <Button type="submit" variant="contained" color="primary" >
                        Login
                    </Button>
                }
            </form>
        </div>
    )
};

export default LoginPage;

