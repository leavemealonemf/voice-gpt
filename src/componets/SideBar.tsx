import {FC} from 'react';
import exitIcon from '../assets/power.png';
import { useStores } from '../stores/root-context';

const SideBar: FC = () => {

  const {user} = useStores();

  return (
    <div className='text-white container mx-auto relative'>

      <div className='flex flex-col items-center justify-center mt-7'>
        <span className='text-center mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white'>VoiceGPT</span>
        <span className='text-sm font-normal text-gray-500 dark:text-gray-400 -mt-3'>Version beta 0.1</span>
      </div>


      <div className='flex items-center absolute bottom-5 ml-3 cursor-pointer' onClick={async() => await user.logout()}>
        <img src={exitIcon} alt="exit" width={24} height={24}/>
        <span className='text-center leading-none tracking-tight text-gray-900 dark:text-white'>Выйти</span>
      </div>
    </div>
  )
}

export default SideBar