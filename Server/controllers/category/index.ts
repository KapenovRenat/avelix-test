import { Request, Response } from "express";
import { CategoryModal } from "../../models/Category/index";

const CreateCategory = async (req: Request, res: Response) => {
    const category = await new CategoryModal(req.body).create();
    return res.status(category.status).json(category);
};

const GetCategory = async (req: Request, res: Response) => {
    const category = await new CategoryModal(req.body).getCategory();
    return res.status(category.status).json(category);
};

const DeleteCategory = async (req: Request, res: Response) => {
    const category = await new CategoryModal(req.body).delete(req.params.id, req.query.Category);
    return res.status(category.status).json(category);
};
const EditCategory = async (req: Request, res: Response) => {
    const category = await new CategoryModal(req.body).edit(req.params.id, req.body);
    return res.status(category.status).json(category);
};

export {
    CreateCategory,
    GetCategory,
    DeleteCategory,
    EditCategory
};
