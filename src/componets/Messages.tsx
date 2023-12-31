import { FC } from 'react';
import MessageTyping from './ui/MessageTyping';
import aiChatIcon from '../assets/robot.png';
import userChatIcon from '../assets/user.png';
import { useStores } from '../stores/root-context';


type Props = {
    loading: boolean;
}

const Messages: FC<Props> = ({loading}) => {

    const {messageStore} = useStores();

    return (
        <div className="w-full max-h-screen h-5/6 px-5 flex flex-col justify-between overflow-y-auto mb-12"> 

            <div className="flex flex-col mt-5">

                {messageStore.messages.map((message, index) =>
                    <>
                        <div className="flex justify-end mb-4" key={index}>
                            <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                                {message}
                            </div>
                            <img src={userChatIcon} className="object-cover h-8 w-8 rounded-full"  />
                        </div>

                        {messageStore.aiMessages[index] && (   
                            <div className="flex justify-start mb-4" key={index + 1}>
                                <img src={aiChatIcon} className="object-cover h-8 w-8 rounded-full"  />
                                <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                    {messageStore.aiMessages[index]}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {loading ? (
                    <div className="flex justify-start mb-4">
                        <img src={aiChatIcon} className="object-cover h-8 w-8 rounded-full"  />
                        <MessageTyping/>
                    </div>
                ): null}


            </div>
        </div>
    )
}

export default Messages