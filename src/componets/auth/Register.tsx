import {useState, ChangeEvent, FC} from 'react';
import { useStores } from '../../stores/root-context';
import { useNavigate } from 'react-router-dom';
import { currentModuleTypes } from '../../pages/AuthPage';

type Props = {
    setCurrentModuleHandler: (value: currentModuleTypes) => void;
}

const Register: FC<Props> = ({setCurrentModuleHandler}) => {

    const {user} = useStores();

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password.length < 6) {
            alert('Пароль должен содержать не менее 6 символов');
            return;
        }

        const userData = await user.register(email, password);
        if (!userData) {
            alert('Ошибка попробуйте снова');
            
        }
        navigate('/gpt');
    }

    return (
        <form className='w-96 flex flex-col' onSubmit={onSubmit}>
            <span className="text-white font-bold text-3xl mb-5">Регистрация</span>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Почта</label>
                <input
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} 
                    type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required 
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                <input
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} 
                    type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                />
            </div>
            <button type="submit" className="text-white self-start bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Зарегистрироваться</button>
            <span
                onClick={() => setCurrentModuleHandler(currentModuleTypes.LOGIN)}
                className='text-white text-xs mt-3 font-normal cursor-pointer'>Уже зарегистрированы? Войти
            </span>
        </form>
    )
}

export default Register