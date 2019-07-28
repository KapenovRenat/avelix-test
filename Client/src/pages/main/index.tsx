import * as React from 'react';
import ListCategoryComponent from '../../public/components/list-category';
import ListProductsComponent from '../../public/components/list-products';

const MainPage = ({path}: any) => {
    return(
        <div className="container">
            <ListProductsComponent />
            <ListCategoryComponent />
        </div>
    )
}

export default MainPage;

