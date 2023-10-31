import AppRouter from "./router";
import { useEffect } from "react";
import { useStores } from "./stores/root-context";

function App() {

  const {user} = useStores();

  useEffect(() => {
      if (user.isAuth === false) {
        user.checkAuth();
      }
  }, [user.isAuth])

  return (
    <>
      <AppRouter/>
    </>
  )
}

export default App
