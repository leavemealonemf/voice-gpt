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
    loading = false;
    unauthorize = false;

    constructor() {
        makeAutoObservable(this);
        this.auth = auth;
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setLoading(bool: boolean) {
        this.loading = bool;
    }

    setUnauthorize(bool: boolean) {
        this.unauthorize = bool;
    }

    async register(email: string, password: string) {
        try {
            const {user} = await authService.createUser(email, password);
            runInAction(() => {
                this.user = {
                    uid: user.uid,
                    name: user.email || undefined,
                }
                this.isAuth = true;
            })
            return user;
        } catch (error) {
            console.log(error);
            this.isAuth = false;
        }
    }

    async login(email: string, password: string) {
        try {
            const {user} = await authService.login(email, password);
            runInAction(() => {
                this.user = {
                    uid: user.uid,
                    name: user.email || undefined,
                }
                this.isAuth = true;
            })
            return user;
        } catch (error) {
            console.log(error);
            this.isAuth = false;
        }
    }

    async singUpWithGoogle() {
        try {
            const {user} = await authService.signUpWithGoogle();
            runInAction(() => {
                this.user = {
                    uid: user.uid,
                    name: user.email || undefined,
                }
                this.isAuth = true;
            })
            return user;
        } catch (error) {
            console.log(error);
            this.isAuth = false;
        }
    }

    async logout() {
        this.setLoading(true);

        try {
            await authService.logout();
            runInAction(() => {
                this.setLoading(false);
                this.setAuth(false);
                this.setUnauthorize(true);
            })
        } catch(error) {
            console.log(error);
            this.setLoading(false);
        } finally {
            this.setLoading(false);
        }
    }

    checkAuth() {
        this.setLoading(true);
        onAuthStateChanged(this.auth, (userData) => {
            if (userData) {
                this.user = {
                    uid: userData.uid,
                    name: userData.email || undefined,
                };
                this.setAuth(true);
                this.setLoading(false);
            }
            else {
                this.setUnauthorize(true);
                this.setAuth(false);
                this.setLoading(false);
                throw new Error('Unauthorized');
            } 
        })
    }
}


export default new UserStore();