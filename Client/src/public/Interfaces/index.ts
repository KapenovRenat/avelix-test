export interface IUser {
    Email: string;
    Password: string;
}

export interface ICategory {
    _id: string;
    Category: string;
    Creator_id: string
};

export interface IProduct {
    _id?: string;
    Name: string;
    Price: number;
    Life: Date;
    Category: string;
}

export interface ICategorys extends Array<ICategory>{};
export interface IProducts extends Array<IProduct>{};
