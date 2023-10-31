import { useStores } from "../stores/root-context";

export const useAuth = () => {
    const { user } = useStores();
    const auth = user.user?.name

    console.log(auth)

    return {isAuth: !!auth}
}

