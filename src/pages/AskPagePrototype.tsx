import Layout from "../componets/Layout"
import Messages from "../componets/Messages"
import SideBar from "../componets/SideBar"
import { useState, KeyboardEvent, ChangeEvent } from "react";
import gptService from "../services/gpt.service";
import { inputValidate } from "../utils/input-validate";
import Notification from "../componets/ui/Notification";
import { useStores } from "../stores/root-context";
import { observer } from "mobx-react-lite";
import { aiVoiceTypes } from "../types/settings";
import { useTranslation } from 'react-i18next';

const AskPagePrototype = observer(() => {

    const conversation: any[] = [];
    const [messageEvent, setMessageEvent] = useState('');
    const [voiceMessage, setVoiceMessage] = useState<any[]>([]);
    const [recording, setRecording] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSpeechEmpty, setIsSpeechEmpty] = useState(false);

    const {t} = useTranslation();

    const {messageStore} = useStores()

    const windowObj: any = window;

    const speechRecognizer = new windowObj.webkitSpeechRecognition;
    
    const speech = () => {
        if (recording === true || isDisabled === true) {
            return;
        }
        setIsSpeechEmpty(false)
        setRecording(true);
        speechRecognizer.start();
    }

    const talk = (text: string) => {
        let textToTalk = new windowObj.SpeechSynthesisUtterance(text);
        textToTalk.rate = 1.5;
        textToTalk.pinch = 0.1;
        speechSynthesis.speak(textToTalk);
    }
  
    const closeNotificationHandler = () => setIsSpeechEmpty(false);

    const showEmptySpeechError = () => {
        setIsSpeechEmpty(true);
    }

    speechRecognizer.onend = () => {
        if(!inputValidate(voiceMessage[0])) {
            setRecording(false);
            showEmptySpeechError();
        } 
        setRecording(false);
    }

    speechRecognizer.onresult = (e: any) => {
        setRecording(false);
        voiceMessage.push(e.results[0][0].transcript);
        sendMessage();
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (isDisabled || !inputValidate(messageEvent)) {
                return;
            } else {
                sendMessage();
            }
        }
    };

    const sendMessage = async () => {
        setIsDisabled(true)
        setLoading(true);

        const message = {
            "role": "user",
            "content": voiceMessage.length > 0 ? voiceMessage[0] : messageEvent,
        }

        messageStore.setMessages(voiceMessage.length > 0 ? voiceMessage[0] : messageEvent);

        conversation.push(message);
        
        const param = {
            "model": "gpt-3.5-turbo",
            "messages": conversation,
        }

        const res = await gptService.askQuestion(param);

        const gptMessage = {
            "role": "assistant",
            "content": voiceMessage.length > 0 ? voiceMessage[0] : messageEvent,
        }

        if (localStorage.getItem('aiVoice') === aiVoiceTypes.ON) {
            talk(res.data.choices[0].message.content);
        }

        conversation.push(gptMessage);

        setMessageEvent('');
        setVoiceMessage([]);
        setIsDisabled(false)
        setLoading(false);

        messageStore.setAiMessages(res.data.choices[0].message.content);
    }

    return (
        <Layout>
            <SideBar/>
            <div className="bg-white rounded w-screen">
                    <div className="container flex mx-auto items-center justify-center h-screen relative">
                        
                        {isSpeechEmpty && <Notification closeNotificationHandler={closeNotificationHandler}/>}

                        {messageStore.messages.length === 0 && (
                            <h1 className="absolute mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-600 md:text-5xl lg:text-6xl dark:text-gray-600 text-center">VoiceGPT</h1>
                        )}

                        <Messages loading={loading} />

                        {/* Text area */}
                        <div className="absolute bottom-0 self-center w-full">
                            <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-white">
                    
                                <input id="chat"
                                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder={t('send_a_message')} 
                                    value={messageEvent} 
                                    onKeyPress={handleKeyPress}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMessageEvent(e.currentTarget.value)}
                                />
                                <button 
                                    onClick={() => sendMessage()}
                                    disabled={isDisabled || !inputValidate(messageEvent)}
                                    type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                    <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                                </button>
                        
                                <div 
                                    onClick={() => speech()} 
                                    className="record ml-2"
                                    style={recording ? {animation:'rec 1s ease-in-out infinite'} : {}} 
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                            </div>
                        </div>  
                        {/* End Text area */}
                    </div>


            </div>
        </Layout>
    )
})

export default AskPagePrototype