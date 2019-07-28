import * as React from 'react';
import { useEffect } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import { deleteProduct, getProduct } from '../../../../public/services/product-services';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography
} from '@material-ui/core';
import moment = require('moment');

const ListProductItemComponent = ({products}: any) => {

    useEffect(() => {
        getProduct();
    }, []);

    const removeProduct = (id: string) => {
        const remove = confirm("Are you sure?");
        if (remove) {
            deleteProduct(id);
        }
    };

    const goEdit = (id: string) => {
        navigate(`edit/${id}`);
    };

    const convertDate = (date: string) => {
        return moment(date).format("MMM Do YY");
    }

    return (
        <div className="list-products-item">
            {products.length === 0 ? 'Empty Products' :
                products.map((item: any) =>
                    <Card style={{marginRight: '10px', flexBasis: '23.6666%', marginBottom: '10px'}} key={item._id}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Name: <br/> {item.Name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Category: {item.Category}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Price: {item.Price}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="span">
                                    Life: {convertDate(item.Life)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => goEdit(item._id)}>
                                Edit
                            </Button>
                            <Button size="small" color="primary" onClick={() => removeProduct(item._id)}>
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                )
            }
        </div>
    )
};

export default connect(
    (state: any) => ({
        products: state.mainState.products
    }),
    (dispatch: any) => ({})
)(ListProductItemComponent);
