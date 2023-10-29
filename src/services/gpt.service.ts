import $api from "../api";

class GptService {
    async askQuestion(param: {}) {
        return await $api.post('https://api.openai.com/v1/chat/completions', param);
    }
}

export default new GptService();