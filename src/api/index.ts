import axios from "axios";

export const KEY = import.meta.env.VITE_API_KEY;

const $api = axios.create({
    headers: {
        Authorization: `Bearer ${KEY}`
    }
})

export default $api;