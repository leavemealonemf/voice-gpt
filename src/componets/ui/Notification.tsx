import {FC} from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    closeNotificationHandler: () => void;
}

const Notification: FC<Props> = ({closeNotificationHandler}) => {

  const {t} = useTranslation();

  return (
    <div className="flex absolute top-4 right-4 z-50 rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
        <span className="text-3xl"><i className="bx bx-check" /></span>
        <p className="font-bold">{t('empty_voice_message_popup')}</p>
        <span className='pl-2 pb-2 cursor-pointer' onClick={() => closeNotificationHandler()}>X</span>
    </div>
  )
}

export default Notification