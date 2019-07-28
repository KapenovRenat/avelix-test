import { CategoryInterface } from "../Interfaces/UserInterface";
import { category, product } from "../Schems";

export class CategoryModal {
    public Category: string;
    public User_ID: string;

    constructor({User_ID, Category}: CategoryInterface) {
        this.Category = Category || "";
        this.User_ID = User_ID;
    }

    public async create() {
        try {
            await new category({Category: this.Category, Creator_id: this.User_ID}).save();
            return {status: 200, success: "Category created"};
        } catch (e) {
            return {status: 400, errors: [{msg: "a category with this name exists"}]};
        }
    }

    public async getCategory() {
        const res = await category.find();
        return {status: 200, success: res};
    }

    public async delete(id: string, Categorys: string) {
        await category.deleteOne({ _id: id });
        const categorys = await category.find();
        if (categorys.length !== 0) {
            await product.updateMany({Category: Categorys}, {Category: (categorys[0] as any).Category});
        } else {
            await product.updateMany({Category: Categorys}, {Category: "No Category"});
        }
        return {status: 200, ok: "removed"};
    }

    public async edit(id: string, body: string) {
        await category.findOneAndUpdate({_id: id}, {Category: (body as any).Category});
        await product.updateMany({Category: (body as any).oldCategory}, {Category: (body as any).Category});
        return {status: 200, ok: "updated"};
    }
}
