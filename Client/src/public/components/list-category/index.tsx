import * as React from 'react';
import ListCategoryItemComponent from './category-item';
import ListHeader from '../../../public/components/list-header';

const ListCategoryComponent = () => {
    return(
        <div className="list-category">
            <ListHeader type={1} title={'Category'}/>
            <ListCategoryItemComponent />
        </div>
    )
}

export default ListCategoryComponent;

