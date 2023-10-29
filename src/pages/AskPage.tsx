import { useState, BaseSyntheticEvent } from "react";
import gptService from "../services/gpt.service";

const AskPage = () => {

    const [conversation, setConversation] = useState<any[]>([]);
    const [messageEvent, setMessageEvent] = useState('');
    const [aiMessages, setAiMessages] = useState<string[]>([]);
    const [voiceMessage, setVoiceMessage] = useState<any[]>([]);

    const windowObj: any = window;

    const speechRecognizer = new windowObj.webkitSpeechRecognition;
    
    const speech = () => {
        speechRecognizer.start();
    }

    speechRecognizer.onresult = (e: any) => {
        voiceMessage.push(e.results[0][0].transcript)
        sendMessage()
    }

    const sendMessage = async () => {

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

        conversation.push(gptMessage);

        setMessageEvent('');
        setVoiceMessage([]);

        setAiMessages([...aiMessages, res.data.choices[0].message.content])
    }
    
    return (
        <>
            <input type="text" value={messageEvent} onChange={(e: BaseSyntheticEvent) => setMessageEvent(e.currentTarget.value)}/>
            <button onClick={() => sendMessage()}>Спросить</button>
            <button onClick={() => speech()}>Войс</button>
            <div>
                {aiMessages?.map((aiMessage, index) => 
                    <p key={index}>{aiMessage}</p>    
                )}
            </div>
        </>
    )
}

export default AskPage