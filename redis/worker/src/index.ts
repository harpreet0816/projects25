import { createClient } from "redis";

const client = createClient();

async function main () {
    await client.connect();
    while (1) {
       const response = await client.brPop("submissions", 0);
       await new Promise(r => setTimeout(r, 1000));
        // send it to pub /sub
        console.log("Processed user submissions", response);

    }
}

main();