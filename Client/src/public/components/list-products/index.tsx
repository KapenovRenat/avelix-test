import * as React from 'react';
import ListProductItemComponent from './product-item';
import ListHeader from '../../../public/components/list-header';

const ListProductsComponent = () => {
    return(
        <div className="list-products">
            <ListHeader type={2} title={'Products'}/>
            <ListProductItemComponent/>
        </div>
    )
}

export default ListProductsComponent;

