import {FC} from 'react';
import exitIcon from '../assets/power.png';
import settingIcon from '../assets/settings.png';
import { useStores } from '../stores/root-context';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SideBar: FC = () => {

  const {user} = useStores();

  const {t} = useTranslation();

  const navigate = useNavigate();


  return (
    <div className={`text-white min-h-screen w-72`}>

      <div className='flex flex-col items-center justify-center mt-7'>
        <span className='text-center mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white'>VoiceGPT</span>
        <span className='text-sm font-normal text-gray-500 dark:text-gray-400 -mt-3'>Version beta 0.1</span>
      </div>


      <div className='flex flex-col absolute bottom-6 left-4 cursor-pointer gap-3'>

        <div className='flex items-center' onClick={() => navigate('/settings')}>
          <img src={settingIcon} alt="settings" width={19} height={19}/>
          <span className='pl-1 text-center leading-none tracking-tight text-gray-900 dark:text-white'>{t('settings')}</span>
        </div>

        <div className='flex items-center' onClick={async() => await user.logout()}>
          <img src={exitIcon} alt="exit" width={19} height={19}/>
          <span className='pl-1 text-center leading-none tracking-tight text-gray-900 dark:text-white'>{t('exit')}</span>
        </div>

      </div>

    </div>
  )
}

export default SideBar