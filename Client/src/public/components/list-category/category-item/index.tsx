import * as React from 'react';
import { useEffect, useState } from 'react';
import { Chip } from '@material-ui/core';
import { connect } from 'react-redux';
import { getProduct } from '../../../../public/services/product-services';
import { deleteCategory, getCategory } from '../../../../public/services/category-services';
import CreateModalCategory from '../../../../public/components/list-header/modal/create-category-modal';


const ListCategoryItemComponent = ({categorys}: any) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editID, setEdit] = useState<string>();
    const [isModal, setModal] = useState<number>(0);

    useEffect(() => {
        getCategory();
    }, []);

    const handleEdit = (id: string, modal: number) => {
        setEdit(id);
        setModal(modal);
        setIsOpen(true);
    };

    const handleClose = () => {
        setModal(0);
        setIsOpen(false)
    };

    const handleDelete = (id: string, category: string) => {
        const remove = confirm("Are you sure?");
        if (remove) {
            deleteCategory(id, category)
                .then(res => {
                    getProduct();
                    getCategory();
                });
        }
    };

    return(
        <div className="list-category-item">
            {categorys.length === 0 ? 'Empty Categorys' :
                categorys.map((item: any) =>
                <Chip
                    key={item._id}
                    variant="outlined"
                    size="small"
                    label={item.Category}
                    onClick={() => handleEdit(item._id, 1)}
                    onDelete={() => handleDelete(item._id, item.Category)}
                />
            )}
            {isModal === 1 && <CreateModalCategory isOpen={isOpen} handleClose={handleClose} edit_id={editID}/>}
        </div>
    )
}

export default connect(
    (state: any) => ({
        categorys: state.mainState.category
    }),
    (dispatch: any) => ({

    })
)(ListCategoryItemComponent);

