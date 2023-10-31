import { makeAutoObservable, runInAction } from "mobx";
import authService from "../services/auth.service";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export interface IUser {
    uid?: string;
    name?: string;
}

class UserStore {
    user: IUser = {};
    auth;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
        this.auth = auth;
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    async register(email: string, password: string) {
        try {
            const {user} = await authService.createUser(email, password);
            const {token} = await user.getIdTokenResult();
            runInAction(() => {
                this.user = {
                    uid: user.uid,
                    name: user.email || undefined,
                }
                this.isAuth = true;
            })
            localStorage.setItem('token', token);
        } catch (error) {
            console.log(error);
            this.isAuth = false;
        }
    }

    checkAuth() {
        onAuthStateChanged(this.auth, async(userData) => {
            if (userData) {
                const {token} = await userData.getIdTokenResult();
                this.user = {
                    uid: userData.uid,
                    name: userData.email || undefined,
                };
                localStorage.setItem('token', token);
                this.setAuth(true);
                console.log(userData);
            }
            else {
                if (localStorage.getItem('token')) {
                    localStorage.removeItem('token');
                    window.location.href = '/auth';
                }
                this.setAuth(false);
                throw new Error('Unauthorized');
            }
        })
    }
}


export default new UserStore();