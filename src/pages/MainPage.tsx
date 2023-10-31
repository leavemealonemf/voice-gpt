import { observer } from "mobx-react-lite";
import mainLogo from "../assets/mainlogo.png";
import { useStores } from "../stores/root-context";
import { useNavigate } from "react-router-dom";
import Loading from "../componets/ui/Loading";

const MainPage = observer(() => {

    const {user} = useStores();

    const navigate = useNavigate();

    if (user.loading === true) {
        return <Loading/>
    }

    const handleStart = () => {
        if (user.unauthorize === false) {
            navigate('/gpt');
        } else {
            navigate('/auth');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img src={mainLogo} alt="main" width={235} height={235}/>
            <h1 style={{fontSize: '42px', color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Добро пожаловать в VoiceGPT!</h1>
            <span className="text-white text-center">VoiceGpt - интеграция ChatGPT API с возможностью поиска информации с помощью голосового поиска</span>
            <button
                onClick={() => handleStart()} 
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-3"
            >
                Начать
            </button>
        </div>
    )
})

export default MainPage