import * as React from 'react';
import { useEffect, useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { navigate } from '@reach/router';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { editProduct } from '../../public/services/product-services';
import { ICategory, IProducts } from '../../public/Interfaces';
import {
    Button, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import moment = require('moment');

interface IEditPage {
    path: string;
    productId?: string;
    categorys: ICategory[];
    products: IProducts[]
}

interface IInitialState {
    Name: string;
    Price: number;
}

const EditProductPage = ({path, productId, categorys, products}: IEditPage) => {
    const { enqueueSnackbar } = useSnackbar();

    const [input, setInput] = useState<IInitialState>({Name: '', Price: 1});
    const [dateInput, setDateInput] = useState<Date>(new Date());
    const [values, setValues] = React.useState({
        Category: ''
    });

    useEffect(()=> {
        const product = products.find((item: any) => item._id === productId);
        const newInititalState = {
            Name: (product as any).Name,
            Price: (product as any).Price,
        };
        setInput(newInititalState);
        setValues({Category: (product as any).Category});
        setDateInput(moment((product as any).Life).toDate());
    }, []);

    const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setValues(oldValues => ({
            ...oldValues,
            [e.target.name as string]: e.target.value,
        }));
    };

    const onChangeInput = (e: any) => {
        const { name, value } = e.currentTarget;
        setInput({...input, [name as string]: value});
    };

    const submit = async (e: any) => {
        e.preventDefault();

        if (input.Name === '' || input.Name.length < 5 || input.Name.length > 40) {
            enqueueSnackbar('Name empty or length < 5 or > 40');
        } else if (input.Price <= 0) {
            enqueueSnackbar('Price empty or value <=0');
        } else if (dateInput <= new Date()) {
            enqueueSnackbar('Life empty or value <=0');
        } else {
            const queryData = {
                Name: input.Name,
                Price: input.Price,
                Life: dateInput,
                Category: values.Category === '' ? categorys[0].Category : values.Category
            };
            const res = await editProduct(productId, queryData);
            if (res){
                if (res.data.errors){
                    res.data.errors.forEach((item: any) => enqueueSnackbar(item.msg));
                } else {
                    navigate('/');
                }
            }
        }
    };

    return(
        <React.Fragment>
            <form onSubmit={submit}>
                <DialogTitle>
                    Edit Product
                </DialogTitle>
                <DialogContent dividers className="modal-product">
                    <TextField
                        id="standard-name"
                        label="Name Product"
                        name="Name"
                        onChange={onChangeInput}
                        margin="normal"
                        value={input.Name}
                    />
                    <TextField
                        id="standard-name"
                        label="Price"
                        name="Price"
                        type="number"
                        onChange={onChangeInput}
                        value={input.Price}
                        margin="normal"
                    />
                    <FormControl >
                        <InputLabel htmlFor="age-simple">Category</InputLabel>
                        <Select
                            value={values.Category}
                            onChange={handleChange}
                            inputProps={{
                                name: 'Category',
                            }}
                        >
                            {
                                categorys.map((item)=>
                                    <MenuItem key={item._id} value={item.Category}>{item.Category}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            value={dateInput}
                            name="Life"
                            onChange={setDateInput}
                        />
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => navigate('/')}>
                        Go main page
                    </Button>
                    <Button type="submit" color="primary">
                        Edit Product
                    </Button>
                </DialogActions>
            </form>
        </React.Fragment>
    )
};

export default connect(
    (state: any) => ({
        categorys: state.mainState.category,
        products: state.mainState.products
    }),
    (dispatch: any) => ({})
)(EditProductPage);
