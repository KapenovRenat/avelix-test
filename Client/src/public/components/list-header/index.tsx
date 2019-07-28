import * as React from 'react';
import { useState } from 'react';
import { Fab } from '@material-ui/core';
import { connect } from 'react-redux';
import { ICategorys } from '../../../public/Interfaces';
import AddIcon from '@material-ui/icons/Add';
import CreateModalCategory from '../../../public/components/list-header/modal/create-category-modal';
import CreateModalProduct from '../../../public/components/list-header/modal/create-product-modal';

interface IListHeader {
    type: number;
    title: string;
    categorys: ICategorys[];
}

const ListHeader = ({type, title, categorys}: IListHeader) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isModal, setModal] = useState<number>(0);

    const handleClose = () => {
        setModal(0);
        setIsOpen(false)
    };

    const isOpenModal = (type: number) => {
        if (type === 2 && categorys.length === 0){
           alert('Create categorys!');
        } else {
            setModal(type);
            setIsOpen(true);
        }
    };

    return(
        <div className="list-header">
            <Fab color="primary" aria-label="add" onClick={() => isOpenModal(type)}>
                <AddIcon />
            </Fab>
            <h2>{title}</h2>
            {isModal === 1 && <CreateModalCategory isOpen={isOpen} handleClose={handleClose}/>}
            {isModal === 2 && <CreateModalProduct isOpen={isOpen} handleClose={handleClose}/>}
        </div>
    )
}

export default connect(
    (state: any) => ({
        categorys: state.mainState.category
    }),
    dispatch => ({})
)(ListHeader);

