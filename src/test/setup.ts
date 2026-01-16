import "@testing-library/jest-dom";
import { server } from "./mocks/server";

beforeAll(() => {
  // log any unmocked request
  server.events.on("request:unhandled", (req) => {
    console.error(
      "Unhandled request:",
      req.method,
      req.url
    );
  });

  server.listen({
    onUnhandledRequest: "bypass",
  });
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());