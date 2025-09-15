# fullstackopen 2025

is in progress from April, 2025. Hyosun Kim is a student of Royal Institute of Technology (KTH), in Sweden.

## Web Programming
### Dynamic Website
![Alt text](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction/web_application_with_html_and_steps.png)

(image from [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction))

A dynamic web app is one where the **UI changes based on user actions, data, or backend responses**.

Requests for dynamic resources are instead forwarded (2) to server-side code (shown in the diagram as a Web Application). For "dynamic requests" the server interprets the request, reads required information from the database (3), combines the retrieved data with HTML templates (4), and sends back a response containing the generated HTML (5,6).

A dynamic site can return different data for a URL based on information provided by the user or stored preferences and can perform other operations as part of returning a response (e.g., sending notifications).

Most of the code to support a dynamic website must run on the server. Creating this code is known as "**server-side programming**" (or sometimes "**back-end scripting**").

In a modern dynamic web app **State + Templates + Routing** is the core concepts. But it usually relies on other several **essential concepts**:
+ **State**
+ **Templates / Rendering**
+ **[Routing](https://expressjs.com/en/starter/basic-routing.html)**
+ Event Handling
+ Error Handling
+ API / Backend Communication
+ State Persistence / Storage
+ [Conditional Rendering](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#conditional-rendering) / Logic
+ Componentization (Breaking UI into reusable pieces)
+ Performance Optimization (Efficient updates and minimizing resource usage)

### Functional Programming
[Functional programming](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84) is a programming paradigm in which we try to bind everything in pure mathematical functions. It is a declarative style. Its main focus is on “what to solve,” in contrast to an imperative style, where the main focus is on “how to solve.” It uses expressions instead of statements. An expression is evaluated to produce a value, whereas a statement is executed to assign variables.

+ Core Idea of FP
  - **Pure functions**: A function always produces the same output for the same input and doesn’t modify external state (**no side effects**).
  - **Immutability**: Data is not changed once created; instead, new data structures are returned.
  - **First-class functions**: Functions are treated as **values** — they can be assigned to variables, passed as arguments, and returned from other functions.
  - **Higher-order functions**: Functions that take other functions as inputs or return them as outputs (e.g., <code>map</code>, <code>filter</code>, <code>reduce</code>).
  - **Declarative style**: Focus on **what to do** rather than _how to do_ it. You describe transformations of data, and the language/runtime handles the control flow.
  - **Recursion over loops**: Since **mutability and iteration are often avoided**, recursion is commonly used to express repetition (= loops: <code>for</code>, <code>while</code>). Which means, in functional programming, we don’t usually use loops (<code>for</code>, <code>while</code>) because they depend on changing variables (mutability).
    ```js
    // ❌ express repetition (loop)
    for (let i = 3; i > 0; i--) {
      console.log(i);
    }
    ```
    ```js
    // ✅ recursion which is a function that calls itself until it reaches a stopping point.
    function countdown(n) {
      if (n === 0) return;
      console.log(n);
      countdown(n - 1); // calls itself
    }
    countdown(3);
    // prints 3, 2, 1

    ```

## Classification
### Frontend Technologies for Web Apps
#### Frameworks:
+ Angular
+ Vue
+ Svelte / SvelteKit
#### Libraries:
+ state management → **frontend only**
  - **React**
  - **Redux**
  - MobX
  - Pinia (state management)
+ HTTP / API calls
  - **Axios**
  - React Query
  - svelte-query
+ UI / styling
  - Material-UI
  - Vuetify
  - Angular Material
  - Tailwind CSS
#### APIs:
+ Browser APIs: <code>fetch()</code>, <code>localStorage</code>, <code>IndexedDB</code>, <code>WebSocket</code>
+ Third-party APIs: Google Maps API, Stripe API, OpenWeatherMap API

### Backend Technologies for Web Apps
#### Frameworks:
+ **Node.js: Express, NestJS**, Koa, Fastify
+ Python: Flask, Django REST Framework, FastAPI
+ Java: Spring Boot, JAX-RS
+ C#/.NET: ASP.NET Core Web API
+ Ruby: Ruby on Rails, Sinatra
+ Go: Gin, Echo, Fiber
#### Libraries:
+ HTTP / Routing
  - **Axios** (server-to-server)
  - Requests (Python)
  - OkHttp (Java)
  - HttpClient (.NET)
+ Database → **backend only**
  - **Mongoose** (Node.js)
  - Sequelize
  - SQLAlchemy (Python)
  - Hibernate (Java)
+ Authentication / Security → **backend only**
  - **JWT**
  - Passport.js
#### APIs:
+ **REST / GraphQL** APIs exposed to clients
+ Third-party APIs: Google Maps API, Stripe API, OpenWeatherMap API

#### Cloud Service
+ **mongoDB Atlas**

  - Let's say...
  - **MongoDB** (locally): buying books and keeping them on your own bookshelf at home.
  - **MongoDB Atlas** (in the cloud/ internet): renting the e-books in a cloud library that handles storage, backups, and access.
  - **Mongoose**: the app or tool that helps you find, read, and organize the e-books efficiently.

## Workflow
```
Frontend request →
API →
Framework uses Libraries →
Backend processes →
API response →
Frontend
```
**Frameworks**: Provide structure and core functionality for building the application.
+ Frontend: Build the user interface (UI) and handle interaction with users.
+ Backend: Build the server-side logic that handles requests, stores/retrieves data, and communicates with other services

**Libraries**: Add functionality to make development easier, faster, or more organized.
+ Frontend: state, UI, and API calls
+ Backend: database access, HTTP clients, authentication, and messaging.

**APIs**: Defines how frontend and backend talk. Frontend doesn’t access the backend directly is because of security, structure, and separation of concerns.
+ Frontend: allow communicate with database, external services, and the browser
+ Backend: allow to expose endpoints to clients, communicate with microservices, or connect to external services.

| Component               | Bank Analogy                                     | Explanation                                                                                                                                          |
| ----------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Client (Frontend)**   | Customer                                         | The person interacting with the bank — uses the UI (ATM, website, app) to request actions.                                                           |
| **Framework (Backend)** | Bank                        | The bank runs the system and provides structure & rules for processing requests — organizes workflow, decides how requests are handled.                                         |
| **Library**             | Specialized tools / forms                        | Pre-made tools, like helper, that staff can use to make tasks easier (e.g., automated form generator for account applications, calculators, checklists). Not required, but speeds things up.                   |
| **API**                 | Teller / Menu / Bank interface                   | The banker or interface the customer uses to request services — defines what actions are allowed (withdraw, deposit, check balance) and how requests are sent. |
| **Database (DB)**       | Vault / Safe                                     | Stores the actual money (data). Backend accesses this securely; clients never access it directly.                                                    |
| **Mongoose**       | Ledger + Forms + Clerk                                     | Helps the bank staff (Node.js) interact with the vault (MongoDB) safely and efficiently — pre-defines formats (schemas), validates entries, makes querying simpler.                                                    |
| **Node.js**       | The Bank building                                     | Provides the environment where everything runs. Without it, nothing can operate: the tellers (Express) can’t interact with customers, and the clerks/ledger (Mongoose) can’t access the vault (MongoDB)                                                   |
| **Request**             | Customer request (withdraw money, check balance) | The message sent from client to API describing what the customer wants.                                                                              |
| **Response**            | Teller response (money, account info)            | The result sent back to the client after backend processes the request.                                                                              |

### Workflow Scenario
1. **Customer (frontend)** wants $100 → sends a **request** to the **teller (API)**.
2. **Teller (API)** passes the request to bank staff / branch system (framework).
3. Staff (framework) uses tools/forms (libraries) to validate and process the request.
4. Staff accesses the vault (database) to withdraw $100.
5. Teller (API) sends the response back to the customer: “Here’s your $100.”

## Frameworks
### Frontend Only
+ Angular
+ Vue.js
+ Svelte

### Backend Only
+ Express.js
+ Nest.js
+ WHY?
  - They require a **Node.js runtime**, which runs on a server, not in the browser.
  - Frontend frameworks/libraries like React, Vue, or Angular run in the browser, which cannot execute server-side Node.js code.

### Both
+ [Next.js](https://nextjs.org/) is a React framewor, which means Next.js is built on top of React, so you still write React components for your UI. And it provides extra features React alone doesn’t have, like:
  + Server-side rendering (SSR)
  + Static site generation (SSG)
  + API routes (backend endpoints)
  + File-based routing

## Libraries
### Frontend Only
+ [React](https://react.dev/) is a free and open-source front-end JavaScript **library** that aims to make **building user interfaces (UI)** based on components more "seamless".
  - Because it does **not** include built-in routing, state management **across the whole app**, or full project **structure** — you add those via other libraries like Redux, React Router, or Next.js.

  But one of the main reasons React is often called a “**frontend framework**” is that :
  - React’s efficient UI rendering and state management.
  - It provides the structure for how the UI updates in response to user interactions.
+ [Redux]() is mostly used with React, but can work elsewhere and is **managing application state**.

### Backend Only
+ [mongoose](https://mongoosejs.com/) is Object Data Modeling (ODM) library for Node.js
+ [Supertest](https://www.npmjs.com/package/supertest) is a Node.js library that helps developers test backend APIs. It calls your Node app directly in memory, without going over HTTP or HTTPS. Which means the code path is exactly the same as real HTTP routes, but it’s all inside Node’s memory.

  It's how Supertest simulates an HTTP request internally:
  1. Creates a fake request object.
  2. Passes it to your Express app handlers.
  3. Gets the response object.

+ [bcrypt](https://www.npmjs.com/package/bcrypt) is Node.js library that secure hash passwords and compare hashes for authentication.
1
### Both
+ [Axios](https://axios-http.com/)

## API
+ [REST](https://en.wikipedia.org/wiki/REST#Applied_to_web_services)
+ [GraphQL](https://graphql.org/)
+ [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

## Tools
+ [Vite](https://vite.dev/) is a modern frontend build tool and become very popular in the React, Vue, Svelte, and other JS/TS ecosystems. In this fullstack project, this command line is used to setup.
  ```
  npm create vite@latest projectname -- --template react

  cd projectname
  npm install

  npm run dev
  ```

+ [Babel](https://babeljs.io/) is a JavaScript tool — more specifically, it’s a JavaScript compiler (or transpiler). Babel takes modern JavaScript (or JSX, TypeScript, etc.) and transforms it into plain JavaScript that all browsers can understand. Projects created with **Vite** are configured to compile automatically.

## Extensions
+ [JSONView](https://chromewebstore.google.com/detail/jsonview/gmegofmjomhknnokphhckolhcffdaihd?pli=1)
+ [React Developr Tool](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

## Reading Materials
+ [Linear algebra](https://www.csc.kth.se/~weinkauf/teaching/visualization/index.html)
+ [immersive math](https://immersivemath.com/ila/learnmore.html)
+ [Computer Vision](https://www.spiceworks.com/tech/artificial-intelligence/articles/what-is-computer-vision/)
+ [You Don't Know JS Yet](https://github.com/getify/You-Dont-Know-JS?tab=readme-ov-file)
+ [How to Manage JavaScript Fatigue](https://auth0.com/blog/how-to-manage-javascript-fatigue/)
+ [Eloquent JavaScript](https://eloquentjavascript.net/)
+ [The browser as runtime environment](https://fullstackopen.com/en/part2/getting_data_from_server#the-browser-as-a-runtime-environment)
+ [Single thread](https://medium.com/techtrument/multithreading-javascript-46156179cf9a)
+ [What the heck is the event loop](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
+ [Egghead](https://egghead.io/)
+ [Guide to React](https://egghead.io/courses/the-beginner-s-guide-to-react)
+ [React with Class Components Fundamentals](https://egghead.io/courses/react-with-class-components-fundamentals-4351f8bb)
+ [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
+ [Shallow Copy](https://en.wikipedia.org/wiki/Object_copying#Shallow_copy)
+ [Single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)
+ [Anti-pattern](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/)
+ [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning#breaking-rules-of-hooks)
+ [Representational State Transfer: REST](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
+ [RESTful Maturnity](https://martinfowler.com/articles/richardsonMaturityModel.html)
+ [Transitive dependencies](https://lexi-lambda.github.io/blog/2016/08/24/understanding-the-npm-dependency-model/)
+ [Debugging](https://tenderlovemaking.com/2016/02/05/i-am-a-puts-debuggerer/)
+ [Beyond debugging](https://swizec.com/blog/javascript-debugging-slightly-beyond-consolelog/)
+ [Node.js - Worker thread pool](https://kinsta.com/knowledgebase/what-is-node-js/)
+ [Static code analysis](https://en.wikipedia.org/wiki/Static_program_analysis)
+ [JavaScript Style Guide -  Airbnb style guide](https://github.com/airbnb/javascript)
+ [Ready-made configuration -  Airbnb configuration](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
+ [Regular Expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)
+ [bcrypt](https://codahale.com/how-to-safely-store-a-password/)
+ [Salt Rounds](https://github.com/kelektiv/node.bcrypt.js/#a-note-on-rounds)
+ [One-way hash function](https://en.wikipedia.org/wiki/Cryptographic_hash_function)
+ [A Note on Rounds](https://github.com/kelektiv/node.bcrypt.js/#a-note-on-rounds)
+ [test-driven development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development)
+ [Token-based authentication](https://www.digitalocean.com/community/tutorials/the-ins-and-outs-of-token-based-authentication#how-token-based-works)

## Someone/things to know
+ [John Mccarthy](https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist))
+ [Arvind Sanjeev](https://arvindsanjeev.com/projects.html)
+ [Emma Frid](https://sites.google.com/view/emmafrid/home)
+ [mschf](https://mschf.com/)
+ [Data Driven Graphics](https://dribbble.com/tags/data-driven)
+ [The Psychophysics of Human Sound Localization](https://direct.mit.edu/books/oa-monograph/4885/Spatial-HearingThe-Psychophysics-of-Human-Sound)
+ [Designing Sound](https://mitpress.mit.edu/9780262014410/designing-sound/)

## Future Plan
+ Typescript
+ Next.js
+ Vue.js
+ Redux.js
+ Axio
+ [WebGL](https://thespatialstudio.de/en/xr-glossary/webgl)
+ [Three.js](https://threejs.org/)
+ Event-driven / Data-driven
+ Algorithm
+ [CSS preprocessor](https://developer.mozilla.org/en-US/docs/Glossary/CSS_preprocessor)
+ [Sentry](https://sentry.io/welcome/)

## Script
+ npm init → npm install
  - <code>npm init</code> creates a package.json file
  - <code>npm install</code> installs the dependency and saves it into package.json.

+ npm create vite@latest introdemo -- --template react
  - Create an application called introdemo, with vite
  - Don't need to do <code>npm init</code> with vite

+ npx json-server --port 3001 db.json
  - Serve the notes we wrote to the file in JSON format (db.json)
  - start the JSON Server on port 3001
  - **json-server** is a handy tool that enables the use of server-side functionality in the development phase without the need to program any of it
  - http://localhost:3001/notes

+ npm install json-server --save-dev
   - Install json-server as a **development dependency**
   - Only used during **development**, not in production.
   - Development dependency is used for testing libraries, linters, bundlers.
   - Add one script <code>"server": "json-server -p 3001 db.json"</code> into package.json
      ```js
      {
        // ...
        "scripts": {
          "dev": "vite",
          "build": "vite build",
          "lint": "eslint .",
          "preview": "vite preview",

          "server": "json-server -p 3001 db.json"
        },
      }
      ```
    - run the command below to start the json-server, without parameter definitions
      ```
      npm run server
      ```

+ npm install axios
  - install axio as a **runtime dependency**
  - Needed when the app is actually running in **production**.
  - Witout runtime dependency, the program can’t execute.
  - **Analogy**
    + **Runtime dependency**: the ingredients you need to actually cook the meal (rice, vegetables).
    + **Dev dependency**: the tools you use in the kitchen but don’t serve with the meal (knife, chopping board).

+ --watch
  - Automatic Change Tracking
  - Use this command: "node --watch index.js"

+ --inspect
  - Debugging with the Chrome developer console
  - Use this command: "node --inspect index.js"

+ node mongo.js myPassword
  - Connects to Atlas and run all the code of mongo.js
  - Such as, _Connects to MongoDB Atlas/ Defines a schema and model/ Creates and saves a new note_

+ node --watch index.js myPassword
  - Connects to Atlas and run all the code of index.js
  - Automatic Change Tracking of index.js

+ npm install dotenv
  - Define environment variables with [dotenv](https://github.com/motdotla/dotenv#readme)

+ npm install cors
  - Allow requests from other origins (SOP/ CORS)
  - Run in backend
  - Since the backend is not expected to be visible to the public in the production environment, it may make more sense to only enable cors from a specific origin (e.g. the front end).

+ npm run build
  - A production build for applications created with Vite
  - Run in frontend

+ cp -r dist ../note_backend
  - Deploying the frontend
  - Run in frontend
  - Copy the production build (the dist directory) to the root of the backend directory
  - Configure the backend to show the frontend's main page (the file dist/index.html) as its main page, by using <code>app.use(express.static('dist'))</code> in backend

+ npm install eslint @eslint/js --save-dev
  - A static code analysis tool (linter) for JavaScript and TypeScript
  - Analyzes the code without running it.
  - Looks for errors, bugs, bad practices, or style issues.
  - Auto-fix many issues (like formatting, unused imports, missing semicolons).
  - A **development dependency** for the backend

+ npx eslint --init
  - [Initialize](https://fullstackopen.com/en/part3/validation_and_es_lint#lint) a default ESlint configuration

+ npm install --save-dev @stylistic/eslint-plugin-js
  - ESLint Stylistic [plugin](https://eslint.style/rules)
  - Defines a set of code style-related rules

+ npx eslint index.js
	- Running the Linter
	- But I'm using <code>npm run lint</code>, which I made a script in package.json file.

+ npm install bcrypt
  - Generating the password hashes
  - Run in backend

+ npm install jsonwebtoken
  - Generate JSON web tokens
  - Run in backend

## Classification

###  API
An application programming interface, which bridge application and database (or other service). **Application ↔ API ↔ Database (or other service)**
1. **Applications (or code)** → the client that wants to use some service or data (e.g., a **frontend app**, a mobile app, or another backend service).
2. **Data or services** → this can be a database, another application, or any system that provides functionality or information.

So the API interface defines _how the application can ask for data or actions_, and the API implementation handles the connection to the database or other systems.

In APIs, the interface **defines how other programs can interact** with the system. It usually includes:
+ **Endpoints** (URL + routes) → **where** to send requests → **server address + routes** (i.e., <code>/api/notes</code>). Not all APIs use URL-based resources; some (like GraphQL) use a single endpoint.
+ **Methods** (or operations) → **what** kind of action you’re performing. In REST APIs, this is typically **HTTP methods** (i.e., <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code>), but other APIs may use different conventions or protocols.
+ **Input** (parameters, request body, or query) → **How** you must format the _request_ → the data or instructions you must provide (**query, JSON, headers**).
+ **Output** (_response_) → **What** you’ll get back, often structured as **JSON, XML, status** or binary depending on the API type.

### REST API
REST API is an architectural style meant for building scalable web applications. In REST, singular things, like notes in the case of our application, are called **resources** in RESTful thinking. Every resource has an associated **URL** which is the resource's unique address (URL is called an **end point**).
+ **Resource**: the “thing” you’re working with (notes)
+ **Endpoint/URL/Route**: the address you use to perform actions on that resource (<code>/notes</code>, <code>/notes/123</code>)

What REST refers to as a [uniform interface](https://en.wikipedia.org/wiki/REST#Architectural_constraints) is that a consistent way of defining interfaces that makes it possible for systems to cooperate.

And REST defines:
+ How **requests** should act
  - Which HTTP methods to use (GET, POST, PUT, DELETE).
  - What kind of data the client should send (JSON body, query parameters, etc.).
  - What status codes to expect in response (200, 201, 404, 500).
+ How the **server** should organize endpoints
  - Each resource (like users, products) gets its own URL path (<code>/api/users</code>).
  - Endpoints are predictable and consistent, making it easier for clients (like Axios) to know how to interact.
+ How **responses** should look
  - Usually JSON format.
  - Often includes a consistent structure, e.g., <code>{ success: true, data: ... }</code>.

[The HTTP standard](https://www.rfc-editor.org/rfc/rfc9110.html#name-common-method-properties) talks about two properties related to request types, **safety** and **idempotency**.
+ Safety, in REST, means that the executing request must not cause any side effects on the server. By **side effects**, we mean that the state of the database must not change as a result of the request, and the response must only return data that already exists on the server.
  - <code>GET</code> has no side effects.
  - <code>POST/PUT/DELETE</code> have side effects.
+ Indempotency, in REST, means repeating an request doesn’t change the server’s data any further — the first time already set the state, and doing it again does nothing new.
  - <code>PUT / DELETE / GET</code> are idempotent request.
  - <code>POST</code> is not idempotent request.

### Express Framework
**Node.js** allows you to run JavaScript on the server, but by itself, it’s very low-level. You have to _handle HTTP requests and responses manually_.

Express is a layer on top of Node.js that provides simpler methods to **create routes, handle requests, send responses**, and organize your application.

+ In Express, when the client **requests the full URL** (like, http://localhost:3001/api/notes/2).
+ In Express, you only need to define a route like <code>/api/notes/:id</code>', which means you’re only specifying the **route (path)** that the server will listen to.
  ```js
  app.get('/api/notes', (request, response) => {
      response.json(notes)
  })
  ```
+ Because Express doesn’t need to know the full server URL (http://localhost:3001) at this stage — **it’s already running on a port**, so the base URL is implicit.

### Node.js
A runtime environment (an environment that can run JavaScript) for executing JavaScript code, outside of the browsers.

## my Q&A

**🐥 Why do I need to convert data into JSON to send it back to client?**

🐓 It's note necessary to use JSON only, but JSON has become the standard format for communication between servers and clients (especially in web APIs).
1. Clients need a structured, universal format
  - Raw JavaScript objects (<code>{ title: "Hello" }</code>) only exist inside your server’s memory.
  - When data leaves your server, it’s just text (or bytes) traveling over HTTP.
  - JSON provides a language-agnostic way of representing that data. (React app, an iPhone app-Swift, an Android app-Kotlin, or even Python)
2. HTTP requires strings, not raw objects
  - HTTP transmits text or binary data.
  - JSON is just a string representation of the object:
  ``` js
  { title: "Hello" } → '{"title":"Hello"}'
  ```
3. Automatic parsing on the client side
  - Browsers, <code>fetch()</code>, <code>axios</code>, mobile SDKs — all expect JSON from an API.
  - In JavaScript, you can instantly parse JSON:
  ``` js
    const response = await fetch("/api/blogs");
    const data = await response.json();

    // usable JavaScript object/array
    console.log(data);
  ```
4. Standards and interoperability
  - JSON is lightweight, human-readable, and widely supported.
  - It replaced older formats like XML because it’s simpler and faster.
  - By sending JSON, you ensure any client can work with your API.

**🐥 Why do I use different ports in Development server?**

🐓 Because Backend and Frontend are different processes in Development server, unlike Production Server.

Production Server(Express, Djanog...etc): Backend logic lives. And backend and frontend served together at one port.

Development Server(React, Vite, Next,js...etc): Frontend codes lives. Here, backend and frontend are different two processes. So running them separately makes development faster and easier.
To handle requests from different ports (from back/frontend) we can use **CORS / Proxy**.

**🐥 What is the difference between Session-Based Authentication and Token-Based Authentication (JWT)?**

🐓 The core difference lies in how authentication is managed.
+ **Session-Based Authentication** relies on server memory or database.
  - The server keeps session data for each logged-in user (user ID, login status, etc.).
  - Client stores only a session ID (usually in a cookie).
  - Every request sends the session ID → server looks up session ID in memory/database → Retrieves session data → verifies the user → processes request.
    + For a few users, this is trivial. But thousands or millions of requests → lots of DB/memory access → more CPU, RAM, and potential latency.
    + If multiple servers are used, a shared session store may introduce network calls → even more load.
  - Stateful: The server must remember every active session.
+ **Token-Based Authentication (JWT)** relies on verifying the token itself, not looking up server-side session data.
  - The token itself contains all necessary user info (payload) and a signature.
  - Client stores the token (LocalStorage, cookie, or memory).
  - Every request sends the token (usually in Authorization: Bearer token header) → server verifies the signature → decodes payload → identifies the user.
    + Verification = cryptographic check using the secret key (HMAC or RSA) → computationally light compared to DB lookup.
    + Decoding payload = just Base64 decoding → extremely fast.
    + No database access needed → no memory lookups, no network calls
    + Even for thousands of requests, this is much less load than querying a session store for each request
  - Stateless: The server does not store session data.

## Higher Order Functions
✴️ **Concat**
+ Combines two or more arrays (or add elements) and return a **new array**.
+ **Not modify** the original array
  ```js
  user.notes.concat(savedNote._id)
  ```
+ **Must assign it back** to the original array, otherwise the user’s notes array in memory and in MongoDB won’t include the new note.
  ```js
  user.notes = user.notes.concat(savedNote._id)
  ```
+ if you want mutation, you could use <code>.push()</code>

✴️ **Push**
+ Add one or more elements to the end of an array.
+ **NOT return the array**.
+ **Modifies the original array** in place.
  ```js
  user.notes.push(savedNote._id)
  ```

## Appendix
✴️ **Function**
+ Function definition
  ```js
  const sayHello = () => {
    console.log("Hello");
  };
  ```
  - This just **defines** the function.
  - At this point, nothing happens yet.
+ Function reference
  ```js
  sayHello
  ```
  - This is a **function reference**.
  - It’s like **holding the function in your hand, without running it**.
  - You can pass it around, assign it to variables, or give it to another function.
+ Function call
  ```js
  sayHello()    // prints "Hello"
  ```
  - The <code>()</code> actually **run**s the function.
  - It executes the code inside and produces a result (or side effect).

So, in React Code, when a function **returns a JSX element**,
```js
const loginForm = () => {
  return <LoginForm
    handleLogin={handleLogin}
    username={username}
    setUsername={setUsername}
    password={password}
    setPassword={setPassword}
  />
}

// ❌ Doesn’t work:
{!user && loginForm}

// ✅ Works:
{!user && loginForm()}
```
React can’t render a plain function (**function reference**) unless it’s used as a component like <code>&lt;LoginForm /&gt;</code>. But instead, a **function call** returns the JSX element (<code>&lt;LoginForm... /&gt;</code>) immediately.

✴️ **Module** is basically a **self-contained piece of code** that has its own variables, functions, or classes.
+ Each file is a module → can export anything (<code>export default</code>, <code>export const</code>, etc.).
+ Modules have their own scope → variables inside one file don’t automatically exist in another.
+ Modules communicate via import/export → that’s how components share code.
+ A component itself is not a module, but in React, each file that defines a component is a module.
```js
// Common JS
const math = require('../address/math')

module.exports = addFunction;     // export a single function
module.exports = { addFunction, multiplyFunction };   // export multiple functions

// ES6
import math from '../address/math'

exports default addFunction     // export a single function
export { addFunction, multiplyFunction }    // export multiple functions
```

✴️ **DOM** is Document Object Model, **a tree of objects** that represents all the HTML elements on the page. Each element is an object you can read or change with JavaScript.
```html
<div id="app">
  <h1>Hello</h1>
</div>
```
```arduino
//The browser creates a DOM tree
div#app
 └─ h1
      └─ "Hello"
```
If you want to update the page, JavaScript modifies the DOM.
```js
document.querySelector('h1').textContent = 'Hi';
```
✴️ **Virtual DOM** is React’s in-memory representation of the DOM. It’s not the real DOM — it’s like a lightweight “blueprint” of **what the UI should look like**. React uses the virtual DOM to figure out the **minimum changes needed to update** the real DOM.
+ How it works:
  1. React creates a virtual DOM tree from your components.
  2. When state or props change, React creates a new virtual DOM tree.
  3. React diffs the old VDOM vs new VDOM to see what changed.
  4. React updates only the changed parts of the real DOM.

✴️ **JSX** is JavaScript XML, which is a syntax extension for JavaScript that looks like HTML but runs inside JavaScript code. It’s most commonly used with **React**.
```jsx
// jsx
const element = <h1>Hello, world!</h1>
```
```js
// js
const element = React.createElement("h1", null, "Hello, world!");
```
With JSX, you can easily embed dynamic content by writing appropriate JavaScript within curly braces.
```jsx
/// JSX
function Greeting(props) {
  const name = props.name;

  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
}

// Component
<Greeting name="Alice" />
```
**Important details**
+ JSX is not valid JavaScript by itself. You **need a build tool** (like **Vite**, Babel, or Webpack with the right loader) to transform it into JS before the browser can run it. Which means, with the tool, JSX returned by React components is compiled into JavaScript.
+ JSX elements **must be wrapped in a single parent element** (that’s why you often see <code>&lt;div&gt;</code> or <code><>…</></code> fragments).
+ You can use **JS expressions** inside <code>{ ... }</code> in JSX, but not statements (e.g. <code>if</code>, <code>for</code> can’t be written directly, you use ternaries or map).
  ```jsx
  // ✅ Expression (something that produces a value) works
  <h1>{ 2 + 2 }</h1>

  // ❌ Statement (performs an action, returns no value) not works
  <h1>{ if (true) { "Yes" } }</h1>

  // ✅ Ternary operator works
  <h1>{isLoggedIn ? "Welcome" : "Please log in"}</h1>

  // ✅ Logical AND (&&) (quick conditional rendering) works
  {isAdmin && <button>Delete</button>}

  // ✅ Array .map() (instead of for) works
  <ul>
    {items.map(item => <li key={item}>{item}</li>)}
  </ul>
  ```

**🐬 Pro Tips**
+ **JSX elements**, in React project, directly inside a <code>map()</code> call always need [key value](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) : an attribute called _key_!
  ```jsx
  const App = (props) => {
    const { notes } = props
    return (
      <div>
        <h1>Notes</h1>
        <ul>
          {notes.map(note =>
            <li key={note.id}>
              {note.content}
            </li>)
          }
        </ul>
      </div>
    )
  }

  export default App
  ```
  Here, the li element itself is the repeated element, so you put the key on <code>&lt;li&gt;</code>. React uses the key to track each <code>&lt;li&gt;</code> in the list.
+ **Component**, as a repeated element in React, inside a <code>map()</code>, key must be on the <code>&lt;Note&gt;</code> component.
  ```jsx
  const App = (props) => {
    const { notes } = props
    return (
      <div>
        <h1>Notes</h1>
        <ul>
          {notes.map(note =>
            <Note key={note.id} note={note}/>)
          }
        </ul>
      </div>
    )
  }

  export default App
  ```
  Because keys tell React which components in the array correspond to which previous ones. In other words, when you render a list with <code>.map()</code>, React keeps a “**[Virtual DOM](https://legacy.reactjs.org/docs/faq-internals.html)**” of the previous render.

  On the next render, it compares the new list (element or, in this example, Component) to the old list. React needs to know which elements are the same, which are new, and which were removed. Like,
  1. First render: React creates instances for keys `1` and `2`. (Creating instances)
      ```jsx
      const notes = [
        { id: 1, text: 'Buy milk' },
        { id: 2, text: 'Call Alice' }
      ];

      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      ```
  2. Second render: if <code>notes</code> changes order or has a new note.
      ```
      [{ id: 2, text: 'Call Alice' }, { id: 3, text: 'Pay bills' }]
      ```
  3. React uses the keys to **compares** the keys of new elements to the keys of old elements from the previous render.
      - Key `2` → Key matches → **reuse the existing Note instance** for Alice
      - Key `3` → Key missing or new → **create a new Note instance** for Pay bills
      - Key `1` → Key gone → **unmount the old Note instance** for Buy milk

  ✅ **Summary**
  + If the repeated element is **a component**, put the key on the component itself.
  + If the repeated element is a **DOM element**, put the key on that DOM element.

✴️ **Key**, React uses the key attributes of objects in an array to determine [how to update the view generated by a component](https://react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key) when the component is re-rendered. Which means, <code>key</code> helps React tell **components apart** when rendering lists (or multiple children).
  - If the <code>key</code> is the same between renders → React reuses the same component instance → Re-render.
  - If the <code>key</code> is different → React throws away the old one (unmounts it) and makes a new one (mounts it).

**🐬 Pro Tips**
+ **Render vs Remount**
  - **Render**: React calls the function component again with new props. The same component instance is used, so state (useState) is preserved.
  - **Remount**: React destroys the old component and creates a new instance, so state is reset.

    So, from the [Chat code](https://react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key), this below process is happening under the hood.
    ```jsx
    <Chat key={contactTo.id} contact={contactTo} />
    ```
    When <code>contactTo.id</code> changes (because you clicked a different contact), React sees:
    + Old Chat had key 0 (say, Taylor).
    + New Chat has key 1 (Alice).
    + And think: “Oh, this is **a different component**, not the same one. I should **unmount** the old Chat and **mount a fresh Chat**.”

    Without <code>key</code>, React would **reuse the same Chat component instance** no matter which contact you switch to.
      ```jsx
      <Chat contact={contactTo} />
      ```
+ **Component instance** is an React internal object that keeps:
  - State (<code>useState</code>)
  - Effects (<code>useEffect</code>) and cleanup functions
  - Internal bookkeeping so React knows when and how to update or remove this component

  And component instance is needed because React needs to remember state between renders.

+ **Analogy**
  - **Component**: Blueprint or instruction manual for building a robot
  - **Component instance**: The actual robot built from the blueprint and holds state & effects.
  - **State**: Internal memory or registers inside the robot (like, <code>useState</code> values).
  - **Effects**: Tools or side processes the robot uses (like, <code>useEffect</code> values).
  - **Props**: Commands or instructions you give the robot. Props passed from parent. So function called again with same instance, state preserved.
    1. Props change
    2. Same instance & same state.
    3. Re-rendered output (JSX/DOM) updates based on the new props (UI update)
    4. Runs effect-hook (<code>useEffect</code>) after every render, based on **[dependency array](https://react.dev/reference/react/useEffect#parameters)** (which is 2nd parameter of <code>useEffect()</code>, and mostly in my project, it is an empty array <code>[]</code>).
  - **Re-render**: Robot receives new commands (props) but keeps its memory.
  - **Remount** (key change): Robot is destroyed and a new robot is built from the blueprint.
    1. Key change
    2. Old instance destroyed
    3. Create new instance & Reset state
    4. Render (component function runs, JSX returned, UI updated)
    5. Runs effect-hook (<code>useEffect</code>)after every render, based on **dependency array**.

✴️ **Component** is a UI building block in React, and so called "functional component". React lets you combine your markup, CSS, and JavaScript into custom “components”, reusable UI elements for your app. So basically, this functional component **takes** <code>props</code> **as input** and **returns JSX** (what UI should look like).
```jsx
// App component
const App = ({ props }) => {
  return (
    <div>
      <h1>Greetings, { props.name }</h1>

      // nested Hello component
      <Hello />
      <Hello />

    </div>
  )
}
```

✴️ **null** is a **value** that represents “nothing” or “empty”, which means <code>null</code> is a valid “no data” result. <code>null</code>is not an error in JavaScript (frontend) or Mongoose (backend). But to handle <code>null</code>, we need this:

+ **Frontend**: [Conditional Rendering](https://fullstackopen.com/en/part2/adding_styles_to_react_app#couple-of-important-remarks) of Component
  ```jsx
  const App = () => {
  const [notes, setNotes] = useState([])

  // ...
  }
  ```
  We set the state notes to have initial value of an empty array, like the code above:
  - If the state were only saving "one thing", a more appropriate initial value would be <code>null</code> denoting that there is **nothing in the state at the start**.
  ```jsx
  const App = () => {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // do not render anything if notes is still null
  if (!notes) {return null}
  }
  ```
  1. The effect hook uses the function <code>setNotes</code> to set notes to have the notes that **the backend is returning**.
  2. So on the first render, nothing is rendered.
  3. But if you return <code>null</code> from a component, React interprets it as:
  “**Render nothing in the DOM here**.”
  4. So, when the **notes arrive from the backend**, the effect used function <code>setNotes</code> to set the value of the state notes.

+ **Backend**: [Error Handling](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#error-handling)

  From the code below, I can check 2 things: **resource** and **query**
    ```jsx
    app.get('/api/notes/:id', (request, response) => {
      const id = request.params.id

      Note.findById(id)
        .then(note => {
            if(note){
                response.json(note)
            }else{
                response.state(404)
            }
        })
        .catch(error => {
            console.log(error.name);    // e.g., "MongoNetworkError"
            console.log(error.message); // e.g., "failed to connect to server..."
            console.log(error.stack);   // stack trace
            response.status(500).end()
        })
    })
    ```
  + If no document with that ID exists, note will be <code>null</code>.
  + So you manually check <code>if (note)</code> → if false, you send 404 Not Found.
  + ✅ This handles the “resource doesn’t exist” case.

  On the other hand,
  + If it has database connection issues
  + The <code>error</code> parameter is going to be an **Error object describing the connection problem**.
  + And <code>.catch()</code> handles that error by letting you respond appropriately (e.g., log it, send a 500 response) rather than letting the application crash.
  + ✅ This handles the “server or query error” case.

  So basically:
  + 404 → the query succeeded, but there was no document with that ID.
  + 500 → the query failed due to a server/database error, so the resource could be there or not

**🐬 Pro Tips**
+ In code using **promises** and **.then()**, a possible error was passed to <code>next(error)</code> which forwards the error to the error-handling middleware (which has the 4-arg signature) like this:
  ```js
  notesRouter.post('/', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note
    .save()
    .then((savedNote) => {
      response.status(201).json(savedNote)
    })
    .catch((error) => next(error))
  })
  ```
+ When using **async/await** syntax, Express will [automatically call](https://expressjs.com/en/guide/error-handling.html) the error-handling middleware **if an await statement throws an error** or **the awaited promise is rejected**. This makes the final code even cleaner.
  ```js
  notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
  })
  ```

✴️ **Error Handler** is a Express [error handling](https://expressjs.com/en/guide/error-handling.html) middleware that are defined with a function that **accepts four parameters**. Express does not have a fully automatic built-in error handler for custom messages. So, the developer usually **manually define** it like this:
```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)
```
So, in the code:
+ <code>next</code> is a function provided by Express.
+ if <code>next</code> function is called **without** an argument, then the execution will simply **move onto** the next route or middleware.
+ if <code>next</code> function is called **with** an argument, then the execution will continue to the **error handler middleware**.
```js
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })

    .catch(error => next(error))
})
```

✴️ **State** is a component's memory. Components often need to change what’s on the screen as a result of an interaction, such as, clicking “buy” should put a product in the shopping cart. So, components need to **remember** things: the current input value, the current image, the shopping cart. In React, this kind of component-specific memory is called state.

Every time the setCounter modifies the state and it causes **the component to re-render**.
```js
import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}

export default App
```
One other important thing to know is a **controlled component**.
```js
const [username, setUsername] = useState('')

<input
  type="text"
  value={username}
  onChange={({ target }) => setUsername(target.value)}
/>
```
In this code,
+ <code>value={username}</code> → this makes the <code>&lt;input&gt;</code> a **controlled component**. The value shown inside the text box is tied to the React state variable <code>username</code>.
+ <code>{ target }</code> is **object destructuring**: it takes the target property from the event object.
  ```js
  // 1. explicit version
  onChange={(event) => setUsername(event.target.value)}

  // 2. not declare defalut parameter
  onChange={() => setUsername(target.value)}

  // destructuring version
  onChange={({ target }) => setUsername(target.value)}
  ```
  - Because the **first argument** to the _onChange_ handler is always the **event object**, by default. (see code no.1)
  - Even though event object is default parameter, if you want to use the event → **declare a parameter** for it. Otherwise, your function body doesn’t know what <code>target</code> is. (see code no.2) Because <code>target</code> is not a global variable, nor event object.
  -  JavaScript object destructuring being applied directly to the function parameter. (see code no.3) Like, using <code>target</code>, instead of using <code>event.target</code>, in the parameter of onChange function.
      ```js
      const event = {
        target: { value: 'typed text', ... },
        preventDefault: function() { ... },
      };

      // destructuring
      const target = event.target;

      // what you actually want
      const value = target.value;

      onChange={({ target }) => setUsername(target.value)}
      ```

Why does it matter?
+ In a controlled component, the **React state** (<code>username</code>) is the **single source of truth**.
+ That means what you see in the input is always exactly what React thinks it is.
+ This keeps your UI predictable and consistent.


**🐬 Pro Tips**
+ It is **forbidden** in React to **mutate state directly**, since it can result in [unexpected side effects](https://stackoverflow.com/questions/37755997/why-cant-i-directly-modify-a-components-state-really/40309023#40309023). Changing state has to always be done by setting the state to **a new object**. If properties from the previous state object are not changed, they need to simply be copied, which is done by copying those properties into a new object and setting that as the new state. Using such as, <code>spread syntax(...)</code>, <code>.map()</code>, <code>.filter()</code>, etc.
+ Storing all of the state in a single state object is a bad choice for this particular application.
  ```js
  // not recommanded
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  // recommanded
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  ```
+ A state update in React happens [**asynchronously**](https://react.dev/learn/queueing-a-series-of-state-updates), i.e. not immediately but "at some point" before the component is rendered again. Because rendering takes a snapshot in time, which means React doesn’t let the current <code>count</code> variable change mid-render (=current render). Current render means the whole execution of your component function (e.g. <code>Counter()</code>) with one fixed snapshot of state and props.
  ```js
  function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={handleClick}>{count}</button>;
  }
  ```
  - Both <code>setCount</code> calls happen during the same render (inside one click handler).
  - In that render, <code>count</code> is the snapshot value (say <code>0</code>).
  - Each call computes a new value from that snapshot and queues it. They don’t apply immediately.
    ```js
    setCount(count + 1); // uses count = 0 → queues “set to 1”
    setCount(count + 1); // still uses the same count = 0 → queues “set to 1” again
    ```

  Think of rendering like taking a photo 📸 of your app’s state at a moment in time. Even if things change right after, the photo won’t magically update — you need to take another photo (another render) to see the new state. (image from [here](https://react.dev/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time))

  <image src="https://react.dev/images/docs/illustrations/i_render1.png" width="100" />
  <image src="https://react.dev/images/docs/illustrations/i_render2.png" width="150" />
  <image src="https://react.dev/images/docs/illustrations/i_render3.png" width="200" />

✴️ **Lifting state up** is a concept in React. Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, **lift** the state up to their closest common parent, and then pass it down to them via props. This is known as [lifting state up](https://react.dev/learn/sharing-state-between-components), and it’s one of the most common things you will do writing React code.
```jsx
// Suppose you have two components that need to know the same “count”:

function CounterDisplay({ count }) {
  return <p>Count: {count}</p>;
}

function CounterButton({ onIncrement }) {
  return <button onClick={onIncrement}>Increment</button>;
}
```
```jsx
function CounterApp() {
  // Lift the state to  their closest common ancestor:
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  return (
    <div>
      <CounterDisplay count={count} />
      <CounterButton onIncrement={increment} />
    </div>
  );
}
```
In this code above:
+ <code>count</code> is lifted to CounterApp.
+ <code>CounterDisplay</code> reads it via props.
+ <code>CounterButton</code> update the parent state via a callback prop.



✴️ **Hook** is a special function that lets you “hook into” React features like state and lifecycle methods from functional components. Before hooks, only class components could have state or lifecycle logic. But hooks let you do the same things with functions, which are simpler and easier to reuse.

**⚡ Most common hooks**
+ **[useState](https://react.dev/reference/react/useState)** – manage state in a function component
+ **[useEffect](https://fullstackopen.com/en/part2/getting_data_from_server#effect-hooks)** – run side effects, that something changes state outside of the function/request itself(like data fetching, subscriptions, or DOM updates). And it takes two parameters - a function, the effect itself. The principle is that the effect is:
  1. always executed **after the first render** of the component
  2. and when **the value of the [second parameter changes](https://react.dev/reference/react/useEffect#parameters)**.

    **🐬 Pro Tips**
    - <code>useEffect</code> does not allow its callback to be async directly. So this **old-school** way of handling Promises with <code>.then()</code> is working in useEffect, instead of <code>await</code>. That’s why <code>.then()</code> is commonly used inside useEffect.
      ```js
      useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs(blogs)
        )
      }, [])
      ```
    - But if  really want to use <code>async/await</code>, I can still use <code>async/await</code> inside useEffect by defining an **inner async function**, but not clean:
      ```js
      useEffect(() => {
        const fetchBlogs = async () => {
          const blogs = await blogService.getAll()
          setBlogs(blogs)
        }
        fetchBlogs()
      }, [])
      ```



**⚡ Rules of Hooks**
The useState function (as well as the useEffect function) **must not be called** from inside of a loop, a conditional expression, or any place that is not a function defining a component. This must be done to ensure that the hooks are always called in the same order, and if this isn't the case the application will behave erratically.

To recap, hooks may only be called from the inside of a function body that defines a React component.

✴️ **Event Handling** is how your code responds to user interactions or other events, like click (<code>onClick</code>), typing(<code>change</code>), mouse movements (<code>mousemove</code>), form submissions (<code>submit</code>), and more.

```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>
        plus
      </button>
    </div>
  )
}
```
We set the value of the button's _onClick_ attribute to be a reference to the _handleClick_ function defined in the code above. So _handleClick_ is the **event handler function**.

So, we can say "the event handler is passed to the Button component through the onClick prop*."

**Note**
+ In JSX/React terminology: _onClick_ is a **property*** (what’s in the DOM object) on the virtual DOM element in React.
+ In raw HTML/JS sense: _onClick_ is an **attribute** (what’s in the HTML).

**Event Handler** is defined as **a function call** which means that the event handler is assigned the **returned value from the function**.
```js
// ❌  Resulting in infinite recursion.
<button onClick={setValue(0)}>button</button>

// ✅ The event handler is a function defined with the arrow function syntax
<button onClick={() => setValue(0)}>button</button>

// ✅ Define a function that then gets assigned to the handleClick variable
const App = () => {
  const [value, setValue] = useState(10)

  const handleClick = () =>
    console.log('clicked the button')

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  )
}
```
So, from the code above, when the component gets rendered, no function gets called and only the reference to the arrow function is set to the event handler. Calling the function happens only once the button is clicked.

**To pass Event Handlers to Child Components**, we have to make sure that we use the correct attribute names when passing props to the component. (image from [here](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#passing-event-handlers-to-child-components))
![eventHandler](https://fullstackopen.com/static/065d96e37774cb6ccb206a39ba9c6cef/5a190/12f.png)

✴️ **Spread syntax** <code>(...)</code> is a JavaScript operator. It **expands** (=spreads) elements of an array, object, or iterable into another place.
```js
const nums = [1, 2, 3];
const more = [0, ...nums, 4];
console.log(more); // [0, 1, 2, 3, 4]
```

✴️ **Object literal** is a way to create an object using curly braces <code>{}</code> with key-value pairs directly in the code. Unlike creating it with a _constructor_ like <code>new Object()</code>.
```js
// using a constructor
const obj = new Object();
// object literal
const objLiteral = { key: "value" };
```

With **an array function**, the parentheses <code>()</code> around <code>{}</code> are needed to **return the object literal implicitly**.
```js
const user = { username: "kim", id: 1 };
const getUser = () => ({ username: user.username, id: user.id });

const callUser = getUser();
console.log(callUser) // { username: "kim", id: 1 }
```

✴️ **Arrow function** is a compact alternative expression to a traditional function expression. And it has two **“styles” of body**.
+ Concise body (no braces) → implicit return
  ```js
  const add = (a, b) => a + b; // returns a + b automatically
  ```
  - Here, <code>a + b</code> is an **expression**, not a statement.
  - Arrow functions automatically return the result of the expression.
  - You cannot write multiple statements here; it’s only a single expression.
+ Block body (with braces <code>{}</code>) → explicit return
  ```js
  const add = (a, b) => {
    const sum = a + b;
    return sum; // must use return
  };
  ```
  - The <code>{}</code> defines a **function block**.
  - Inside a block, you can have multiple statements.
  - You must use <code>return</code> to send a value back.

Then what about **object literal** with an arrow function?
```js
const getUser = () => ({ username: "kim" }); // ✅ works
```
+ The <code>()</code> around <code>{}</code> tells JS: “This is an object literal, not a function block.” → work.
+ Without <code>()</code>, JS would think <code>{ username: "kim" }</code> is a block, not an object → error.

And <code>map()</code> is an array method that creates a new array by applying a callback function to each element of the original array. In the code below, map callback is an arrow function.

So, if I want to get an array of oject literal, I should use <code>()</code> around <code>{}</code>. Since object literal is not a function block.
```js
const allUsers = await User.find({})
const users = allUsers.map(user => ({
  name: user.name,
  id: user.id
}));

console.log(users) // [{ name: 'Alice', id: 1 }, { name: 'Bob', id: 2 }]
```
✴️ **Array** is functional programming operators. Such as <code>find</code>, <code>filter</code>, <code>reduce</code>, and <code>map</code>.

✴️ **Higher Order Function** is any function that:
+ Takes another function as an argument, OR
+ Returns a function.

For example:
```js
let numbers = [1, 2, 3, 4];

// reduce takes a function (accumulator, currentValue) => newValue
let sum = numbers.reduce((acc, n) => acc + n, 0);

console.log(sum); // 10
```

✴️ **Array.isArray()** checks if the passed value is an Array. Instead of using <code>typeof()</code> which is a very old operator. Because <code>typeof</code> will return Array as an Object. Because arrays are a special kind of object under the hood.
```js
typeof [1,2,3]   // "object"
typeof {a:1}     // "object"
typeof null      // "object"😅 is a historic bug
```

But if we use <code>Array.isArray()</code>,
```js
Array.isArray([1,2,3])   // "true"
Array.isArray({a:1})     // "false"
```

✴️ **axios** is JavaScript library for **making HTTP requests** (GET, POST, PUT, DELETE). It’s like a helper that makes fetching data easier and cleaner in React, Node.js, or plain JS to talk to APIs.

Without axio, we can use **fetch**, which is JavaScript the built-in API. But it has more benefits:
+ Automatic JSON parsing (no need for <code>res.json()</code>)
+ Error handling is better (treats non-200 responses as errors)
+ Works both in the browser and Node.js (fetch doesn’t fully work in Node without extra setup)
+ Shorter syntax than <code>fetch</code>
  ```js
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then(data => console.log(data))
    .catch(err => console.error(err));
  ```
  ```js
  axios.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
  ```
+ Compare to **REST API**,
  - **Axios** is just a **HTTP client**. It allows your frontend (or any JavaScript code) to make HTTP requests.
  - **REST API** is the server-side interface that defines how clients can interact with your backend data and logic. It’s what actually responds to the requests Axios makes.

✴️ **JSON** (JavaScript Object Notation) is always a string representation of an object.
1. <code>.toJSON()</code> returns a **JSON-compatible format** (any of an object, array, string, number, boolean or null type) from the data (objectit’s called on). Which means it returns a data structure that can be safely turned into a JSON string using <code>JSON.stringify()</code> without losing information or causing errors.
``` js
  //object
  { title: "Hello" }

  //array
  [1, 2, 3]

  // primitives
  "Hello"
  100
  true
  null
  ```
2. <code>JSON.stringify(obj)</code> returns the obj a string.
``` js
  //object
  '{"title":"Hello"}'

  //array
  '[1, 2, 3]'

  // primitives
  '"Hello"'     //(note the double quotes)
  '100'
  'true'
  'null'
```
3. <code>response.json(...)</code> Express does both steps automatically. Express calls <code>JSON.stringify</code>, which internally checks for <code>.toJSON()</code> and uses it if available.
```
  response.json(notes)
    ↓
  JSON.stringify(notes)
    ↓
  for each doc → doc.toJSON()
    ↓
  now stringify the plain objects
```
  So, that's why some documents said <code>.toJSON()</code> is called first and <code>.stringify()</code> later.

✴️ **Async**  is a keyword (a modifier) which declares a function as **asynchronous** which will require time to complete that JavaScript may have to wait for. And it returns a Promise.

✴️ **Await** is an operator and is possible **only inside of an async** function. And it waits for a Promise.
```js
const notes = await Note.find({})

console.log('operation returned the following notes', notes)
```
The code **looks exactly like synchronous** code. The execution of code pauses at <code>const notes = await Note.find({})</code> and waits until the related promise is _fulfilled_, and then continues its execution to the next line. When the execution continues, the result of the operation that returned a _promise_ is assigned to the notes variable.

Thanks to the new syntax (<code>async/ await</code>), the code is a lot simpler than the previous <code>.then</code>-chain.

✴️ **Promise** is an object, a special kind of JavaScript object, that represents the eventual result of an asynchronous operation. So it's like
> "I don’t have the value yet(pending), but I promise I’ll either give you the value (resolve) or an error (reject) in the future."
+ **How to use**: If, and when, we want to access the result of the operation represented by the promise, we **must register an event handler** to the promise.
  ```js
  const promise = axios.get('http://localhost:3001/notes')

  promise.then(response => {
    console.log(response)
  })
  ```

+ Case 1: Without <code>await</code>
  - ✅ Casual / practical way: it returns a Promise.
  - ⚠️ Strict/ technical way: it returns a Mongoose Query object, which is Promise-like, so <code>await</code> and <code>.then()</code> work.
    ```js
    // can say it returns Promise
    const notes = Note.find({})
    ```
    ```js
    // console.log(notes)
    Query {
      _mongooseOptions: {},
      _transforms: [],
      _hooks: Kareem { _pres: Map(0), _posts: Map(0) },
      _executionStack: null,
      mongooseCollection: NativeCollection { ... },
      model: Model { Note },
      op: 'findOne',
      options: {},
      _conditions: {},
      ...
    }
    ```

+ Case 2: With <code>await</code>
  - returns an array of document from MongoDB, not plain JS objects, but **Mongoose document instances**.
    ```js
    // resolves to an array of documents
    const notes = await Note.find({})
    ```
    ```js
    // console.log(notes)
    [
      {
        _id: new ObjectId("64f2a2b4e9f1d23a4b9b7c8d"),
        title: 'My first note',
        content: 'This is a test',
        __v: 0
      },
      {
        _id: new ObjectId("64f2a2b4e9f1d23a4b9b7c8e"),
        title: 'Another note',
        content: 'More text here',
        __v: 0
      }
    ]

    // console.log(notes.toJSON())
    // And our custom .toJSON() method in model
    [
      {
        id: "64f2a2b4e9f1d23a4b9b7c8d",
        title: 'My first note',
        content: 'This is a test',
      },
      {
        id: 64f2a2b4e9f1d23a4b9b7c8e,
        title: 'Another note',
        content: 'More text here',
      }
    ]
    ```

  Each element is a Mongoose Document object (an instance of a Model), which looks like a plain JS object, and actually it has methods (<code>.toJSON()</code>, <code>.save()</code>, etc.) under the hood.
  But remember: **it’s still a Mongoose Document, not a plain JS object**.

  Every Mongoose document has a <code>.toJSON()</code> method. It converts the Mongoose Document object (which has tons of hidden metadata and methods) into a plain JavaScript object that’s safe to stringify or send over HTTP.
  ```js
  const note = await Note.findOne({})
  console.log(note)          // Mongoose Document
  console.log(note.toJSON()) // Plain object
  ```
  ```js
  // console.log(note)
  {
    _id: new ObjectId("64f2a2b4e9f1d23a4b9b7c8d"),
    title: 'My first note',
    content: 'Hello world',
    __v: 0
    // (plus hidden symbols and methods, not shown here)
  }

  // console.log(note.toJSON())
  {
    _id: "64f2a2b4e9f1d23a4b9b7c8d",
    title: "My first note",
    content: "Hello world",
    __v: 0
  }

  ```

✴️ **Response** is an object which contains all the essential data related to the **response** of an **HTTP GET request**, which would include the returned data, status code, and headers. The JavaScript runtime environment calls the callback function registered by the <code>then</code> method providing it with a response object as a parameter.
```js
axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })
```
The data returned by the server is **plain text**, basically just one long string. The axios library is still able to parse the data into a **JavaScript array**, since the server has specified that the data format is _application/json; charset=utf-8_ using the content-type header.

**🐬 Pro Tips**
Storing the promise object in a variable is generally **unnecessary**, and it's instead common to **chain** the <code>then</code> method call to the axios method call.

✴️ **Response.json()**
<code>Response</code> is an object provided by Express to send data back to the clien. And <code>.json()</code> is a method that
+ Converts the JavaScript object/array (<code>notes</code> in this case) into a JSON string.
+ Sets the correct HTTP header: <code>Content-Type: application/json</code>.
+ Sends the JSON as the **HTTP response body**.

And <code>resonse.json()</code> sends the HTTP response immediately and ends the request.
So, if you want to return all notes entries, you don’t map them individually. Each Mongoose document in the array is converted into a plain object under the hood using Mongoose’s built-in serialization (stringifying).
```js
// from controller.js
notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  return res.json(notes)
})

// from helper.js
const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map((note) => note.toJSON())
}
```
```js
// return all the notes object into an array
return response.json(notes)
return notes.map(note => note.toJSON())

// return only one note object
return notes.map(note => response.json(note))
```
```js
// the return value will look the same as response.json(notes)
return response.send(notes)
```
+ <code>res.json(notes)</code> → ends with stringified **JSON text** being sent over HTTP.
+ <code>notes.map(note => note.toJSON())</code> → gives you **plain objects**, not stringified, so you can manipulate or assert them in code.
+ <code>notes.map(note => response.json(note))</code> → will only return **one single note**. Because The first <code>res.json(note)</code> wins. It stringifies that one note and sends it to the client as the complete HTTP response. Since **HTTP allows only one response per request**, the client never sees the others.

  The remaining <code>.map()</code> iterations still happen in JS, but any attempt to <code>res.json(...)</code> will be ignored, or throw the classic error.
+ <code>.send(notes)</code> is more general; it can send strings, Buffers, numbers, or objects. So if you pass an **object or array**, Express automatically converts it to JSON, just like <code>.json()</code>. But, **best practice is to use <code>.json()</code>**.

    ```js
    res.json([{ content: 'note 1' }, { content: 'note 2' }])
    // Sends:
    // Content-Type: application/json
    // Body: [{"content":"note 1"},{"content":"note 2"}]

    res.send([{ content: 'note 1' }, { content: 'note 2' }])
    // Express sees the array/object and sends JSON with the same result

    ```

**Note**
From the code below, controller.js is handling HTTP request ([Routing or Router](https://expressjs.com/en/guide/routing.html)) and return response after <code>res.json(data)</code>. But helper.js is not handling HTTP request, instead it just quering MongoDB directly and returns an a plain array of JS objects.
```js
// Handling HTTP by Express (via 'Router')
notesRouter.get('/', async (req, res) => {
  // Get an array of note documents
  const notes = await Note.find({})
  // Convert the arrat into JSON
  // Express send the array as an HTTP response to the client (as response object).
  return res.json(notes)
})

// Handeling HTTP by Supertest (via 'api')
test('all notes are returned', async () => {
  // Supertest makes an HTTP request to your Express app.
  // Get an array of note documents
  // const response = Supertest Response object (wrapper)
  const response = await api.get('/api/notes')
  // response.body = the actual JSON data sent by Express
  console.log(response.body)

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

// Querying MongoDB directly through Mongoose
const notesInDb = async () => {
  // Get an array of note documents
  const notes = await Note.find({})
  // Gives a plain array of JS objects
  return notes.map((note) => note.toJSON())
}
```

✴️ **Port** is a communication endpoint and listens for requests.

✴️ **Mongoose** is ODM (Object Data Modeling) library for Node.js. It lets you **define schemas and models** in your Node.js application, so you interact with MongoDB using JavaScript objects instead of raw database commands. It is Node.js package (installed via npm install mongoose).
```js
await mongoose.connect("mongodb://localhost:27017/mydb");
const User = mongoose.model("User", UserSchema);
const alice = await User.findOne({ name: "Alice" });
```

✴️ **Mongosh** is the MongoDB Shell — an official tool from MongoDB. It lets you connect directly to a MongoDB server and run commands interactively. It is written in JavaScript/TypeScript, but it’s just a **CLI (command-line interface)**.
```js
db.users.findOne({ name: "Alice" })
```

✴️ **Query** is, in general, a request you send to a database asking it to return or modify data. Such as, "Insert a new user.", "Update this note’s content.", or "Give me all notes where <code>important: true</code>." etc.
+ **In MongoDB & Mongoose**: a query is typically a JavaScript object that specifies conditions or actions.
  ```js
  // query for one
  await User.findOne({ username: 'mluukkai' })
  // query to delete all notes
  await Note.deleteMany({})

  // query object
  await Note.find({ important: true })
  ```
  From the code above,<code>{ important: true }</code> is a query object (condition). And <code>.find()</code> is the query method.

✴️ **Schema** is only defines structure and rules for a document (fields, types, validations, etc). The schema does not talk to the database. By itself, it’s just a “plan” for what a document should look like.

✴️ **Model** is a JavaScript function Object (class), created from the schema. The model (<code>User</code>) is just Mongoose’s **wrapper around the collection** (<code>users</code>) in MongoDB. So, this object has methods attached that let you interact with MongoDB:
+ Static methods (Model-level):
  - You call them on the model class itself, not on an individual document.
  - <code>.find()</code>, <code>.findById()</code>, <code>.deleteMany()</code>, <code>.insertMany()</code> etc.
    ```js
    const users = await User.find();     // static
    const one = await User.findById(id); // static
    ```
+ Instance methods (Document-level):
  - Belong to the Document object (available on individual documents).
  - They operate on that specific record.
  - <code>.save()</code>, <code>.remove()</code>, <code>.deleteOne()</code>, <code>.updateOne()</code>, <code>.populate()</code>
    - <code>.toJSON()</code>, <code>.toObject()</code>: synchronous methods, don't need to use <code>await</code>.
    - other Instance methods above: asynchronous methods and return a Promise. You need to <code>await</code> (or use <code>.then()</code>):
    - <code>populate()</code>: it depends.
    ```js
    const user = await User.findById(id);
    await user.save();       // instance
    console.log(user.toJSON()); // instance
    ```

What is meant by static or instance methods?
```js
const Note = mongoose.model('Note', noteSchema)

// ❌ This is wrong:
await Note.save()

// ✅ fetches all documents from the collection
const allNotes = await Note.find({})
```
Becasue <code>Note</code> is the model (class/object), not an individual document. The model does not have a <code>.save()</code> method, which only exists on document instances, because it’s about saving a single record. But <code>.find()</code> exists on the model, because it operates on the whole collection, not a single document.
```js
const Note = mongoose.model('Note', noteSchema)

const doc = new Note({
  content: "Buy milk",
  important: true
})

// ✅ saves this document to the database
await doc.save()
```
And <code>doc</code> is a document instance (created with <code>new Note({...})</code>). And
<code>.save()</code> only works on document instances, not the model.

```js
const Note = mongoose.model('Hey', noteSchema)
```
In the code above,
+ 'Note' is the JS variable, which you use in your code to call methods.
+ 'Hey' is  the model name.
+ 'heys' is the collection name, determined automatically.

✴️ **Document** is a JavaScript Object (instance), representing a single instance of data, created using the model, in the collection.
+ instance methods: <code>.save()</code>, <code>.remove()</code>, <code>.deleteOne()</code>, <code>.updateOne()</code>, <code>.populate()</code>

✴️ **Collection** is where the documents are actually stored in MongoDB. The model knows which collection to talk (or map) to when you call methods. And the model uses collection to query, insert, update, or delete documents in the database.
```js
// both retrieve the same model
const Note = mongoose.model('Hey', noteSchema)
const Note = mongoose.model('Hey')

// they get all documents in the "heys" collection
const allNotes = await Note.find({})
const allNotes = await mongoose.model('Hey').find({})
const allNotes = await db.heys.find({})

console.log(allNotes)

// they delete all documents in the "heys" collection
Note.deleteMany({})
mongoose.model('Hey').deleteMany({})
db.heys.deleteMany({})
```

✴️ **Full Warehouse Analogy for MongoDB + Mongoose**
+ MongoDB: The entire city with all warehouses. The database system that stores data (collections) permanently.
+ Mongoose: The company that employs the workers. Provides tools, rules, and training for workers (models) to interact efficiently with warehouses (collections), following blueprints (schemas).
+ Schema: The blueprint / instructions for boxes. Defines how boxes should be built: size, shape, label format, and rules (required fields).
+ Model: A worker (with knowledge of the blueprint). Uses the blueprint (schema) to:
  - 1. create new boxes (documents),
  - 2. find, update, or remove boxes in the correct warehouse (collection).
+ Document: A single box inside the warehouse. Represents an individual record of data. For example, a note with 'content' and 'important' fields.
+ Collection: A specific warehouse. Holds many boxes (documents). For example, the notes collection is a warehouse for all note boxes.

so, mapping a model to collection means "to assign a worker to a specific warehouse". So the worker knows which warehouse to operate on (collection).

```js
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

// Model (worker)
// Maping the model to the collection 'heys'
const Note = mongoose.model('Hey', noteSchema)

// Document (box)
const doc = new Note({ content: "Buy milk", important: true })

// Worker puts the box into the correct warehouse (collection)
await doc.save()

// Worker fetches all boxes from the warehouse
const allNotes = await Note.find({})
```
✴️ **Cluster** is a group of servers (computers) working together to store your data, in Mongo Atlas.

✴️ **Index** is, in most databases, a special data structure that improve query performance and enforce constraints (unique value). More specifically,
+ Speeds up queries – Instead of scanning every document in a collection, MongoDB can quickly find results using the index (like looking up a word in a book’s index instead of reading the whole book).
  - Example: if you often search users by their email, adding an index on email makes lookups much faster.
+ Enforces constraints – In Mongoose, if you define **a schema field** like this:
  ```js
  email: { type: String, unique: true }
  ```
  Mongoose tells MongoDB: "Create a unique index on <code>email</code>."
That means MongoDB itself won’t allow two documents with the same email, because the index enforces uniqueness (<code>unique: true</code>).

The "indexes" are those database-level structures that Mongoose creates based on your schema definitions (like <code>unique</code>, <code>sparse</code>, or just performance indexes).
If you insert data before these indexes exist, you risk duplicates or inconsistent behavior, and MongoDB might refuse to build the index later.

+ **What went wrong**:
When your app starts, Mongoose tries to ensure that the indexes defined in your schema exist in MongoDB. But **index creation in MongoDB happens in the background**, and Mongoose doesn’t wait for that by default.

  If you **insert (seed) data before the indexes are actually created**, two timing problems can occur:
  - If a constraint index (like <code>unique</code>) was supposed to be enforced, MongoDB won’t catch duplicates because the index wasn’t in place yet. (Which means, if you try to insert a duplicate value into a field with a unique index, MongoDB will reject it with an error.)

  - Worse, if data already violates the would-be index, MongoDB won’t create the index at all.

👉 **Important**:
Mongoose validations do not detect the index violation, and instead of **ValidationError** they return an error of type **MongoServerError**.

👉 In short: The issue was a timing problem. Data got seeded before MongoDB had finished building indexes, so constraints weren’t applied. **The solution is to explicitly wait for indexes to be in place** using <code>syncIndexes()</code> (all models) or <code>createIndexes()</code> (per model) before inserting data.


✴️ **populate()** is a Mongoose method that replaces the ObjectId reference in a document with **the actual document(s)** from another collection. It’s how Mongoose simulates a join between collections.

**With join queries in Mongoose**, Mongoose runs two queries.
  ```js
  // note schema
  const noteSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
      minlength: 5,
    },
    important: Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

  // user schema
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    passwordHash: String,
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
      }
    ],
  })

  const Note = mongoose.model('Note', noteSchema)
  const User = mongoose.model('User', userSchema)
  ```
So ,basically, <code>userSchema</code> code says "When I populate this ObjectId, look for the document in the collection managed by the Note model."

1. <code>type: mongoose.Schema.Types.ObjectId</code> **declares the field type** of notes as an array of **ObjectIds**.
    - MongoDB document automatically has an <code>_id</code> field, and by **default its type** is an **ObjectId**.
      ```js
      //note document with ObjectId
      {
        "_id": ObjectId("123note..."),
        "content": "Buy milk",
        "important": true
      }
      ```
3. So, when another collection (<code>User</code>) wants to “reference” this (a document created by <code>Note</code> model), it just stores the ObjectId.
    ```js
    {
      "_id": ObjectId("456user"),
      "username": "Alice",
      "notes": [ ObjectId("123note...") ]
    }
    ```
    - <code>ref: 'Note'</code> refers to the **Mongoose model name**, not the collection name.
  4. Mongoose uses the model name (<code>'Note'</code>) to figure out which collection to look in. By default, it converts the model name to a collection name by pluralizing and lowercasing it (<code>'notes</code>).
  5. It uses those ObjectIds to fetch the actual note documents from the notes collection and fills them in.

  Those are two separate queries, so the data in <code>users</code> or <code>notes</code> could change in between (inconsistent state).
  ```js
  // Example: populating note inside a user
  const users = await User.find({}).populate('notes')
  ```

The **advantage** of using <code>populate()</code> is:
+ If you update a <code>Note</code>, the <code>user.notes</code> field (the ObjectIds) doesn’t automatically change, in document DB.
+ However, <code>.populate()</code> will **fetch the latest version of the note document** when you query.
+ But it's **not real-time** — changes to the referenced documents after your query won’t update automatically.
+ So if someone else updates a note while you are querying, you might see slightly different data than expected — unlike a **relational join**, which guarantees a consistent snapshot at query time.

✴️ **field** is a key–value pair inside a document, in MongoDB/Mongoose.
```js
{
  "_id": "64fabcd123...",
  "content": "Buy milk",
  "important": true,
  "user": "64fuser456..."   // ObjectId reference
}
```
+ <code>"content"</code> is a field → value <code>"Buy milk"</code>
+ <code>"important"</code> is a field → value <code>true</code>

```js
const noteSchema = new mongoose.Schema({
  content: String,    // field: "content"
  important: Boolean, // field: "important"
  user: {             // field: "user"
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
```
So, when you are using <code>populate()</code>, don't use model name (uppercase 'User'). But **field name (lowercase 'user')**.
````js
await Note.find({}).populate('user')
````
<code>"user"</code> here is the field name in the document <code>(user: ObjectId(...))</code>.

✴️ **URI** (Uniform Resource Identifier) is the umbrella term, which refers to any string that identifies a resource, whether by location, name, or both.
```
URI
├─ URL (location + access method)
└─ URN (name only, no location)
```

✴️ **URL** (Uniform Resource Locator) is a standard way to describe where a resource lives on the internet and how to access it. So, it
includes **origin** and **path**(<code>/api/notes</code>).

http://localhost:3001/api/notes <br />
→ path: <code>/api/notes</code>

✴️ **Origin** is **protocol** + **domain** (or **host** which is the “address” of the server) + **port**.

http://localhost:3001 <br />
→ protocol: <code>http</code>, <br />
→ domain: <code>localhost</code>, <br />
→ port: <code>3001</code>

✴️ **SOP** (Same-Origin Policy) is a **security rule enforced by browsers** that blocks scripts from one origin from accessing resources on another origin (by default).

Why does it matter?
  - Your frontend runs at http://localhost:5173.
  - Your backend runs at http://localhost:3001.
  - These are **different origins**, so the browser blocks direct requests for security reasons (**SOP** issue).
  - To sovle this SOP problem, there are 2 ways of fix:
  - **Enable CORS** on the backend
  - **Use a proxy** (common in development)

✴️ **CORS** (Cross-Origin Resource Sharing) is a **mechanism where the server explicitly grants permission** (via HTTP headers) for specific cross-origin requests, overriding the default SOP block.
+ If backend responses with this CORS:
  ```pgsql
  Access-Control-Allow-Origin: http://localhost:5173
  Access-Control-Allow-Methods: GET, POST
  Access-Control-Allow-Headers: Content-Type
  ```
+ This tells the browser:
  ```pgsql
  “Requests from http://localhost:5173 are allowed.”
  ```
+ So, if the frontend is at <code>5173</code> and the backend is at <code>3001</code>, you need CORS headers from the backend to make it work.

✴️ **Proxy** is like a middleman (or gatekeeper) that sits between a client (your browser/frontend) and a server (your backend or an external API).
```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
}
```
+ How does it work?
  1. Frontend app (React/Vite) runs at http://localhost:5173.
  2. Backend API runs at http://localhost:3001.
  3. Browser says: “Nope, **SOP blocks this, different origins!**”
  4. Instead of asking the backend directly, you ask the proxy at <code>5173</code>.
  5. Proxy secertly forwards your request to <code>3001</code>
  6. Gets the response and gives it back to you as if it came from <code>5173</code>.
  7. SOP is happy, because as far as the browser can tell, everything stayed within the same origin (<code>5173</code>).

The proxy solves this by making it look like the frontend is only ever talking to 5173 (same origin). Vite handles the cross-origin part behind the scenes.

+ How does **frontend request** work?
  1. In the frontend, you fetch something like:
    ```js
    fetch('/api/notes')
    ```
  2. Vite sees: “oh, this starts with <code>/api</code>, so I should proxy it.”
  3. It forwards the request to the backend, keeping <code>/api</code> as a prefix.
    ```bash
    http://localhost:3003/api/notes
    ```
  4. So, basically, proxy send this request to the backend instead of serving it from the frontend dev server.

+ Why use <code>/api</code> as prefix?
  - **To distinguish API calls from frontend routes**.
    + <code>/about</code> or <code>/blog</code> → frontend React router which decides **what to render**.
    + <code>/api/...</code> → backend Express router which **receives the request** and **response** JSON data.
  - To avoid collisions and make proxying simpler.

✴️ **middleware** are functions that can be used for handling request and response objects.

It is the function code that sits between the request and the final handler to process, modify, or filter the request/response. Think of middleware as “layers” or “filters” that **a request passes through before it reaches the route**. Middleware in frameworks like Express is a function that **runs for every incoming request**. Or for routes you attach it to, so it **runs every time that specific route is called**.

**Any function with the signature (req, res, next)** can be used as middleware, but it **only actually acts as middleware** when it is registered with Express (e.g., via **<code>app.use()</code>** or in a route).

How to attach middleware **globally**?

- Use <code>app.use()</code> to run middleware as the callback function, for all requests.
  ```js
  import express from "express";
  const app = express();

  app.use(express.json());
  ```

**Why do we need middleware?**

Becasue middleware allows you to reuse logic across multiple routes instead of repeating code. Such as, <code>app.use(express.json())</code>.

  For example, [json-parser](https://expressjs.com/en/api.html) we used earlier takes the raw data from the requests that are stored in the request object, parses it into a JavaScript object and assigns it to the request object as a new property body.
1. Raw request data :
    ```js
    // client sends a request with a JSON body

    POST /api/blogs
    Content-Type: application/json

    {
      "title": "My Blog",
      "author": "Alice"
    }
    ```
  - Before parsing, Express sees this as raw data — basically a stream of bytes inside <code>request</code>.
  - You cannot access it directly as <code>request.body</code> yet; it’s just a chunk of text.
2. JSON parser (<code>express.json()</code>)
    ```js
    app.use(express.json())
    ```
  - This middleware intercepts incoming requests.
  - It reads the raw data from the request stream.
  - **It parses the JSON string into a JavaScript object**.
    ```js
    { title: "My Blog", author: "Alice" }
    ```
3. Assigning to <code>request.body</code>
    ```js
    request.body = { title: "My Blog", author: "Alice" }
    ```
    So, we can use the object.
    ```js
    const body = request.body
    console.log(body.title) // "My Blog"
    ```

Without middleware, you’d have to write things like token extraction, logging, body parsing inside every route. So it is **reusable** code which you can write once and use in multiple places without rewriting it.

What is **basic structure** of custom middleware?
1. Normal middleware has **three parameters**.
    ```js
    const tokenExtractor = (req, res, next) => {
      const auth = req.get('authorization')
      req.token = auth ? auth.replace('Bearer ', '') : null
      next() // passes control
    }
    ```
  - This middleware always runs for every request.
  - If an error occurs inside it (like a thrown exception), Express will skip the rest of the normal middleware & route handlers, and go straight to error-handling middleware.


2. Error-handling middleware has **four parameteres**.

  - Express sees the error → automatically calls your <code>errorHandler</code> middleware.
    ```js
    // triggers CastError
    const blog = await Blog.findById(invalidId)

    //calls errorHandler middleware
    app.use(middleware.errorHandler)
    ```

    ```js
    const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

      if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
      } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      } else if (error.name ===  'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' })
      }
      next(error)
    }
    ```
  - Your middleware checks <code>error.name</code> → sends a 400 response with “malformatted id”.
  - **No route handler or other middleware runs after the response is sent**.
    - Because once a response is sent in Express, the request/response cycle is considered finished, so no further middleware or route handlers run for that request.

Express **Router middleware**?

A [router](https://expressjs.com/en/api.html#router) object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has **a built-in app router**. Because:
+ It can have its own middleware
  ```js
  // note dealing in this course
  noteRouter.use((req, res, next) => {
    console.log('Note router received a request')
    next()
  })
  ```
+ It has its own routes
  ```js
  // controllers/notes.js
  const noteRouter = require('express').Router()

  noteRouter.get('/', (req, res) => res.send('All notes'))
  noteRouter.get('/:id', (req, res) => res.send(`Note ${req.params.id}`))

  module.exports = noteRouter
  ```
  So, <code>notesRouter</code> is an object that can hold many routes (get/post/put/delete...), like a container. Then we export that container.
  ```js
  const express = require('express')
  const app = express()

  app.get('/api/notes', (req, res) => res.send('All notes'))
  app.get('/api/notes/:id', (req, res) => res.send(`Note ${req.params.id}`))
  ```
  In the previous codes, <code>app</code> is your **main Express application**, compared to <code>noteRouter</code> which is a **router object**. And you attach routes directly to it, or mount routers on it (attaching <code>.get()</code>, <code>.post()</code>...etc). Then, <code>app</code> handles all requests.

+ It can be mounted wherever you want in the main app. So, it lets you define routes relative to a base path (<code>/api/notes</code>).
  ```js
  // app.js
  const notesRouter = require('./controllers/notes')
  app.use('/api/notes', notesRouter)
  ```
  So the codes above said, "For any request that starts with <code>/api/notes</code>, use this <code>notesRouter</code> to handle it." <br />
  For this reason, the <code>notesRouter</code> object (from controllers/notes.js) must only define the **relative parts of the routes**, i.e. the empty path <code>/</code> or just the parameter <code>/:id</code>.

+ **Advantages**
  - **No Repetition** → No need to write <code>/api/notes</code> in every route.
  - **Easy to maintain** → If base path changes, update only in <code>app.use()</code>.
  - **Modular code** → Other routers (like, User or Order) can be added and separated from noteRouter.
  - **Router-specific middleware** → you can add middleware for only this feature without affecting other routes.

✴️ **Hash** is, in this project, an output of a **cryptographic hash function**.

✴️ **Cryptographic hash function** is a mathematical function that:
+ takes any input (a message, a file, a password)
+ produces a fixed-size output (the hash)
+ is designed to be **infeasible to reverse**. Other stricter properties are:
  - One-way (hard to invert).
  - Collision-resistant (hard to find two inputs with the same hash).
  - Avalanche effect (tiny input change → completely different output).

Note. **Normal (Non-cryptographic) hash functions** are used mainly for data structures and integrity checks, not security .

✴️ **Token** is a small piece of digital data that proves who you are.
+ It’s like a digital ticket or ID card.
+ Usually, it’s created by the server when you log in.
+ Then, you send it back to the server on future requests to show.
+ **Opaque (normal) Token** is just a random **string**.
+ But **Json Web Token** is **self-contained**, which means token itself contains all the information needed to identify the user and verify its authenticity.
+ What does a **JWT** contain?
  - **Header** tells how the token is built.
    ```js
      // JWT header (inside the token)
      {
        "alg": "HS256",
        "typ": "JWT"
      }

      // the HTTP header where the JWT is carried
      Authorization: Bearer <your.JWT.token>
    ```
  - **Payload** is some information about the user. For example:
    ```js
    {
      "username": "alice",
      "id": "12345",
      "iat": 1693632261
    }
    ```
  - **signature** is a cryptographic “stamp” made with the secret key, that makes sure nobody has changed the token. (Declared in <code>.env</code> file, in the notes project)

+ How does it work? (image from [here](https://fullstackopen.com/en/part4/token_authentication))
  ![Alt text](https://fullstackopen.com/static/259c9dce6b3d1d77bedb04e799ac7dd3/5a190/16new.png)
  - 1. Client logs in → gets token → stores it locally.
  - 2. Client wants to do a protected action → adds token to Authorization header.
  - 3. Server reads the header, verifies the token, and allows or denies access.

✴️ **Authorization header** [(link)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Authorization) is a special HTTP header through which the token is sent.
```js
Authorization: <scheme> <credentials>
```
+ <code>&lt;scheme&gt;</code> = the authentication scheme (method).
+ <code>&lt;credentials&gt;</code> = the actual proof (like a token, password, etc.).

✴️ **Authentication scheme** [(link)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Authentication#Authentication_schemes) is a _name_ that defines how the credentials are encoded. It comes before the credentials in the <code>Authorization</code> header.

+ Basic: base64-encoded credentials
+ Bearer: bearer tokens to access
+ Digest: Firefox 93 and later support the SHA-256 algorithm

```js
Bearer <Token_Credential>
```
**🐬 Pro Tips**
1. Backend give a token to fronend when user login.
    ```js
    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60*60 }
    )

    res.status(200).json({
      token,
      username: user.username,
      name: user.name
    })
    ```
2. When user need authentification for action, frontend send the token to backend for asking authorization, using **cusomized http HEADER**.
    ```js
    const setToken = newToken => {
      token = `Bearer ${newToken}`
    }

    const create = async newblogObj => {
      const config = {headers: { Authorization: token }}
      const response = await axios.post(baseUrl, newblogObj, config)
        return response.data
    }
    ```
    - Axios (and the browser) adds some default headers automatically.
      ```js
      Content-Type: application/json
      Accept: application/json, text/plain, */*
      ```
    - But, by passing <code>{ headers: { Authorization: token } }</code>, Axio overrides or extends the default headers.
      ```js
      Content-Type: application/json
      Accept: application/json, text/plain
      Authorization: Bearer abc123xyz
      ```
3. Backend check if the token is valid. <code>request.get('authorization')</code> retrieves the **Authorization header** from the **HTTP request**.
    ```js
    const getTokenFrom = request => {
      const authorization = request.get('authorization')

      // be aware of "sapce" after Bearer!
      if(authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ', '')
      }
      return null
    }
    ```

So basically,
  1. Backend: provide a token
  2. Frontend: Store in a browser
  3. Frontend: Add prefix (<code>Bearer</code>) to send the token back to backend
  4. Backend: Remove prefix (<code>Bearer</code>) and decode the token
  + If we don't skip add/remove prefix (<code>Bearer</code>), it **breaks the HTTP standard** — other tools (Postman, proxies, libraries) expect "Bearer " prefix for tokens.

✴️ **Session + Cookie**
+ Definition
  - A server-side authentication method.
  - **Session** = data stored on the server to track a logged-in user.
  - **Cookie** = small piece of data stored in the browser that holds the session ID so the server can identify the user.
+ The server creates guestbook (a session store*) that holds information _only about users who are currently logged in_, with all user info (who borrowed which books, permissions, etc.).
+ Guest receives a small memo📝 with just a guest ID💬.
+ Every time the guest visits the library:
  - They show the memo (cookie).
  - The librarian looks up the ID in the guestbook to find all info → allows borrowing, etc.
+ Pros:
  - Minimal info on guest → safer.
+ Cons:
  - Server must remember all guests → more memory and harder to scale.
  - Multiple libraries (servers) need a shared guestbook.

  _*Store is the place where the server keeps all active tokens or sessions, like database table(MySQL) or in-memory store(Redis)._

✴️ **Opaque Token**
+ Definition
  - A random, meaningless string used as an access token
  - “Opaque” because clients cannot read or interpret it — only the server knows what it represents.
+ Guest receives a random key🔑 with no info.
+ The server still keeps a cabinet (a central storage, like database table) of all tokens and associated guest info.
+ Every visit:
  - Guest shows the key (token).
  - Server looks for the matching key shape/number in the cabinet → identifies guest → checks permissions.
+ Pros:
  - Server can easily revoke* tokens by removing from the cabinet.
+ Cons:
  - Lookup needed every time → server load.
  - Multiple servers require shared token store → harder to scale.
  - Which means, the server asks its database or in-memory storage to find a record that matches the token for every request → adds server work.

  _Revoke* means making a token/session invalid before expiry._

✴️ **JWT (Self-contained token)**
+ Definition
  - A self-contained, signed token in JSON format.
  - It encodes user claims (like <code>id</code>, <code>premission</code>, <code>exp</code>) along with a cryptographic signature.
  - Verifiable without a database lookup.
+ Guest receives a signed ID card (like, Mecena) with all info written on it (name, birthday, permissions, expiration).
+ Every visit:
  - Guest shows the ID card (JWT).
  - Any librarian can verify the signature (Mecena) → immediately trust the info → allow actions.
+ Pros:
  - Self-contained → no server lookup → minimal load.
  - Works across multiple libraries (servers) → easy scaling.
  - No query (Not asking DB or in-memory to do some tasks) is needed because all the info is on the card (token) itself.
+ Cons:
  - Harder to revoke → valid until expiration.
  - Sensitive info on card is visible → must be careful.

  **So, when is the token generated?**
    - ✅ **Always** at **sign-in (login)** — This is when a user provides credentials (username/password, OAuth, etc.) to prove their identity.
    - ☑️ Optionally at **sign-up (create account)** — some systems automatically sign the user in immediately after account creation, so they generate a token right then as well.

✴️ **Revocation problem** can be happened in Token-based authentication. Because the API is basically blindly trusting the token until it expires. For example:
  1. When your React app logs in, it gets a token (e.g., JWT).
  2. That token says: “This is Alice, role: user, valid for 1 hour.”
  3. Now, whenever the React app makes API requests, it attaches the token.
  4. The API sees the token, verifies its signature, and says: “Okay, token is valid → let’s trust Alice.”

  But, what if What if something changes before the token expires? For example:
  - Alice logs out.
  - An admin blocks Alice’s account.
  - Alice’s token gets stolen by a hacker.

  → The token is still valid until it expires. The API has no way to know it should stop trusting Alice immediately.

**Then, how to solve the revocation problem?**
+ **Limit the validity period of a token**. But the shorter the expiration time, the safer the solution is. However, a short expiration time is a potential pain point for the user, as it requires them to log in more frequently.
  ```js
  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60*60 }
  )
  ```
+ **Server-side session**, which is to save info about each token to the backend database and to check for each API request if the access rights corresponding to the tokens are still valid. is to save info about each token to the backend database and to check for each API request if the access rights corresponding to the tokens are still valid. Database access is considerably slower compared to checking the validity of the token itself. That is why it is quite common to save the session corresponding to a token to a key-value database such as [Redis](https://redis.io/), that is limited in functionality compared to eg. MongoDB or a relational database, but extremely fast in some usage scenarios.
+ When server-side sessions are used, the **_token_** is quite often just **a random string**, that does not include any information about the user as it is quite often the case when jwt-tokens are used. For each API request, the server fetches the relevant information about the identity of the user from the database.
+ It is also quite usual that instead of using Authorization-header, **_cookies_** are used as the mechanism for transferring the token between the client and the server.
