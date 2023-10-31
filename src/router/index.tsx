import {Routes, Route} from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import AskPage from "../pages/AskPage";
import PrivateRouter from "./private";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PrivateRouter/>}>
                <Route path="/gpt" element={<AskPage/>}/>
            </Route>
            <Route path="/auth" element={<AuthPage/>}/>
        </Routes>
    )   
}

export default AppRouter