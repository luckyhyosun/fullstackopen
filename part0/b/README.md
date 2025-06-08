# 0.4

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: click SAVE button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: redirection response https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content": "The Cutest Guy to type a Note", "date": "2025-06-07T20:00:21.012Z"}, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

# 0.5 - 0.6

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: click SAVE button

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "sjkdfl", "date": "2025-06-07T18:57:37.507Z" }, ... ]
    deactivate server

    Note right of browser: The data is to be sent with an HTTP POST request and the data type is to be JSON.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {content: "hello", date: "2025-06-08T12:35:05.250Z"}
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
