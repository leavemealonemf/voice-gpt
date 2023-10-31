import { observer } from "mobx-react-lite";
import Register from "../componets/auth/Register";
import Login from "../componets/auth/Login";
import {useState} from "react";

export enum currentModuleTypes {
    LOGIN = 'login',
    REGISTER = 'register',
}

const AuthPage = observer(() => {

    const [currentModule, setCurrentModule] = useState<currentModuleTypes>(currentModuleTypes.REGISTER);

    const setCurrentModuleHandler = (value: currentModuleTypes) => setCurrentModule(value);

    return (
        <div className="flex items-center justify-center h-screen">
            {
                currentModule === currentModuleTypes.REGISTER ? 
                <Register setCurrentModuleHandler={setCurrentModuleHandler}/> 
                : <Login setCurrentModuleHandler={setCurrentModuleHandler}/>
            }
        </div>
    )
})

export default AuthPage