import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";

class AuthService {
    auth;
    provider;

    constructor() {
        this.auth = auth;
        this.provider = provider;
    }

    async createUser(email: string, password: string): Promise<UserCredential> {
        return await createUserWithEmailAndPassword(this.auth, email, password);
    }

    async login(email: string, password: string): Promise<UserCredential> {
        return await signInWithEmailAndPassword(this.auth, email, password);
    }

    async signUpWithGoogle() {
        return await signInWithPopup(this.auth, this.provider);
    }

    async logout() {
        return await signOut(auth);
    }

}   

export default new AuthService();