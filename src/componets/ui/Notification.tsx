import {FC} from 'react';

const Notification: FC = () => {
  return (
    <div className="flex items-center space-x-2 fixed left-5 bottom-8 z-50 rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
        <span className="text-3xl"><i className="bx bx-check" /></span>
        <p className="font-bold">Чтобы задать вопрос GPT нажмите на значок микрофона<br/>и скажите информацию</p>
    </div>
  )
}

export default Notification