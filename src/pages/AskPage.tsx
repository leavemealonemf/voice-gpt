import { useState, BaseSyntheticEvent } from "react";
import gptService from "../services/gpt.service";
import MessageTyping from "../componets/ui/MessageTyping";

const AskPage = () => {

    //@ts-ignore
    const [conversation, setConversation] = useState<any[]>([]);
    const [messageEvent, setMessageEvent] = useState('');
    const [aiMessages, setAiMessages] = useState<string[]>([]);
    const [voiceMessage, setVoiceMessage] = useState<any[]>([]);
    const [recording, setRecording] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const windowObj: any = window;

    const speechRecognizer = new windowObj.webkitSpeechRecognition;
    
    const speech = () => {
        if (recording === true || isDisabled === true) {
            return;
        }
        setRecording(true);
        speechRecognizer.start();
    }

    const talk = (text: string) => {
        let textToTalk = new windowObj.SpeechSynthesisUtterance(text);
        textToTalk.rate = 1.5;
        textToTalk.pinch = 0.1;
        speechSynthesis.speak(textToTalk);
    }
  

    speechRecognizer.onresult = (e: any) => {
        setRecording(false);
        voiceMessage.push(e.results[0][0].transcript)
        sendMessage()
    }

    const sendMessage = async () => {
        setIsDisabled(true)
        setLoading(true);

        const message = {
            "role": "user",
            "content": voiceMessage.length > 0 ? voiceMessage[0] : messageEvent,
        }

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

        talk(res.data.choices[0].message.content)

        conversation.push(gptMessage);

        setMessageEvent('');
        setVoiceMessage([]);
        setIsDisabled(false)
        setLoading(false);

        setAiMessages([...aiMessages, res.data.choices[0].message.content])
    }
    
    return (
        <>
            <div className="m-8 flex flex-col max-w-2xl">
                <input type="text" 
                    value={messageEvent} 
                    onChange={(e: BaseSyntheticEvent) => setMessageEvent(e.currentTarget.value)}
                    className="border-white rounded h-8"
                />
                <div className="flex flex-row gap-2 mt-3 items-center">
                    <button
                        disabled={isDisabled}
                        className="border-2 p-1 enabled:hover:text-black enabled:hover:bg-white disabled:opacity-20"
                        onClick={() => sendMessage()}>Спросить</button>
                    <div onClick={() => speech()} 
                        className="record"
                        style={recording ? {animation:'rec 1s ease-in-out infinite'} : {}}    
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                </div>
                <div className="mt-2 flex flex-col">
                    {aiMessages?.map((aiMessage, index) => 
                        <div className="mt-3 flex float-left gap-1" key={index}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-5 h-5 mt-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                            <p>{aiMessage}</p>    
                        </div> 
                    )}
                    {loading && <MessageTyping/>}
                </div>
            </div>
        </>
    )
}

export default AskPage