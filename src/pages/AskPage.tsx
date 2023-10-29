import { useState, BaseSyntheticEvent } from "react";
import gptService from "../services/gpt.service";

const AskPage = () => {

    const [conversation, setConversation] = useState<any[]>([]);
    const [messageEvent, setMessageEvent] = useState('');
    const [aiMessages, setAiMessages] = useState<string[]>([]);

    const sendMessage = async () => {

        const message = {
            "role": "user",
            "content": messageEvent,
        }

        conversation.push(message);
        
        const param = {
            "model": "gpt-3.5-turbo",
            "messages": conversation,
        }

        const res = await gptService.askQuestion(param);

        const gptMessage = {
            "role": "assistant",
            "content": messageEvent,
        }

        conversation.push(gptMessage);

        setAiMessages([...aiMessages, res.data.choices[0].message.content])
    }
    
    return (
        <>
            <input type="text" value={messageEvent} onChange={(e: BaseSyntheticEvent) => setMessageEvent(e.currentTarget.value)}/>
            <button onClick={() => sendMessage()}>Спросить</button>
            <div>
                {aiMessages?.map((aiMessage, index) => 
                    <p key={index}>{aiMessage}</p>    
                )}
            </div>
        </>
    )
}

export default AskPage