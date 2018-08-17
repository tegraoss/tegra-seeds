import { Model } from "objection";

export class User extends Model {

    public id: number;
    public email: number;
    public password: string;
    public name: string;
    public age: number;
    public city: string;

    static get tableName(): string {
        return "users";
    }

}
