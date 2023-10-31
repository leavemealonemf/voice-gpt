import { observer } from "mobx-react-lite";
import { useStores } from "../stores/root-context"

const AuthPage = observer(() => {

    const { user } = useStores();

    return (
        <>
            <div>AuthPage</div>
            <button onClick={() => user.register("strangemisterio78@gmail.com", "haha123")}>Register</button>
        </>
    )
})

export default AuthPage