import { makeAutoObservable } from "mobx";

class MessageStore {
    messages:string[] = [];
    aiMessages:string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setAiMessages(value: string) {
        this.aiMessages = [...this.aiMessages, value];
    }

    clearAiMessages() {
        this.aiMessages = [];
    }

    setMessages(value: string) {
        this.messages = [...this.messages, value];
    }

    clearMessages() {
        this.messages = [];
    }

}

export default new MessageStore();