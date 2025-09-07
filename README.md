# fullstackopen 2025

is in progress from April, 2025. Hyosun Kim is a student of Royal Institute of Technology (KTH), in Sweden.

## Web Programming
### Dynamic Website
![Alt text](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction/web_application_with_html_and_steps.png)

(image from [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction))

Requests for dynamic resources are instead forwarded (2) to server-side code (shown in the diagram as a Web Application). For "dynamic requests" the server interprets the request, reads required information from the database (3), combines the retrieved data with HTML templates (4), and sends back a response containing the generated HTML (5,6).

A dynamic site can return different data for a URL based on information provided by the user or stored preferences and can perform other operations as part of returning a response (e.g., sending notifications).

Most of the code to support a dynamic website must run on the server. Creating this code is known as "**server-side programming**" (or sometimes "**back-end scripting**").

## Reading Materials
+ [Linear algebra](https://www.csc.kth.se/~weinkauf/teaching/visualization/index.html)
+ [immersive math](https://immersivemath.com/ila/learnmore.html)
+ [Computer Vision](https://www.spiceworks.com/tech/artificial-intelligence/articles/what-is-computer-vision/)
+ [You Don't Know JS Yet](https://github.com/getify/You-Dont-Know-JS?tab=readme-ov-file)
+ [How to Manage JavaScript Fatigue](https://auth0.com/blog/how-to-manage-javascript-fatigue/)
+ [Eloquent JavaScript](https://eloquentjavascript.net/)
+ [Guide to React](https://egghead.io/courses/the-beginner-s-guide-to-react)
+ [React with Class Components Fundamentals](https://egghead.io/courses/react-with-class-components-fundamentals-4351f8bb)
+ [Representational State Transfer: REST](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
+ [What Is Node.js](https://kinsta.com/knowledgebase/what-is-node-js/)
+ [bcrypt](https://codahale.com/how-to-safely-store-a-password/)
+ [A Note on Rounds](https://github.com/kelektiv/node.bcrypt.js/#a-note-on-rounds)
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

## my Q&A

**🐥 Why do I need to convert data into JSON to send it back to client?**

🐓 You don’t have to use JSON, but JSON has become the standard format for communication between servers and clients (especially in web APIs).
+ 1. Clients need a structured, universal format
  - Raw JavaScript objects (<code>{ title: "Hello" }</code>) only exist inside your server’s memory.
  - When data leaves your server, it’s just text (or bytes) traveling over HTTP.
  - JSON provides a language-agnostic way of representing that data. (React app, an iPhone app-Swift, an Android app-Kotlin, or even Python)
+ 2. HTTP requires strings, not raw objects
  - HTTP transmits text or binary data.
  - JSON is just a string representation of the object:
  ``` js
  { title: "Hello" } → '{"title":"Hello"}'
  ```
+ 3. Automatic parsing on the client side
  - Browsers, <code>fetch()</code>, <code>axios</code>, mobile SDKs — all expect JSON from an API.
  - In JavaScript, you can instantly parse JSON:
  ``` js
    const response = await fetch("/api/blogs");
    const data = await response.json();

    // usable JavaScript object/array
    console.log(data);
  ```
+ 4. Standards and interoperability
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

## Appendix
🐬 **Port** is a communication endpoint and listens for requests.

🐬 **Array.isArray()** checks if the passed value is an Array. Instead of using <code>typeof()</code> which is a very old operator. Because <code>typeof</code> will return Array as an Object. Because arrays are a special kind of object under the hood.
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

🐬 **JSON** (JavaScript Object Notation) is always a string representation of an object.
+ 1. <code>.toJSON()</code> returns a plain JavaScript object.
``` js
  { title: "Hello" }
  ```
+ 2. <code>JSON.stringify(obj)</code> returns the obj a string.
``` js
  '{"title":"Hello"}'
```
+ 3. <code>response.json(...)</code> Express does both steps automatically. Express calls <code>JSON.stringify</code>, which internally checks for <code>.toJSON()</code> and uses it if available.
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

🐬 **Async**  declare a function as asynchronous which will require time to complete that JavaScript may have to wait for. And it returns a Promise.

🐬 **Await** is an operator and is possible only inside of an async function. And it waits for a Promise.

🐬 **Promise** is an object, a special kind of JavaScript object, that represents the eventual result of an asynchronous operation. So it's like
> "I don’t have the value yet(pending), but I promise I’ll either give you the value (resolve) or an error (reject) in the future."

+ Case 1: Without <code>await</code>
  - ✅ Casual / practical way: it returns a Promise.
  - ⚠️ Strict/ technical way: it returns a Mongoose Query object, which is Promise-like, so <code>await</code> and <code>.then()</code> work.
  ```js
  //can say it returns Promise
  const users = Note.find({})
  ```
  ```js
  //console.log(users)
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
  - returns an array of document from MongoDB, not plain JS objects, but Mongoose document instances
  ```js
  //resolves to an array of documents
  const users = await Note.find({})
  ```
  ```js
  //console.log(users)
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

  //console.log(users.toJSON())
  //And our custom .toJSON() method in model
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

  Each element is a Mongoose Document object, which looks like a plain JS object but actually has methods (<code>.toJSON()</code>, <code>.save()</code>, etc.) under the hood.
  But remember: **it’s still a Mongoose Document, not a plain JS object**.

  Every Mongoose document has a <code>.toJSON()</code> method. It converts the Mongoose Document object (which has tons of hidden metadata and methods) into a plain JavaScript object that’s safe to stringify or send over HTTP.
  ```js
  const note = await Note.findOne({})
  console.log(note)          // Mongoose Document
  console.log(note.toJSON()) // Plain object
  ```
  ```js
  //console.log(note)
  {
    _id: new ObjectId("64f2a2b4e9f1d23a4b9b7c8d"),
    title: 'My first note',
    content: 'Hello world',
    __v: 0
    // (plus hidden symbols and methods, not shown here)
  }

  //console.log(note.toJSON())
  {
    _id: "64f2a2b4e9f1d23a4b9b7c8d",
    title: "My first note",
    content: "Hello world",
    __v: 0
  }

  ```

🐬 **Response.json()**
<code>Response</code> is an object provided by Express to send data back to the clien. And <code>.json()</code> is a method that
+ Converts the JavaScript object/array (<code>notes</code> in this case) into a JSON string.
+ Sets the correct HTTP header: <code>Content-Type: application/json</code>.
+ Sends the JSON as the HTTP response body.

And <code>resonse.json()</code> sends the HTTP response immediately and ends the request.
So, if you want to return all notes entries, you don’t map them individually. Each Mongoose document in the array is converted into a plain object under the hood using Mongoose’s built-in serialization (stringifying).
```js
//from controller.js
notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  return res.json(notes)
})

//from helper.js
const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map((note) => note.toJSON())
}
```
```js
//return all the notes object into an array
return response.json(notes)
return notes.map(note => note.toJSON())

//return only one note object
return notes.map(note => response.json(note))
```
```js
//the return value will look the same as response.json(notes)
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

🐬 **Schema** is only defines structure and rules for a document (fields, types, validations, etc). The schema does not talk to the database. By itself, it’s just a “plan” for what a document should look like.

🐬 **Model** is a JavaScript function Object (class), created from the schema. This object has methods attached that let you interact with MongoDB:
+ Static methods: <code>.find()</code>, <code>.findById()</code>, <code>.deleteMany()</code>, <code>.insertMany()</code> etc.
+ Instance methods (via documents created from the model):  <code>.save()</code>, <code>.remove()</code>, <code>.deleteOne()</code>, <code>.updateOne()</code>, <code>.populate()</code>
  - <code>.toJSON()</code>, <code>.toObject()</code>: synchronous methods, don't need to use <code>await</code>.
  - other Instance methods above: asynchronous methods and return a Promise. You need to <code>await</code> (or use <code>.then()</code>):
  - <code>populate()</code>: it depends.

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

🐬 **Document** is a JavaScript Object (instance), representing a single instance of data, created using the model, in the collection.

🐬 **Collection** is where the documents are actually stored in MongoDB. The model knows which collection to talk (or map) to when you call methods. And the model uses collection to query, insert, update, or delete documents in the database.
```js
// both retrieve the same model
const Note = mongoose.model('Hey', noteSchema)
const Note = mongoose.model('Hey')

// both get all documents in the "heys" collection
const allNotes = await Note.find({})
const allNotes = await mongoose.model('Hey').find({})
const allNotes = await db.heys.find({})

console.log(allNotes)

//both delete all documents in the "heys" collection
Note.deleteMany({})
mongoose.model('Hey').deleteMany({})
db.heys.deleteMany({})
```

🐬 **Full Warehouse Analogy for MongoDB + Mongoose**
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

🐬 **Index** is, in most databases, a special data structure that improve query performance and enforce constraints (unique value). More specifically,
+ Speeds up queries – Instead of scanning every document in a collection, MongoDB can quickly find results using the index (like looking up a word in a book’s index instead of reading the whole book).
  - Example: if you often search users by their email, adding an index on email makes lookups much faster.
+ Enforces constraints – In Mongoose, if you define a schema field like this:
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


🐬 **Query** is, in general, a request you send to a database asking it to return or modify data. Such as, "Insert a new user.", "Update this note’s content.", or "Give me all notes where <code>important: true</code>." etc.
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


🐬 **populate()** is a Mongoose method that replaces the ObjectId reference in a document with the actual document(s) from another collection. It’s how Mongoose simulates a join between collections.
  + **With join queries in Mongoose**, Mongoose runs two queries.
  ```js
  //note schema
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

  //user schema
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      minLength: 2
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
  ```js
  // Example: populating note inside a user
  const users = await User.find({}).populate('notes')
  ```

1. Mongoose first gets all the users from the users collection.
2. Then, for each user, it looks at the notes field (which stores ObjectIds). <code>type: mongoose.Schema.Types.ObjectId</code> means that each item in the notes array is an <code>ObjectId</code> that refers to another document. And <code>ref: 'Note'</code> refers to the **Mongoose model name**, not the collection name.
3. Mongoose uses the model name (<code>'Note'</code>) to figure out which collection to look in. By default, it converts the model name to a collection name by pluralizing and lowercasing it (<code>'notes</code>).
4. It uses those ObjectIds to fetch the actual note documents from the notes collection and fills them in.

  Those are two separate queries, so the data in <code>users</code> or <code>notes</code> could change in between (inconsistent state).

🐬 **field** is a key–value pair inside a document.
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

🐬 **Token** is a small piece of digital data that proves who you are.
+ It’s like a digital ticket or ID card.
+ Usually, it’s created by the server when you log in.
+ Then, you send it back to the server on future requests to show.
+ **Opaque (normal) Token** is just a random **string**.
+ But **Json Web Token** is **self-contained**, which means token itself contains all the information needed to identify the user and verify its authenticity.
+ What does a **JWT** contain?
  - **Header** tells how the token is built.
    ```js
      //JWT header (inside the token)
      {
        "alg": "HS256",
        "typ": "JWT"
      }

      //the HTTP header where the JWT is carried
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
+ How does it work?
  - 1. Client logs in → gets token → stores it locally.
  - 2. Client wants to do a protected action → adds token to Authorization header.
  - 3. Server reads the header, verifies the token, and allows or denies access.

🐬 **Authorization header** [(link)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Authorization) is a special HTTP header through which the token is sent.
```js
Authorization: <scheme> <credentials>
```
+ <code>&lt;scheme&gt;</code> = the authentication scheme (method).
+ <code>&lt;credentials&gt;</code> = the actual proof (like a token, password, etc.).

🐬 **Authentication scheme** [(link)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Authentication#Authentication_schemes) is a _name_ that defines how the credentials are encoded. It comes before the credentials in the <code>Authorization</code> header.

+ Basic: base64-encoded credentials
+ Bearer: bearer tokens to access
+ Digest: Firefox 93 and later support the SHA-256 algorithm

```js
Bearer <Token_Credential>
```

🐬 **Session + Cookie**
+ The server creates guestbook (a session store*) that holds information _only about users who are currently logged in_, with all user info (who borrowed which books, permissions, etc.).
+ Guest receives a small memo📝 with just a guest ID.
+ Every time the guest visits the library:
  - They show the memo (cookie).
  - The librarian looks up the ID in the guestbook to find all info → allows borrowing, etc.
+ Pros:
  - Minimal info on guest → safer.
+ Cons:
  - Server must remember all guests → more memory and harder to scale.
  - Multiple libraries (servers) need a shared guestbook.

  _*Store is the place where the server keeps all active tokens or sessions, like database table(MySQL) or in-memory store(Redis)._

🐬 **Opaque Token**
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


🐬 **JWT (Self-contained token)**
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

🐬 **Revocation problem** can be happened in Token-based authentication. Because the API is basically blindly trusting the token until it expires. For example:
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
