import { ProductInterface } from "../Interfaces/UserInterface";
import { product } from "../Schems";

export class ProductsModel {
    public User_ID: string;
    public Name: string;
    public Category: string;
    public Life: string;
    public Price: number;

    constructor({User_ID, Name, Category, Life, Price}: ProductInterface) {
        this.User_ID = User_ID;
        this.Name = Name;
        this.Category = Category;
        this.Life = Life;
        this.Price = Price;
    }

    public async create() {
        try {
            await new product({
                Name: this.Name,
                Category: this.Category,
                Life: this.Life,
                Price: this.Price,
            }).save();
            return {status: 200, success: "Product created"};
        } catch (e) {
            return {status: 400, errors: [{msg: "a Product with this name exists"}]};
        }
    }

    public async getProducts() {
        const res = await product.find();
        return {status: 200, success: res};
    }

    public async delete(id: string) {
        await product.deleteOne({ _id: id });
        return {status: 200, success: "Product removed"};
    }
    public async edit(id: string) {
        await product.findOneAndUpdate(
            {_id: id}, {
                Category: this.Category,
                Name: this.Name,
                Price: this.Price,
                Life: this.Life,
            });
        return {status: 200, ok: "updated"};
    }
}
