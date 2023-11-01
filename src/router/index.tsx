import {Routes, Route} from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import PrivateRouter from "./private";
import MainPage from "../pages/MainPage";
import AskPagePrototype from "../pages/AskPagePrototype";
import SettingsPage from "../pages/SettingsPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PrivateRouter/>}>
                <Route path="/gpt" element={<AskPagePrototype/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>
            </Route>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
        </Routes>
    )   
}

export default AppRouter