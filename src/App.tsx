import AppRouter from "./router";
import { useEffect } from "react";
import { useStores } from "./stores/root-context";

function App() {

  const {user} = useStores();

  useEffect(() => {
      if (localStorage.getItem('token')) {
        user.checkAuth();
      }
  }, [])

  return (
    <>
      <AppRouter/>
    </>
  )
}

export default App
