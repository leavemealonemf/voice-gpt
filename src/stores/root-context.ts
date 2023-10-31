import { createContext, useContext } from "react";
import RootStore from "./root";

export const RootStoreContex = createContext<RootStore | null>(null);

export const useStores = () => {
    const contex = useContext(RootStoreContex);

    if (contex === null) {
        throw new Error('Приложение не обернуто в пройвайдер');
    }
    
    return contex;
}