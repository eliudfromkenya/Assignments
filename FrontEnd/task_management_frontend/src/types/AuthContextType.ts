import { RegisterFormData } from "./RegistrationFormData";
import { User } from "./User";

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterFormData) => Promise<void>;
    logout: () => void;
}