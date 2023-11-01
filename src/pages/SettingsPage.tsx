import { useId, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/back.png";
import { aiVoiceTypes } from "../types/settings";
import { useTranslation } from "react-i18next";

const SettingsPage = () => {

    const [checked, setChecked] = useState<boolean>(
        localStorage.getItem('aiVoice') === aiVoiceTypes.ON ? true : false
    );

    const {t} = useTranslation();
        
    const checkedHandler = () => setChecked(!checked)

    const navigate = useNavigate();

    useEffect(() => {
        if(checked === true) {
            localStorage.setItem('aiVoice', aiVoiceTypes.ON)
        } else {
            localStorage.setItem('aiVoice', aiVoiceTypes.OFF)
        }

    }, [checked])

    

    return (
        <div className="container mx-auto">

            <div className="h-screen w-screen fixed top-0 left-0 flex flex-col items-center justify-center text-center">
                <span className="text-center mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">{t('settings')}</span>
                <div className="h-52 w-96 bg-white rounded">
                    <div className="py-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultValue={useId() || ''} checked={checked} onChange={checkedHandler}/>
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-700">{t('voice_acting')}</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="absolute top-4 left-4" onClick={() => navigate('/gpt')}>
                <img src={backIcon} alt="back" width={30} height={30} className="cursor-pointer"/>
            </div>
        </div>
    )
}

export default SettingsPage