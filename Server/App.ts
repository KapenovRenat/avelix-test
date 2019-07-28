import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { check } from "express-validator/check";
import { config } from "./configuration";
import { login } from "./controllers/authorization";
import { CreateCategory, DeleteCategory, EditCategory, GetCategory } from "./controllers/category";
import { CreateProduct, DeleteProduct, EditProduct, GetProduct } from "./controllers/product";
import { db } from "./db-section/index";
import { verifyToken } from "./middleware/verifyToken";

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

server.post("/login", [
    check("Email").trim().isEmail().withMessage("Не валидный Email"),
    check("Password").trim().isLength({ min: 6 }).withMessage("Минимум 6 символов для пароля"),
], login);

server.post("/new/category", verifyToken, CreateCategory);
server.get("/category", verifyToken, GetCategory);
server.delete("/category/:id", verifyToken, DeleteCategory);
server.put("/edit/category/:id", verifyToken, EditCategory);

server.post("/new/product", verifyToken, CreateProduct);
server.get("/products", verifyToken, GetProduct);
server.delete("/product/:id", verifyToken, DeleteProduct);
server.put("/edit/product/:id", verifyToken, EditProduct);

server.listen(config.port, () => {
    db;
    console.log("Example app listening on port 3000!");
});
