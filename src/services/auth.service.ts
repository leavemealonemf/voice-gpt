import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

class AuthService {
    auth;

    constructor() {
        this.auth = auth;
    }

    async createUser(email: string, password: string): Promise<UserCredential> {
        return await createUserWithEmailAndPassword(this.auth, email, password);
    }

}   

export default new AuthService();