# fullstackopen 2025

is in progress from April, 2025. Hyosun Kim is a student of Royal Institute of Technology (KTH), in Sweden.

## my Q&A

**🐥 Why do use different ports in Development server?** (Part 4)


🐓Because Backend and Frontend are different processes in Development server, unlike Production Server.

Production Server(Express, Djanog...etc): Backend logic lives. And backend and frontend served together at one port.

Development Server(React, Vite, Next,js...etc): Frontend codes lives. Here, backend and frontend are different two processes. So running them separately makes development faster and easier.
To handle requests from different ports (from back/frontend) we can use **CORS / Proxy**.


## Appendix
**Port** is a communication endpoint and listens for requests.

**Async**  declare a function as asynchronous which will require time to complete that JavaScript may have to wait for. And it returns a Promise.

**Await** is an operator and is possible only inside of an async function. And it waits for a Promise.
