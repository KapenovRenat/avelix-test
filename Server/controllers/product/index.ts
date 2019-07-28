import { Request, Response } from "express";
import { ProductsModel } from "../../models/Products/index";

const CreateProduct = async (req: Request, res: Response) => {
    const category = await new ProductsModel(req.body).create();
    return res.status(category.status).json(category);
};

const GetProduct = async (req: Request, res: Response) => {
    const category = await new ProductsModel(req.body).getProducts();
    return res.status(category.status).json(category);
};

const DeleteProduct = async (req: Request, res: Response) => {
    const category = await new ProductsModel(req.body).delete(req.params.id);
    return res.status(category.status).json(category);
};

const EditProduct = async (req: Request, res: Response) => {
    const category = await new ProductsModel(req.body).edit(req.params.id);
    return res.status(category.status).json(category);
};

export {
    CreateProduct,
    GetProduct,
    DeleteProduct,
    EditProduct
};
