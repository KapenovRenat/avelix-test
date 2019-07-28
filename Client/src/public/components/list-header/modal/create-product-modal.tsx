import * as React from 'react';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { connect } from 'react-redux';
import { createProduct, getProduct } from '../../../../public/services/product-services';
import { ICategory } from '../../../Interfaces'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

interface IModal {
    isOpen: boolean;
    handleClose: () => void;
    categorys: ICategory[];
}

interface IInitialState {
    Name: string;
    Price: number;
}

const CreateModalProduct = ({isOpen, handleClose, categorys}: IModal) => {
    const { enqueueSnackbar } = useSnackbar();
    const [input, setInput] = useState<IInitialState>({ Name: '', Price: 1});
    const [dateInput, setDateInput] = useState<Date>(new Date());
    const [values, setValues] = React.useState({
        Category: ''
    });

    const onChangeInput = (e: any) => {
        const { name, value } = e.currentTarget;
        setInput({...input, [name as string]: value});
    };

    const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setValues(oldValues => ({
            ...oldValues,
            [e.target.name as string]: e.target.value,
        }));
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
            const res = await createProduct(queryData);
            if (res){
                if (res.data.errors){
                    res.data.errors.forEach((item: any) => enqueueSnackbar(item.msg));
                } else {
                    await getProduct();
                    setInput({ Name: '', Price: 1});
                    setValues({ Category: ''});
                    handleClose();
                }
            }
        }
    };

    return(
        <React.Fragment>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
            >
                <form onSubmit={submit}>
                    <DialogTitle>
                        Create Product
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
                        <Button type="submit" color="primary">
                            Create Product
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    )
};

export default connect(
    (state: any) => ({
        categorys: state.mainState.category
    }),
    (dispatch: any) => ({})
)(CreateModalProduct);

