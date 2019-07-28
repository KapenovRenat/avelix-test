import jwt from "jsonwebtoken";
import { config } from "../../configuration/index";
import { UserInterface } from "../Interfaces/UserInterface";

export class AuthorizationModel {
    public Email: string;
    public Password: string;

    constructor({Email, Password}: UserInterface) {
        this.Email = Email || "";
        this.Password = Password || "";
    }

    public async login() {
        if (this.Email === "Avelix@gmail.ru" && this.Password === "123456") {
            const token = jwt.sign({ User_id: 1 }, config.secret, { expiresIn: 600 * 600 });
            return {status: 200, ok: "Вход", success: token};
        } else {
            return {status: 400, errors: [{msg: "Email или Пароль не верны!"}]};
        }
    }
}
