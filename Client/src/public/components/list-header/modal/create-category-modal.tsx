import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { getProduct } from '../../../../public/services/product-services';
import { ICategory } from '../../../../public/Interfaces';
import { createCategory, editCategory, getCategory } from '../../../../public/services/category-services';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@material-ui/core';

interface IModal {
    isOpen: boolean;
    handleClose: () => void;
    edit_id?: string;
    categorys: ICategory[];
}

const CreateModalCategory = ({isOpen, handleClose, edit_id, categorys}: IModal) => {
    const { enqueueSnackbar } = useSnackbar();
    const [input, setInput] = useState<string>('');
    const [oldInputValue, setOldValue] = useState<string>('');

    useEffect(() => {
        getCategoryInStore();
    }, []);

    const getCategoryInStore = () => {
        if (edit_id) {
            const category = categorys.find((item: any) => item._id === edit_id);
            setInput(category.Category);
            setOldValue(category.Category);
        }
    };

    const onChangeInput = (e: any) => {
        const { value } = e.currentTarget;
        setInput(value);
    };

    const submit = async (e: any) => {
        e.preventDefault();
        if (input) {
            const queryUpdate = {
                Category: input,
                oldCategory: oldInputValue
            };
            const res = edit_id ? await editCategory(edit_id, queryUpdate) : await createCategory(input);
            if (res) {
                if (res.data.errors){
                    res.data.errors.forEach((item: any) => enqueueSnackbar(item.msg));
                } else {
                    edit_id && getProduct();
                    getCategory();
                    handleClose();
                }
            }
        } else {
            enqueueSnackbar('Input Empty');
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
                        Create Category
                    </DialogTitle>
                    <DialogContent dividers>
                        <TextField
                            value={input}
                            id="standard-name"
                            label="Name Category"
                            onChange={onChangeInput}
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="primary">
                            Create category
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
    dispatch => ({})
)(CreateModalCategory);

