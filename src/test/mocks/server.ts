import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

server.events.on("request:unhandled", req => {
  console.error("Unhandled request:", req.method, req.url);
});