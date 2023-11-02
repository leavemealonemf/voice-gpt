import { observer } from "mobx-react-lite";
import mainLogo from "../assets/mainlogo.png";
import { useStores } from "../stores/root-context";
import { useNavigate } from "react-router-dom";
import Loading from "../componets/ui/Loading";
import { useTranslation } from "react-i18next";
import Header from "../componets/Header";

const MainPage = observer(() => {

    const {user} = useStores();

    const {t} = useTranslation();

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
        <>
        <Header/>
            <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center h-screen">
                <img src={mainLogo} alt="main" width={235} height={235}/>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-center text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{t('welcome_to')} <span className="text-blue-600 dark:text-blue-500">{t('voice_gpt')}</span></h1>
                <span className="text-lg text-center font-normal text-gray-500 lg:text-xl dark:text-gray-400">{t('voice_gpt_about')}</span>
                <button
                    onClick={() => handleStart()} 
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-4"
                >
                    {t('get_started')}
                </button>
            </div>
            </div>
        </>
    )
})

export default MainPage