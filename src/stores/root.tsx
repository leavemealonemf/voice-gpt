import messageStore from "./message-store";
import userStore from "./user-store";

class RootStore {
    user = userStore;
    messageStore = messageStore;
}

export default RootStore;