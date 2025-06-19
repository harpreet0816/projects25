 // Import tRPC functions to create a client for calling server APIs.
// `createTRPCProxyClient` makes the client,
// and `httpBatchLink` sets up HTTP communication with request batching.
//   createTRPCProxyClient
// ➤ This function helps you create a client that can call your server's API functions as if they were local functions.
// (It gives you a nice autocomplete-friendly way to talk to your backend.)

// httpBatchLink
// ➤ This sets up how the client connects to the server – in this case, it uses HTTP and combines multiple API requests into one to improve performance.
  import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

 import type { UrlRouter } from './../../backend/src/routers/urlRouter';
  const trpcClient = createTRPCProxyClient<UrlRouter>({
    links: [
        httpBatchLink({
            url: "http://localhost:3000/trpc"
        }),
    ]
  })
  
  export default trpcClient; 