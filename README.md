# fullstackopen 2025

is in progress from April, 2025. Hyosun Kim is a student of Royal Institute of Technology (KTH), in Sweden.

## Web Programming
### Dynamic Website
![Alt text](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction/web_application_with_html_and_steps.png)

(image from [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction))

Requests for dynamic resources are instead forwarded (2) to server-side code (shown in the diagram as a Web Application). For "dynamic requests" the server interprets the request, reads required information from the database (3), combines the retrieved data with HTML templates (4), and sends back a response containing the generated HTML (5,6).

A dynamic site can return different data for a URL based on information provided by the user or stored preferences and can perform other operations as part of returning a response (e.g., sending notifications).

Most of the code to support a dynamic website must run on the server. Creating this code is known as "**server-side programming**" (or sometimes "**back-end scripting**").


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
+ 3. <code>response.json(...)</code> Express does both steps automatically. <code>.toJSON</code> first, and then <code>JSON.stringify(obj)</code> later. So <code>.toJSON</code> is really a pre-processor for <code>JSON.stringify(obj)</code>.

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

And <code>resonse.josn()</code> sends the HTTP response immediately and ends the request.
So, if you want to return all notes entries, you don’t map them individually.
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

🐬 **Schema** is only defines structure and rules for a document (fields, types, validations, etc). The schema does not talk to the database. By itself, it’s just a “plan” for what a document should look like.

🐬 **Model** is a JavaScript function Object (class), created from the schema. This object has methods attached that let you interact with MongoDB ():
+ Static methods: <code>.find()</code>, <code>.findById()</code>, <code>.deleteMany()</code>, <code>.insertMany()</code> etc.
+ Instance methods (via documents created from the model):  <code>.save()</code>, <code>.remove()</code>, <code>.deleteOne()</code>, <code>.updateOne()</code>, <code>.populate()</code>
  - <code>.toJSON()</code>, <code>.toObject()</code>: synchronous methods, don't need to use <code>await</code>.
  - other Instance methods above: asynchronous methods and return a Promise. You need to <code>await</code> (or use <code>.then()</code>):

What is meant by static or instance methods?
```js
const Note = mongoose.model('Note', noteSchema)

// ❌ This is wrong:
await Note.save()

// ✅ fetches all documents from the collection
const allNotes = await Note.find({})
```
Becasue <code>Note</code> is the model (class/object), not an individual document. The model does not have a <code>.save()</code> method, which only exists on document instances, because it’s about saving a single record. But <code>.find()</code> exists on the model, because it operates on the whole collection, not a single document
```js
const Note = mongoose.model('Note', noteSchema)

const doc = new Note({
  content: "Buy milk",
  important: true
})

// ✅ saves this document to the database
await doc.save()
```
And <code>doc</code> is a document instance (created with <code>new Note({...})</code>).
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

// Model (worker) and map the model to the collection 'heys'
const Note = mongoose.model('Hey', noteSchema)

// Document (box)
const doc = new Note({ content: "Buy milk", important: true })

// Worker puts the box into the correct warehouse (collection)
await doc.save()

// Worker fetches all boxes from the warehouse
const allNotes = await Note.find({})
```

🐬 **Index** is a special data structure, in most databases, that improve query performance and enforce constraints. More specifically,
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
  // Example: populating note inside a user
  const users = await User.find({}).populate('notes')
  ```

1. Mongoose first gets all the users from the users collection.
2. Then, for each user, it looks at the notes field (which stores ObjectIds).
3. It uses those ObjectIds to fetch the actual note documents from the notes collection and fills them in.

  Those are two separate queries, the data in <code>users</code> or <code>notes</code> could change in between (inconsistent state).
