export interface UserInterface {
    Email: string;
    Name: string;
    Password: string;
}

export interface CategoryInterface {
    Category: string;
    User_ID: string;
}

export interface ProductInterface {
    User_ID: string;
    Name: string;
    Price: number;
    Life: string;
    Category: string;
}
