import { Outlet, Navigate } from "react-router-dom";
import { useStores } from "../stores/root-context";
import { observer } from "mobx-react-lite";
import Loading from "../componets/ui/Loading";

const PrivateRouter = observer(() => {

    const {user} = useStores();

    if (user.loading === true) {
        return <Loading/>
    }

    if (user.isAuth === true) {
        return (
            <Outlet/>
        )
    } 

    if (user.unauthorize === true) {
        return (
            <Navigate to="/auth"/>
        )
    }


})

export default PrivateRouter