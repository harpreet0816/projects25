import { startLogger } from "./logger";
import { gameManager } from "./store";

// startLogger();

// setInterval(() => {
//     gameManager.addGame(Math.random().toString())
// }, 5000);
import { PubSubManager } from "./PubSubManager";

const s = setInterval(() => {
    PubSubManager.getInstance().userSubscribe(Math.random().toString(), "APPL");
}, 5000);

setTimeout(()=> {
    clearInterval(s);
    PubSubManager.getInstance().disconnect();
}, 17000)
