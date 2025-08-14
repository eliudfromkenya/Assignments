import { LoginFormData } from "./LoginFormData";

export interface RegisterFormData extends LoginFormData {
    username: string;
}